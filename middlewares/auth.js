const JWT = require("jsonwebtoken")



const isAuthenticated = (req, res, next) =>{

    const {token} = req.cookies
    
    if(!token){
        return res.status(400).send({
            success:false,
            message:"Please login"
        })
    }

        JWT.verify(token, process.env.SECRET_KEY, (error, user)=>{
            if(error){
                return res.status(400).send({
                    success:false,
                    message:"Please login again"
                })
            }
            else{
                req.data = user;
                next()
            }
        })
    
}


module.exports = {isAuthenticated}