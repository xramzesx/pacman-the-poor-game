console.log('loaded : Character.js')

/*
 directions :
     0.
  3.    1.
     2.
*/

class Character {
    
    //// MAIN ////
    #type = "mob"
    
    #segments = 2
    #slowness = 1

    #position = {
        from : { 
            x : 0,
            y : 0
        },
        to : {
            x : 1,
            y : 1
        }
    }

    #direction = 4
    #lastDirection = 4
    #lastLastDirection = 4
    #sequence = {
        list : [
            [],
            [],
            [],
            []
        ],
        frame : 0
    }  

    //// ENVIRONMENT ////

    #borders = [[]]

    //// MAIN ////

    constructor ( props ) {    
        this.canvas = props.canvas
        this.position = props.position
        this.sequence = props.sequence || defaults.sequences.ghosts[0]
        this.#borders = cloneObj( props.border ) || this.#borders
        console.log(this.sequence, props)
    }

    //// UTILITES ////

    render ( step = 0 , props = {} ) {
        const condition = step % this.#slowness == 0 
        if ( condition ) {
            this.follow ( props )
        }
        this.animate ( condition )
    }

    //// DISPLAYING ////

    animate ( nextFrame = true ) {
        if ( nextFrame ) {
            const direction = this.#direction
            this.#sequence.frame = this.#sequence.frame < this.sequence[direction].length - 1
                ? this.#sequence.frame + 1
                : 0
        }

        this.display( this.#sequence.frame )
    }

    display ( frame = 0 ) {
        const direction = this.#direction
        const segments = this.#segments

        const { x, y } = this.#position.from
        
        // console.log( x,y )
        for (let i = 0; i < segments; i++)
            for (let j = 0; j < segments; j++){
                try {
                    // console.log(i,j)
                    this.canvas.elements[ y + i * segments][ x + j * segments].import( 
                        JSON.parse(JSON.stringify(this.sequence[ direction ][ frame ][ i * this.#segments + j ])),
                        1,
                        false,
                        false
                    )
                } catch { console.warn(y,x,'sss') }
                
                
            }

    }
    
    //// CHANGING POSITION ////

    move ( direction ) {
        this.#lastLastDirection = cloneObj( this.#lastDirection )
        this.#lastDirection = cloneObj(this.#direction)
        this.#direction = direction == undefined ? this.#direction : direction
    }

    follow ( props ) {
        const direction = this.#direction
        // try {
            let shift = {  }
            switch ( direction ) {
                case 0:
                    shift = { x : 0, y : -1 }
                    break
                
                case 1:
                    shift = { x : +1, y : 0 }
                    break
                
                case 2:
                    shift = { x : 0, y : +1 }
                    break
                
                case 3:
                    shift = { x : -1, y : 0 }
                    break
                case -1 :
                default:
                    shift = { x : 0, y : 0 }
                    break
            }
            
            const position = {
                x : this.#position.from.x + shift.x,
                y : this.#position.from.y + shift.y,
            }

            props.isMoving = this.hitbox( position )
            if ( props.isMoving )
                this.position = {
                    x : this.#position.from.x + shift.x,
                    y : this.#position.from.y + shift.y,
                }


        // } catch {}
    }

    shift ( direction ) {
        let shift = {  }
        switch ( direction ) {
            case 0:
                shift = { x : 0, y : -1 }
                break
            
            case 1:
                shift = { x : +1, y : 0 }
                break
            
            case 2:
                shift = { x : 0, y : +1 }
                break
            
            case 3:
                shift = { x : -1, y : 0 }
                break
            case -1 :
            default:
                shift = { x : 0, y : 0 }
                break
        }
        
        return  {
            x : this.#position.from.x + shift.x,
            y : this.#position.from.y + shift.y,
        }
    }
    /// unused
    translate ( position = { x : 0, y : undefined }) {

    }

    hitbox ( pos = this.position.from ) {
        const { from, to } =  this.createPositionPackage ( pos )

        for ( let i = from.y; i <= to.y; i++  ) {
            for (let j = from.x; j <= to.x; j++){
                const position = {
                    x : j,
                    y : i
                }

                if ( !this.isOnBoard ( position ) || this.isBorder(position))
                    return false
            }
        }

        return true
    }

    allSegments ( callback ) {
        const { from, to } =  this.position

        for ( let i = from.y; i <= to.y; i++  ) {
            for (let j = from.x; j <= to.x; j++){
                const position = {
                    x : j,
                    y : i
                }
                callback ( position )
            }
        }
    }

    //// CHECKS ///

    checkPosition ( position ) {
        const { from, to } = this.createPositionPackage( position )
        return this.isOnBoard( from ) 
            && this.isOnBoard( to )
            && !this.isBorder( from ) 
            && !this.isBorder( to ) 

    }

    isBorder ( position ) {
        const { x, y } = position
        return this.#borders[ parseInt( y/2 ) ][ parseInt( x/2 )] == -1
    }

    isOnBoard ( position = { x: 0, y: 0 } ) {
        
        if ( position.x < 0 ) return false
        if ( position.x >= this.borders.length * 2/3 ) return false
        
        if ( position.y < 0 ) return false
        if ( position.y >= this.borders[0].length *2 ) return false

        return true
    }

    createPositionPackage ( position ) {
        return {
            from : position,
            to : {
                x : position.x + ( this.#segments +1),
                y : position.y + ( this.#segments +1),
            }
        }
    }

    //// SETTERS ////

    set slowness ( slowness ) {
        this.#slowness = slowness
    }

    set sequence ( sequence ) {
        this.#sequence = {
            list : sequence,
            frame : 0
        }

        for ( const direction of this.#sequence.list ) {
            for ( const frame of direction ) {
                for ( const field of frame )
                    field.segments = this.#segments
            }
        }
        // console.log(this.#sequence)
    }

    set position ( position = { x : 0, y : 0 } ) {
        this.#position = this.createPositionPackage(position)
    }

    set direction ( direction ) {
        this.move(direction)
    }

    set lastDirection ( direction ) {
        this.#lastDirection = direction
    }
    set lastLastDirection ( direction ) {
        this.#lastLastDirection = direction
    }

    set borders ( borders = [[]] ) {
        this.#borders = borders
    }

    //// GETTERS ////

    get slowness ( ) {
        return this.#slowness
    }

    get sequence ( ) {
        return this.#sequence.list
    }

    get position ( ) {
        return this.#position
    }
    
    get direction ( ) {
        return this.#direction
    }

    get lastDirection ( ) {
        return this.#lastDirection
    }
    
    get lastLastDirection ( ) {
        return this.#lastLastDirection
    }
    
    get borders ( ) {
        return this.#borders
    }
}