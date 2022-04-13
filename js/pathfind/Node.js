console.log('loaded : Node.js')

class Node {
    //// PRIVATE VARS ////

    /// distance and heuristic
    #g = 0
    #h = 0
    
    /// final cost
    #f = 0

    //// HTML ELEMENTS ////

    #html = {
        /// bools
        generateHtml : false,
        /// main
        main : document.createElement('div'),
        /// pointers
        g : document.createElement('div'),
        h : document.createElement('div'),
        f : document.createElement('div'),
    }

    #position = {
        x : 0,
        y : 0
    }

    #type = "" // [wall, field]
    #isBorder = false

    //// PSEUDO-RECURSION ////

    #parent

    //// MAIN ////

    constructor ( props = {} ) {
        this.#position = props.position || {
                x : props.x || this.#position.x, 
                y : props.y || this.#position.y
            }
        
        this.#html.generateHtml = props.generateHtml || this.#html.generateHtml

        this.parent = props.parent

        if ( this.#html.generateHtml ) {
            this.generateHtml()
        }

    }

    
    //// PATH FINDING ////


    //// HTML ////
    
    generateHtml () {
        /// add classes ///
        
        this.#html.g.classList.add('matrix__g')
        this.#html.h.classList.add('matrix__h')
        this.#html.f.classList.add('matrix__f')
        
        this.#html.main.classList.add('matrix__field')
        
        /// append to main element ///
        
        this.html.appendChild( this.#html.g )
        this.html.appendChild( this.#html.h )
        this.html.appendChild( this.#html.f )
        
        this.reset()
    }
    
    resetHtml ( ) {
        this.html.className = "matrix__field"
        if (this.#isBorder)
            this.html.classList.add('matrix__field--border')
    }

    addEventListener ( event, callback ) {
        this.html.addEventListener(event, e => {
            callback( e, this )
        })
    }

    //// UTILITES ////
    
    reset ( ) {
        this.g = 0
        this.h = 0
        this.f = 0
        this.parent = undefined

        if (this.#html.generateHtml)
            this.resetHtml()
    }

    //// SETTERS ////

    set g ( g ) {
        this.#g = g
        if (this.#html.generateHtml) {
            this.#html.g.innerHTML = g
        }
    }

    set h ( h ) {
        this.#h = h
        if (this.#html.generateHtml) {
            this.#html.h.innerHTML = h
        }
    }

    set f ( f ) {
        this.#f = f
        if (this.#html.generateHtml) {
            this.#html.f.innerHTML = f
        }
    }

    set type ( type ) { this.#type = type }
    set isBorder ( isBorder ) { this.#isBorder = isBorder }

    set parent ( parent ) { this.#parent = parent }

    //// GETTERS ////

    get g ( ) { return this.#g }
    get h ( ) { return this.#h }
    get f ( ) { return this.#f }

    get position ( ) { return this.#position }
    get positionJSON ( ) { return JSON.stringify(this.#position) }

    get type ( ) { return this.#type }
    get isBorder ( ) { return this.#isBorder }

    get parent ( ) { return this.#parent }

    get html ( ) { return this.#html.main }
    get classList ( ) { return this.html.classList }
}