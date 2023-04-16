class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode
    }
}

//Error middleware
const errorMiddleware = (err, req, res, next)=>{
    
    const message = err.message || "Internal Server Error";
    const statusCode = err.statusCode || 500;

    return  res.status(statusCode).send({
        success:false,
        message: message
        })
}


module.exports = {errorMiddleware, ErrorHandler}