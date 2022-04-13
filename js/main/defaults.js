console.log('loaded : defaults.js')

//// DEFAULTS ////

const elements = []
const defaults = {
    fields : {
        x : 40,
        y : 40
    },
    cleaner : {
        source : {
            offsetX : 0,
            offsetY : 2 * 12 * 2,
        },
        isNotEmpty : false,
    },
    fieldSize : {
        height: 12,
        width: 12
    },
    scale : 2,
    field : {
        empty : {
            source : {
                offsetX : 0,
                offsetY : 2 * 12 * 2,
            }
        }
    },
    img : new Image(),
    controls : [
        "ArrowUp",
        "ArrowRight",
        "ArrowDown",
        "ArrowLeft"
    ],
    directions : [
        { dir : 0, x : 0, y : -1 },
        { dir : 1, x : 1, y : 0 },
        { dir : 2, x : 0, y : 1 },
        { dir : 3, x : -1, y : 0 },

        { dir : 0, x : 0, y : -2 },
        { dir : 1, x : 2, y : 0 },
        { dir : 2, x : 0, y : 2 },
        { dir : 3, x : -2, y : 0 },

        { dir : 0, x : 1, y : -2 },
        { dir : 0, x : -1, y : -2 },
        { dir : 1, x : 2, y : 1 },
        { dir : 1, x : 2, y : -1 },
        { dir : 2, x : 1, y : 2 },
        { dir : 2, x : -1, y : 2 },
        { dir : 3, x : -2, y : 1 },
        { dir : 3, x : -2, y : -1 },


        /// 3

        { dir : 0, x : 0, y : -3 },
        { dir : 1, x : 3, y : 0 },
        { dir : 2, x : 0, y : 3 },
        { dir : 3, x : -3, y : 0 },

        { dir : 0, x : 1, y : -3 },
        { dir : 0, x : -1, y : -3 },
        { dir : 0, x : 2, y : -3 },
        { dir : 0, x : -2, y : -3 },
        
        { dir : 1, x : 3, y : 1 },
        { dir : 1, x : 3, y : -1 },
        { dir : 1, x : 3, y : 2 },
        { dir : 1, x : 3, y : -2 },

        { dir : 2, x : 1, y : 3 },
        { dir : 2, x : -1, y : 3 },
        { dir : 2, x : 2, y : 3 },
        { dir : 2, x : -2, y : 3 },
        
        { dir : 3, x : -3, y : 1 },
        { dir : 3, x : -3, y : -1 },
        { dir : 3, x : -3, y : 2 },
        { dir : 3, x : -3, y : -2 },

        //// 4

        { dir : 0, x : 0, y : -4 },
        { dir : 1, x : 4, y : 0 },
        { dir : 2, x : 0, y : 4 },
        { dir : 3, x : -4, y : 0 },

        { dir : 0, x : 1, y : -4 },
        { dir : 0, x : -1, y : -4 },
        { dir : 0, x : 2, y : -4 },
        { dir : 0, x : -2, y : -4 },
        { dir : 0, x : 3, y : -4 },
        { dir : 0, x : -3, y : -4 },
        
        { dir : 1, x : 4, y : 1 },
        { dir : 1, x : 4, y : -1 },
        { dir : 1, x : 4, y : 2 },
        { dir : 1, x : 4, y : -2 },
        { dir : 1, x : 4, y : 3 },
        { dir : 1, x : 4, y : -3 },

        { dir : 2, x : 1, y : 4 },
        { dir : 2, x : -1, y : 4 },
        { dir : 2, x : 2, y : 4 },
        { dir : 2, x : -2, y : 4 },
        { dir : 2, x : 3, y : 4 },
        { dir : 2, x : -3, y : 4 },
        
        { dir : 3, x : -4, y : 1 },
        { dir : 3, x : -4, y : -1 },
        { dir : 3, x : -4, y : 2 },
        { dir : 3, x : -4, y : -2 },
        { dir : 3, x : -4, y : 3 },
        { dir : 3, x : -4, y : -3 },


    ],
    sequences : {
        player : [
            //// ALL DIRECTIONS ////
            // up
            [
                [
                    {source:{x:2,y:6},canvas:{pixels:{x:{from:0,to:12},y:{from:0,to:12}},grid:{x:0,y:0}}},
                    {source:{x:3,y:6},canvas:{pixels:{x:{from:25,to:37},y:{from:0,to:12}},grid:{x:1,y:0}}},
                    {source:{x:2,y:7},canvas:{pixels:{x:{from:0,to:12},y:{from:25,to:37}},grid:{x:0,y:1}}},
                    {source:{x:3,y:7},canvas:{pixels:{x:{from:25,to:37},y:{from:25,to:37}},grid:{x:1,y:1}}}
                ],
                [
                    {source:{x:6,y:6},canvas:{pixels:{x:{from:0,to:12},y:{from:0,to:12}},grid:{x:0,y:0}}},
                    {source:{x:7,y:6},canvas:{pixels:{x:{from:25,to:37},y:{from:0,to:12}},grid:{x:1,y:0}}},
                    {source:{x:6,y:7},canvas:{pixels:{x:{from:0,to:12},y:{from:25,to:37}},grid:{x:0,y:1}}},
                    {source:{x:7,y:7},canvas:{pixels:{x:{from:25,to:37},y:{from:25,to:37}},grid:{x:1,y:1}}}
                ]
            ],
            // right
            [
                [
                    {source:{x:8,y:6},canvas:{pixels:{x:{from:0,to:12},y:{from:0,to:12}},grid:{x:0,y:0}}},
                    {source:{x:9,y:6},canvas:{pixels:{x:{from:25,to:37},y:{from:0,to:12}},grid:{x:1,y:0}}},
                    {source:{x:8,y:7},canvas:{pixels:{x:{from:0,to:12},y:{from:25,to:37}},grid:{x:0,y:1}}},
                    {source:{x:9,y:7},canvas:{pixels:{x:{from:25,to:37},y:{from:25,to:37}},grid:{x:1,y:1}}},
                ],
                [
                    {source:{x:12,y:6},canvas:{pixels:{x:{from:0,to:12},y:{from:0,to:12}},grid:{x:0,y:0}}},
                    {source:{x:13,y:6},canvas:{pixels:{x:{from:25,to:37},y:{from:0,to:12}},grid:{x:1,y:0}}},
                    {source:{x:12,y:7},canvas:{pixels:{x:{from:0,to:12},y:{from:25,to:37}},grid:{x:0,y:1}}},
                    {source:{x:13,y:7},canvas:{pixels:{x:{from:25,to:37},y:{from:25,to:37}},grid:{x:1,y:1}}}
                ]
            ],
            // down
            [
                [
                    {source:{x:10,y:6},canvas:{pixels:{x:{from:0,to:12},y:{from:0,to:12}},grid:{x:0,y:0}}},
                    {source:{x:11,y:6},canvas:{pixels:{x:{from:25,to:37},y:{from:0,to:12}},grid:{x:1,y:0}}},
                    {source:{x:10,y:7},canvas:{pixels:{x:{from:0,to:12},y:{from:25,to:37}},grid:{x:0,y:1}}},
                    {source:{x:11,y:7},canvas:{pixels:{x:{from:25,to:37},y:{from:25,to:37}},grid:{x:1,y:1}}}   
                ],
                [
                    {source:{x:14,y:6},canvas:{pixels:{x:{from:0,to:12},y:{from:0,to:12}},grid:{x:0,y:0}}},
                    {source:{x:15,y:6},canvas:{pixels:{x:{from:25,to:37},y:{from:0,to:12}},grid:{x:1,y:0}}},
                    {source:{x:14,y:7},canvas:{pixels:{x:{from:0,to:12},y:{from:25,to:37}},grid:{x:0,y:1}}},
                    {source:{x:15,y:7},canvas:{pixels:{x:{from:25,to:37},y:{from:25,to:37}},grid:{x:1,y:1}}}
                ]
            ],
            // left
            [
                [
                    {source:{x:0,y:6},canvas:{pixels:{x:{from:0,to:12},y:{from:0,to:12}},grid:{x:0,y:0}}},
                    {source:{x:1,y:6},canvas:{pixels:{x:{from:25,to:37},y:{from:0,to:12}},grid:{x:1,y:0}}},
                    {source:{x:0,y:7},canvas:{pixels:{x:{from:0,to:12},y:{from:25,to:37}},grid:{x:0,y:1}}},
                    {source:{x:1,y:7},canvas:{pixels:{x:{from:25,to:37},y:{from:25,to:37}},grid:{x:1,y:1}}}
                ],
                [
                    {source:{x:4,y:6},canvas:{pixels:{x:{from:0,to:12},y:{from:0,to:12}},grid:{x:0,y:0}}},
                    {source:{x:5,y:6},canvas:{pixels:{x:{from:25,to:37},y:{from:0,to:12}},grid:{x:1,y:0}}},
                    {source:{x:4,y:7},canvas:{pixels:{x:{from:0,to:12},y:{from:25,to:37}},grid:{x:0,y:1}}},
                    {source:{x:5,y:7},canvas:{pixels:{x:{from:25,to:37},y:{from:25,to:37}},grid:{x:1,y:1}}}
                ]
            ],
            // default
            [
                [
                    {source:{x:12,y:6},canvas:{pixels:{x:{from:0,to:12},y:{from:0,to:12}},grid:{x:0,y:0}}},
                    {source:{x:13,y:6},canvas:{pixels:{x:{from:25,to:37},y:{from:0,to:12}},grid:{x:1,y:0}}},
                    {source:{x:12,y:7},canvas:{pixels:{x:{from:0,to:12},y:{from:25,to:37}},grid:{x:0,y:1}}},
                    {source:{x:13,y:7},canvas:{pixels:{x:{from:25,to:37},y:{from:25,to:37}},grid:{x:1,y:1}}}
                ]
            ]
        ],
        ghost : [
            
            // up
            [
                [
                    {source:{x:12,y:12},canvas:{pixels:{x:{from:0,to:12},y:{from:0,to:12}},grid:{x:0,y:0}}},
                    {source:{x:13,y:12},canvas:{pixels:{x:{from:25,to:37},y:{from:0,to:12}},grid:{x:1,y:0}}},
                    {source:{x:12,y:13},canvas:{pixels:{x:{from:50,to:62},y:{from:0,to:12}},grid:{x:2,y:0}}},
                    {source:{x:13,y:13},canvas:{pixels:{x:{from:75,to:87},y:{from:0,to:12}},grid:{x:3,y:0}}}
                ],
                [
                    {source:{x:14,y:12},canvas:{pixels:{x:{from:0,to:12},y:{from:0,to:12}},grid:{x:0,y:0}}},{source:{x:15,y:12},canvas:{pixels:{x:{from:25,to:37},y:{from:0,to:12}},grid:{x:1,y:0}}},{source:{x:14,y:13},canvas:{pixels:{x:{from:50,to:62},y:{from:0,to:12}},grid:{x:2,y:0}}},{source:{x:15,y:13},canvas:{pixels:{x:{from:75,to:87},y:{from:0,to:12}},grid:{x:3,y:0}}}
                ]
            ],
            // right
            [
                [
                    {source:{x:0,y:12},canvas:{pixels:{x:{from:0,to:12},y:{from:0,to:12}},grid:{x:0,y:0}}},
                    {source:{x:1,y:12},canvas:{pixels:{x:{from:25,to:37},y:{from:0,to:12}},grid:{x:1,y:0}}},
                    {source:{x:0,y:13},canvas:{pixels:{x:{from:50,to:62},y:{from:0,to:12}},grid:{x:2,y:0}}},
                    {source:{x:1,y:13},canvas:{pixels:{x:{from:75,to:87},y:{from:0,to:12}},grid:{x:3,y:0}}}
                ],
                [
                    {source:{x:2,y:12},canvas:{pixels:{x:{from:0,to:12},y:{from:0,to:12}},grid:{x:0,y:0}}},
                    {source:{x:3,y:12},canvas:{pixels:{x:{from:25,to:37},y:{from:0,to:12}},grid:{x:1,y:0}}},
                    {source:{x:2,y:13},canvas:{pixels:{x:{from:50,to:62},y:{from:0,to:12}},grid:{x:2,y:0}}},
                    {source:{x:3,y:13},canvas:{pixels:{x:{from:75,to:87},y:{from:0,to:12}},grid:{x:3,y:0}}}
                ]
            ],
            // down
            [
                [
                    {source:{x:4,y:12},canvas:{pixels:{x:{from:0,to:12},y:{from:0,to:12}},grid:{x:0,y:0}}},
                    {source:{x:5,y:12},canvas:{pixels:{x:{from:25,to:37},y:{from:0,to:12}},grid:{x:1,y:0}}},
                    {source:{x:4,y:13},canvas:{pixels:{x:{from:50,to:62},y:{from:0,to:12}},grid:{x:2,y:0}}},
                    {source:{x:5,y:13},canvas:{pixels:{x:{from:75,to:87},y:{from:0,to:12}},grid:{x:3,y:0}}}
                ],
                [
                    {source:{x:6,y:12},canvas:{pixels:{x:{from:0,to:12},y:{from:0,to:12}},grid:{x:0,y:0}}},
                    {source:{x:7,y:12},canvas:{pixels:{x:{from:25,to:37},y:{from:0,to:12}},grid:{x:1,y:0}}},
                    {source:{x:6,y:13},canvas:{pixels:{x:{from:50,to:62},y:{from:0,to:12}},grid:{x:2,y:0}}},
                    {source:{x:7,y:13},canvas:{pixels:{x:{from:75,to:87},y:{from:0,to:12}},grid:{x:3,y:0}}}
                ]
            ],
            // left
            [
                [
                    {source:{x:8,y:12},canvas:{pixels:{x:{from:0,to:12},y:{from:0,to:12}},grid:{x:0,y:0}}},
                    {source:{x:9,y:12},canvas:{pixels:{x:{from:25,to:37},y:{from:0,to:12}},grid:{x:1,y:0}}},
                    {source:{x:8,y:13},canvas:{pixels:{x:{from:50,to:62},y:{from:0,to:12}},grid:{x:2,y:0}}},
                    {source:{x:9,y:13},canvas:{pixels:{x:{from:75,to:87},y:{from:0,to:12}},grid:{x:3,y:0}}}
                ],
                [
                    {source:{x:10,y:12},canvas:{pixels:{x:{from:0,to:12},y:{from:0,to:12}},grid:{x:0,y:0}}},
                    {source:{x:11,y:12},canvas:{pixels:{x:{from:25,to:37},y:{from:0,to:12}},grid:{x:1,y:0}}},
                    {source:{x:10,y:13},canvas:{pixels:{x:{from:50,to:62},y:{from:0,to:12}},grid:{x:2,y:0}}},
                    {source:{x:11,y:13},canvas:{pixels:{x:{from:75,to:87},y:{from:0,to:12}},grid:{x:3,y:0}}}
                ]
            ],
            // default
            [
                [
                    {source:{x:2,y:12},canvas:{pixels:{x:{from:0,to:12},y:{from:0,to:12}},grid:{x:0,y:0}}},
                    {source:{x:3,y:12},canvas:{pixels:{x:{from:25,to:37},y:{from:0,to:12}},grid:{x:1,y:0}}},
                    {source:{x:2,y:13},canvas:{pixels:{x:{from:50,to:62},y:{from:0,to:12}},grid:{x:2,y:0}}},
                    {source:{x:3,y:13},canvas:{pixels:{x:{from:75,to:87},y:{from:0,to:12}},grid:{x:3,y:0}}}
                ]
            ],

            
        ],
        ghosts : [],
        ghosts_shifts : [
            
                /// dla każdego z trzech osobny dorobić
                //// RED ///
                { x : 0, y : 0 },
                //// YELLOW ////
                { x : 0, y : 6 },
                //// BLUE ////
                { x : 16, y : 4 },
                //// PINK ////
                { x : 0, y : 4 },

                //// DEAD ////
                { x : 16, y : 6 }
             
        ] 
    }
}

const indexOfMax = arr => {
    if (arr.length === 0) {
        return -1;
    }

    let max = arr[0];
    let maxIndex = 0;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

const getMinMax = (arr, prop = "") => {
    let min = arr[0];
    let max = arr[0];
    let i = arr.length;

    

    if ( prop.length > 0 ){
        while (i--) {
            min = arr[i][prop] < min ? arr[i][prop] : min;
            max = arr[i][prop] > max ? arr[i][prop] : max;
        }
    }else{
        while (i--) {
            min = arr[i] < min ? arr[i] : min;
            max = arr[i] > max ? arr[i] : max;
        }
    }

    return { min, max };
}

const reduceArr = (arr, item) => {
    const index = arr.indexOf(item)
    if (index > -1 )
        arr.splice( index, 1 )
    return arr
}

const cloneObj = json => JSON.parse(JSON.stringify(json))
const translate = ( exporter, shifts ) => {
    const result = cloneObj ( exporter )
    result.source.x += +shifts.x
    result.source.y += +shifts.y
    return result
}

const getRandom = ( min, max ) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor( Math.random ( ) * (max - min ) ) + min
}

//// GENERATE OTHER GHOSTS SPRITES ////

for (const shifts of defaults.sequences.ghosts_shifts) {
    const ghost = []
    for ( const direction of defaults.sequences.ghost ){
        const currentDirrection = []
        for ( const frame of direction ) {
            const currentFrame = []
            
            for (const field of frame){
                
                // console.log(frame)
                currentFrame.push( translate( field, shifts ) )
            }
            currentDirrection.push(currentFrame)
        }
        ghost.push(currentDirrection)
    }
    defaults.sequences.ghosts.push(ghost)
}
// console.log(defaults.sequences.ghosts)

// defaults.characters.player[-1] = [[[]]] 