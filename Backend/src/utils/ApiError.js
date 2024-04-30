class Apierror extends Error{
    constructor(statusCode,message="Something went wrong !!"){
        super(message)
        this.data = null
        this.statusCode = statusCode
        this.message = message
    }
}

export default Apierror