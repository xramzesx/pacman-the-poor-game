console.log('loaded : Ghost.js')

class Ghost extends Character {

    //// PRIVATE VARS ////

    #matrix 

    //// MAIN ////

    constructor ( props ) {
        super( props )
        this.slowness = 2
        this.path = []
        this.matrix = new Matrix({
            x : this.borders.length,
            y : this.borders.length,
            borders : this.borders,
        })

        this.lastMove = cloneObj( this.position.from )
        this.lastDirection = cloneObj( this.direction )
        this.lastLastDirection = cloneObj( this.lastDirection )
        this.lastColision = false

        const caught = (e) => { console.log('złapany') }

        this.oncaught = props.oncaught || caught

        this.ghosts = [  ]
    }

    //// MAIN METHODS ////

    findPath ( position, from = this.position.from ) {
        const currentPos = {
            x : parseInt(from.x /2),
            y : parseInt(from.y /2),
        }
        
        const result = this.matrix.findPath( currentPos , position )
        this.matrix.reset()
        return result
    }

    render ( step, position ){
        // console.log ( position.from )
        // console.log ( this.position.from )
        const paths = []
        
        const pos = {
            x : parseInt( position.from.x / 2 ),
            y : parseInt( position.from.y / 2 ),
        }
        
        const { path } = this.findPath( pos )


        try {
            if ( path.length < 15){
                const translated = {
                    x : path[0].x * 2,
                    y : path[0].y * 2,
                }
        
                const curDirection = +this.getDirection( translated )
                const newPosition = this.shift( curDirection )
                // if ( this.isOnBoard( newPosition ) && !this.isBorder( newPosition ) )
                if ( this.hitbox( newPosition ) )
                    this.move( curDirection )
                else {
                    const anotherNewPosition = this.shift( this.lastDirection )
                    
                    if ( this.hitbox( anotherNewPosition ) )
                        this.move( this.lastDirection )
                    else {
                        const secondLastPasition = this.shift( this.lastLastDirection )
                        if ( this.hitbox(secondLastPasition) )
                            this.move( this.lastLastDirection )
                        else {

                            const rand = getRandom(0,4)
                            const andAnotherNewPosition = this.shift( rand )
                            // // if (this.hitbox( andAnotherNewPosition ))
                                this.move( rand )
                            // // else {
                            
                    //  /// w tym miejscu sprawdzało ścieżkę z każdego
                    //  /// pojedyńczego pola do gracza, lecz efekt
                    //  /// był podobny do rozwiązania powyżej
                    //  /// lecz mniej optymalny

                    //  /// pozostawiam zakomentowany fragment tego kodu:

                            //     const finalNewPosition = this.shift( this.lastDirection )
                            //     if ( this.hitbox( finalNewPosition ) ){
                            //         this.move( this.lastDirection )
                            //     } else {
                            //         this.allSegments( posi => {
                            //             paths.push( this.findPath( pos, posi ).path )
                            //         })
                            
                            //         const dominatedDirectection = [ 0, 0, 0, 0,0 ]
                            
                            //         console.log(dominatedDirectection)
                            //         for (let i in paths){
                            //             const translated = {
                            //                 x : paths[i][0].x * 2,
                            //                 y : paths[i][0].y * 2,
                            //             }
                            //             console.log(translated)
                            //             const dir = +this.getDirection( translated )
                            //             console.log(dir)
                            //             if (!isNaN(dir))
                            //                 dominatedDirectection[ dir ]++
                            //         }
                            //         const tmp = []
                            //         console.log(dominatedDirectection)
                            //         for (let i = 0; i < 4; i++){
                            //             tmp[i] = dominatedDirectection[i +1]
                            //         }
                            
                            //         console.log(tmp)
                                    
                            //         const direction = indexOfMax(tmp)
                            
                            //         console.log('dominated',direction)
                            //         this.move(direction)
                            //     }
    
                            // }
                        }                    
                    }


                    
                }
            } else {
                if ( this.lastColision === true )
                    this.move( getRandom( 0, 4 ) )
            }

        } catch { 
            // console.log('gotcha!') 
            this.oncaught(  )
        }
        
        const prop = {
            isMoving : true
        }
        super.render( step , prop )
        if (!prop.isMoving){

        }
        this.lastColision = !prop.isMoving

    }

    getDirection ( position ) {
        const directions = defaults.directions

        for (let i in directions){
            const direction = directions[i]

            if (JSON.stringify(position) == JSON.stringify({
                x : direction.x + parseInt(this.position.from.x /2 )*2,
                y : direction.y + parseInt(this.position.from.y /2 )*2
            })) {
                return directions[i].dir
            }
        }

        return 4
    }

    //// SETTERS ////

    set matrix ( matrix ) { this.#matrix = matrix }

    //// GETTERS ////

    get matrix ( ) { return this.#matrix }
}