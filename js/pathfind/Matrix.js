console.log('loaded : Matrix.js')

class Matrix {
    
    //// PRIVATE VARS ////

    #width = 1
    #height = 1
    


    //// HTML ////

    #html = {
        generate : false,
        main : document.createElement('div')
    }


    //// BOARDS ////

    #borders = [[]]
    #fields = []

    //// PATH ////

    #path = {
        start : new Node(),
        end : new Node(),
        path : []
    }

    //// MAIN ////

    constructor ( props ) {
        this.width = props.x || this.#width
        this.height = props.y || this.#height

        this.#html.generate = props.generateHtml || this.#html.generate
        this.#borders = props.borders || this.#borders
        // console.table(this.#borders)
        this.init ( )
    }

    init ( ) {
        // this.#borders = []
        this.#fields = []

        const { width, height } = this

        for (let i = 0; i < width; i++){
            // const borderRow = []
            const fieldRow = []

            for (let j = 0; j < height ; j++) {
                fieldRow.push(new Node ({
                    x : j,
                    y : i,
                    generateHtml : this.#html.generate
                }))
            }

            // this.#borders.push(borderRow)
            this.#fields.push(fieldRow)
        }

        // console.log(this.#fields)

        this.reset()
        // this.resetBorders()

        if ( this.#html.generate )
            this.generateHtml ( )

    }

    //// MAIN FUNCTIONS ////

    findPath ( start = this.start , end = this.end , maximum = Infinity ) {
        /// translate positions to nodes ///
        if ( start.x != undefined || start.y != undefined )
            start = this.find( start )
        if ( end.x != undefined || end.y != undefined )
            end = this.find( end )

        let openList = [ start ]
        let closedList = []

        let result = {}

        // console.log(start, end)
        // let finish = false

        // if ( start.positionJSON == end.positionJSON ) {
        //     finish = true
        // }
        let repeats = 0

        let allChilds = []

        while ( openList.length != 0) {
            repeats++
            // const mins = Math.min.apply( Math, checkedList.map( function (o) {
            //     return o.f
            // }))

            /// get current node ///
            const currentNode = openList.reduce( 
                ( min, field ) => min.f < field.f
                ? min 
                : field
            )
            openList = reduceArr( openList, currentNode )
            closedList.push( currentNode )

            /// found the goal ///
            if ( currentNode.positionJSON == end.positionJSON ){
                // console.log('win')
                const path = []

                let current = currentNode.position

                while ( JSON.stringify(current) !== JSON.stringify(start.position) ) {
                    let next = this.find( current ).parent
                    console.table(this.find(current))
                    if ( JSON.stringify(next) == JSON.stringify(current) ) 
                        break

                    path.push(current)
                    current = next //this.find ( current ).parent
                }

                result = {
                    checked : [ closedList, openList ].flat(),
                    path : path.reverse()
                }

                break
            }

            // console.log(currentNode)

            /// generate children ///
            const children = this.getNeighbours( currentNode.position )

            allChilds.push( children )
            allChilds = allChilds.flat()

            // console.table(children)
            // console.log(openList)

            // console.log(currentNode)
            for ( const child of children ) {

                /// Child is on the closedList
                if ( closedList.includes( child ) ){
                    // console.log('closed')
                    continue
                }

                /// set f, g and h
                child.g = currentNode.g + 1 // zmienic, jeśli trzeba
                child.h = this.distance( child.position, end.position )
                child.f = child.g + child.h

                // console.log(child.g, child.h, child.f)

                /// Child is already in openList
                if ( openList.includes( child ) ) {
                    const max = Math.max.apply( Math, openList.map( function (o) {
                        return o.g
                    }))
                    
                    if ( child.g > max )
                        continue
                }

                // add the child to the openlist
                openList.push(child)
            }
        }
        // console.log(allChilds)
        return result
    }

    getNeighbours ( position ) {
        // console.log(position)
        // const position = cloneObj( pos )
        const finalResult = []
        const result = []
        const neighbours = [
            { x : 0,    y : -1  },
            { x : 1,    y : 0   },
            { x : 0,    y : 1   },
            { x : -1,   y : 0   }
        ]

        for ( const neighbour of neighbours ) {
            const currentPosition = this.translate ( position, neighbour )
            if ( this.isOnBoard( currentPosition ) && !this.isAlreadyCounted( currentPosition ) && !this.isBorder( currentPosition ) ) { //&& this.isEmptyField ( currentPosition )
                result.push( currentPosition )
            }
        }

        for ( const neighbour of result ) {
            const { x, y } = neighbour
            this.#fields[y][x].parent = position
            // console.log(this.#fields[y][x].parent)
            finalResult.push( this.#fields[y][x] )
        }

        return finalResult
    }

    /// estimated
    distance ( from, to ) {
        const { pow } = Math

        return pow( from.x - to.x, 2 ) + pow ( from.y - to.y, 2 )
    }

    translate ( position, translation ) {
        const clone = cloneObj( position )
        clone.x += translation.x
        clone.y += translation.y
        return clone
    }

    //// BOOLS ///

    isOnBoard ( position ) {
        
        if ( position.x < 0 ) return false
        if ( position.x >= this.#fields.length ) return false
        
        if ( position.y < 0 ) return false
        if ( position.y >= this.#fields[0].length ) return false
        // console.log(position.x, position.y)
        return true
    } 
    
    isAlreadyCounted( position ) {
        // const { x, y } = position
        return this.find( position ).f > 0
    }

    isBorder ( position ) {
        const { x, y } = position
        return this.#borders[ y ] [ x ] == -1
    }

    //// UTILITIES ////

    find ( position ) {
        return this.#fields[position.y][position.x]
    }

    //// RESET AND REFRESH ////

    reset ( ) {
        for ( const row of this.#fields ) {
            for (const child of row)
                child.reset ( )
        }
        this.resetBorders()
    }

    resetBorders ( ) {
        const fields = this.#fields
        const borders = this.#borders
        
        for ( let i in borders ){
            for (let j in borders[i]){
                fields[i][j].isBorder = borders[i][j]
                if ( this.#html.generate )
                    fields[i][j].reset()
            }
        }
    }

    //// HTML ////

    generateHtml ( ) {
        /// add class ///

        this.html.classList.add('matrix')

        /// append ///

        for (const row of this.#fields){
            for ( const child of row ) {
                this.html.appendChild( child.html )
            }
        }

        /// make good grid ///

        this.html.style.gridTemplateColumns = `repeat(${ this.#fields.length }, auto)`
        
    }

    addEventListener( event, callback ) {
        for (const row of this.#fields)
            for ( const child of row )
                child.addEventListener( event, callback )
    }

    //// SETTERS ////

    set height ( height ) {
        this.#height = height
    }

    set width ( width ) {
        this.#width = width
    }

    set borders ( borders ) { 
        this.#borders = borders 
    }

    
    set start ( start ) {
        this.#path.start = start
    }

    set end ( end ) {
        this.#path.end = end
    }

    //// GETTERS ////

    get height ( ) { return this.#height }
    get width ( ) { return this.#width }
    
    get borders ( ) { return this.#borders } 
    get fields ( ) { return this.#fields }
    get html ( ) { return this.#html.main }

    get start ( ) { return this.#path.start }
    get end ( ) { return this.#path.end }
    get path ( ) { return this.#path.path }
}