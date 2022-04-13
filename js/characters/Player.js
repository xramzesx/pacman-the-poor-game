console.log('loaded : Player.js')

class Player extends Character {
    
    //// PRIVATE VARS ////
    
    #type = 'player'
    
    //// MAIN ////

    constructor ( props ) {
        super ( props ) 
        
    }

    //// MAIN METHODS ////

    render ( step, autoturn = false) {
        if (autoturn)
            this.autoturn (  )
        super.render( step )
    } 

    autoturn (  ) {
        const position = this.shift( this.direction )

        if ( !this.hitbox( position ) ) {
            if ( getRandom(0,2) )
                for (let i = 0; i < 4; i++) {
                    if ( i == ( this.direction + 2 ) % 4 )
                        continue
                    if ( this.hitbox( this.shift( i ) ) ) {
                        this.move ( i )
                        break
                    }
                }
            else
                for (let i = 3; i >=0; i--) {
                    if ( i == ( this.direction + 2 ) % 4 )
                        continue
                    if ( this.hitbox( this.shift( i ) ) ) {
                        this.move ( i )
                        break
                    }
                }
        } else {
            return;
        }
    }

    move ( direction ) {

        if ( this.hitbox( this.shift ( direction )  ) )
            super.move( direction )
    }
}