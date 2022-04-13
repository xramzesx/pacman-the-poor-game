console.log('loaded : net.js')

class Net {
    constructor() { }

    generateHeader ( data ) {
        return {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify( data )
        }
    }

    async _fetch( url , data ) {
        return await (
            await fetch( url, data 
                ? this.generateHeader(data)
                : data
            )
        ).text()
    }

    async fetch( url, callback = () => {} ) {
        callback( await this._fetch( url ) )
    }

    async long ( props , callback ) {
        const data = await this._fetch( props.url, props.data )
        callback(data, props)
        console.log(props.data)
        // if ( props.stop === undefined || !props.stop )
        if (props.stop) return;
        else this.long( props, callback )
    }

    async send ( props, callback ) {
        const data = await this._fetch( props.url, props.data )
        callback( data )
    }
}