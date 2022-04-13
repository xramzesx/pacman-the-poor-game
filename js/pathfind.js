console.log('loaded : pathfind.js')

//// EXAMPLE UTILITIES ////

const generateBordersMap = (x, y) => {
    const bordersMap = []

    for (let i = 0; i < y; i++ ){
        const rows = []
        for (let j = 0; j < x; j++)
            rows.push(0)
        bordersMap.push(rows)
    }

    return bordersMap
}

const resetBorders = arr => {
    for (let i in arr)
        for (let j in arr)
            arr[i][j] = 0
}

const generateRandomBorders = ( arr, maxBorders ) => {
    const { length : height } = arr
    const { length : width } = arr[0]

    for (let i = 0; i < maxBorders; i++)
        arr[ getRandom( 0, height ) ][ getRandom( 0, width ) ] = -1
}

const size = 40
const randomCount = 500

const borders = generateBordersMap( size, size )
generateRandomBorders( borders, randomCount )

console.table(borders)

const setMessage = message => {
    document.getElementById('messages').innerHTML = message
}

const matrix = new Matrix({
    x : size,
    y : size,
    generateHtml : true,
    borders : borders
})

document.addEventListener('DOMContentLoaded', e => {
    console.log(matrix.html)
    document.getElementById('board').appendChild(matrix.html)
    
    let step = 1   // max 3
    let minStep = 1
    let maxStep = 3


    matrix.addEventListener('click',  (e, that) => {
        
        console.log(that)
        if ( !that.isBorder ){
            switch ( step ) {
                case 1 : 
                    matrix.start = that
                    that.classList.add('matrix__field--start')
                    setMessage('Krok 2: ustaw koniec ścieżki')
                    break
                case 2 :
                    let message = ""
                    matrix.end = that
                    that.classList.add('matrix__field--end')
                    
                    const { checked, path } = matrix.findPath()
    
                    for (let i in checked){
                        checked[i].classList.add('matrix__field--checked')
                    }
    
                    for (let i in path){
                        
                        const node = matrix.find(path[i])
                        node.classList.add('matrix__field--path')
                    }
                    
                    
                    try {
                        console.log("długość zaznaczen",checked.length)
                        console.log("długość ścieżki",path.length)
                        if ( path.length == 0 ){
                            console.log('to samo pole')
                            message = 'Jest to to samo pole'
                        } else {
                            message = 'Znaleziono ścieżkę'
                        }
                    } catch {
                        /// nie znaleziono nic
                        console.log('nie znaleziono ścieżki')
                        message = "Ścieżka nie istnieje"
                    }

                    setMessage( `Krok 3 : ${ message }. <br>Kliknij ponownie, żeby zresetować` )
                    break
                case 3 :
                    resetBorders( borders )
                    generateRandomBorders( borders, randomCount )
                    matrix.borders = borders                    
                    matrix.reset()
                    setMessage("Krok 1. : Ustaw początek ścieżki")
                    break
            }
    
            step = step >= maxStep ? minStep : step + 1
        }
        console.log(step)
        // console.log(this)
    })

})