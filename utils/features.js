const JWT = require("jsonwebtoken")
const { ErrorHandler } = require("../middlewares/error")




const sendCookie = (user,res, message, statusCode=200, email) => {

    const token = JWT.sign({_id:user._id, email}, process.env.SECRET_KEY)

    return res.status(statusCode).cookie("token", token,{
       httpOnly:true,
       // expire:new Date(Date.now() + 60 * 1000), token for 1 mint
       maxAge:15*60*1000, // token for 15 mints
       sameSite: process.env.NODE_ENV==="Development" ? "lax" : "None",
       secure:process.env.NODE_ENV==="Development" ? false : true 
    }).send({
       success:true,
       message:message
    })
}


const routeError = (req, res, next) => {
   return next (new ErrorHandler("Route Not Found", 404))
 }

module.exports = {sendCookie, routeError}
