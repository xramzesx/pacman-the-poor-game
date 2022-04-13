console.log('loaded : main.js')

const game = {
    map : {
        border : undefined,
        point : undefined
    },
    canvas : {
        border : undefined,
        action : undefined
    },
    arr : {
        border : [[]],    // 2-dimensional
        area : [],
    },
    characters : {
        player : undefined,
        ghosts : []
    },
    voids : {
        over : () => {
            document.getElementById('game-over').classList.add('game-over--show')
        }
    }
}

//// CANVASES ////

let borderCanvas
let actionCanvas

//// UTILITIES ////

const net = new Net()

const setUpFields = ( canvasArea, props ) => {
    const { fields, arr } = props
    
    if ( Array.isArray( arr ) ) {
        let { segments, content } = props
        segments = segments || 1
        content = content || 0

        // if ( segments !== undefined ) {
            for (let i = 0; i < fields.y * segments; i++ ){
                const rowsField = []
                for ( let j = 0; j < fields.x * segments; j++){
                    rowsField.push( content )
                }
                props.arr.push(rowsField)
            }
        // }
    }

    for (let i = 0; i < fields.y ; i++ ){
        const rowsField = []
        for (let j = 0; j < fields.x ; j++ ){
            const position = {
                source : {
                    x: 0,
                    y: 2
                },
                destination : {
                    x : j ,
                    y : i ,
                },
                ctx : canvasArea.ctx
            }
            rowsField.push( new Field( position, false ) )
        }
        canvasArea.elements.push(rowsField)
    }
}

const generate = ( json, canvasArea, props = { } ) => {
    if (typeof json === typeof "")
        json = JSON.parse(json)

    //// CLEARING ////
        
    for (let i in canvasArea.elements){
        for (let j in canvasArea.elements[i]){
            canvasArea.elements[i][j].import({
                source : { x: 0, y: 2 },
                canvas : { grid: { x: j, y: i } }
            },1)
        }
    }

    //// IMPORTING MAP ////

    const { thickness } = props

    for (let i in json){
        const { x,y } = json[i].canvas.grid
        const current = json[i]

        current.segments = current.segments == undefined 
            ? props.segments || 1
            : current.segments

        const { segments } = current
        
        canvasArea.elements[y * segments][ x * segments].import(current,1)
        
        if ( Array.isArray( props.map ) ){
            // for (let ii = 0; ii < 2; ii++){
                // for (let jj = 0; jj < 2; jj++){
                    props.map[y * segments  ][x * segments ] = -1
                // }
            // }
            console.log('tablica')
        }

    }
}



//// MAIN GENERATING ELEMENTS ////

const generateBorderMap = ( x, y ) => {
    const map = []
    for (let i = 0; i < y; i++){
        const row = []
        for (let j = 0; j < x; j++)
            row.push(0)
        map.push(row)
    }

    return map
}

const main = async () => {
    //// MAIN VARS ////
    game.map = {
        border : await net._fetch('./saves/board.pac.json'),
        point : await net._fetch('./saves/loading.pac.json')
    }

    const { fields } = defaults

    //// SETTING UP BORDERS MAP ////

    game.arr.border = generateBorderMap ( fields.x , fields.y  )

    //// SETTING UP CANVASES ////

    const borderExporter = {
        fields : fields,
        name : "border-map"
    }
    const actionExporter = {
        fields : {
            x : fields.x * 2,
            y : fields.y * 2,
        },
        name : "action-map"
    }
    borderCanvas = new CanvasField( borderExporter )
    actionCanvas = new CanvasField( actionExporter )


    //// LOAD SPRITESHEET ////

    defaults.img.src = "gfx/spritemap-384.png"
    defaults.img.onload = () => {
        
        //// BORDER MAP ////

        setUpFields( borderCanvas, { fields : borderExporter.fields, arr : game.arr.border, segments : 2 } )
        generate( game.map.border,  borderCanvas, { map : game.arr.border, segments : 1, thickness : 2 } )
        
        //// ACTION MAP ////
        
        setUpFields( actionCanvas, { fields : actionExporter.fields, arr : game.arr.area } )
        generate( game.map.point,   actionCanvas, { segments : 2 } )
        

        /// GENERATE PLAYER ///

        game.characters.player = new Player ({
            canvas : actionCanvas,
            position : { x: 19 * 2 , y: 27 * 2 },
            // position : { x: 19 * 2 , y: 26 * 2 },
            // position : { x: 19 * 2 , y: 27.5 * 2 },
            sequence : defaults.sequences.player,
            border : game.arr.border
        } )
        
        /// GENERATE GHOSTS ////
        const ghostPositions = [
            { x: 17 * 2 , y: 18 * 2 },
            { x: 19 * 2 , y: 18 * 2 },
            { x: 21 * 2 , y: 18 * 2 },
            { x: 19 * 2 , y: 16 * 2 },
        ]
        for (let i = 0; i < 4; i++)
            game.characters.ghosts.push(new Ghost({
                canvas : actionCanvas,
                position : ghostPositions[i],
                sequence : defaults.sequences.ghosts[i],
                border : game.arr.border,
                oncaught : e => {
                    clearInterval(gameInterval)
                    game.voids.over ( )
                },
            }))

        gameInterval = setInterval(() => {
            goNextStep = true
        }, 50);

        render()


    }
}

//// MAIN RENDER ELEMENTS ////
let gameInterval
let step = 0
let goNextStep = true

const render = () => {
    // console.log('run')
    if ( goNextStep ){
        goNextStep = false
        step = step == 60 ? 0 : step + 1
        // console.log(step)
        actionCanvas.clear()
        
        //// ANIMATE ////
    
        game.characters.player.render( step , isAutoturnON )
        for ( const ghost of game.characters.ghosts )
            ghost.render( step, game.characters.player.position )
        }
    requestAnimationFrame( render )
}


//// LISTENERS ////

let isAutoturnON = false

/// MAIN ///
document.addEventListener('DOMContentLoaded', () => {
    console.log('loaded')
    document.getElementById('autoturn').addEventListener( 'input', e => {
        console.log( document.getElementById('autoturn').checked )
        isAutoturnON = document.getElementById('autoturn').checked
    })
    main()
})
let firstPress = true
/// TODO :
/// point map
/// main border map

/// CONTROLS ///
window.addEventListener('keydown', (e)=>{
    console.log(e.key)
    
    if (firstPress){
        firstPress = false
        for (let i in game.characters.ghosts)
            game.characters.ghosts[i].move( getRandom( 0,4 ) )
    }

    const { controls } = defaults
    e.preventDefault()
    switch (e.key) {
        case controls[0]:
            game.characters.player.move(0)
            // for (const ghost of game.characters.ghosts)
            //     ghost.move(0)
            break
        case controls[1]:
            game.characters.player.move(1)
            // for (const ghost of game.characters.ghosts)
            //     ghost.move(1)
            break
        case controls[2]:
            game.characters.player.move(2)
            // for (const ghost of game.characters.ghosts)
            //     ghost.move(2)
            break
        case controls[3]:
            game.characters.player.move(3)
            // for (const ghost of game.characters.ghosts)
            //     ghost.move(3)
            break
            
    }
})
