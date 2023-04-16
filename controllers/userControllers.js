const validator = require("validator")
const userSchema = require("../models/userSchema")
const bcrypt = require("bcrypt")
const { sendCookie } = require("../utils/features")
const { default: mongoose } = require("mongoose")
const { ErrorHandler } = require("../middlewares/error")


const checkEmail =(mail) => {
    return validator.isEmail(mail);
}

const userLogin = async (req, res, next) =>{
    const {email, password} = req.body;

    if(!email || !password) return next ( new ErrorHandler ("Please fill out all fields", 400) )

    if(password.length<8) return next ( new ErrorHandler ("Password must be 8 characters long", 400) )

    if(!checkEmail(email)) return next ( new ErrorHandler ("Invalid ID", 400) )


    // try{

        const user = await userSchema.findOne({email}).select("+password")
    
        if(!user) return next ( new ErrorHandler ("Invalid credentials", 400) )

        const isMatch = await bcrypt.compare(password, user.password) 

        if(!isMatch) return next ( new ErrorHandler ("Invalid Password", 400) )


        sendCookie(user, res,`welcome back ${user.name}`, 200, user.email)

//     } catch(error){
//         next(error)
// }
}


const registerUser = async (req, res, next) =>{
    const {name, email, password} = req.body;

    if(!name || !email || !password) return next ( new ErrorHandler ("Please fill out all fields", 400) )

    if(!checkEmail(email)) return next ( new ErrorHandler ("Invalid ID", 400) )

    if(password.length<8) return next ( new ErrorHandler ("Password must be 8 characters long", 400) )

    try{

        const match = await userSchema.findOne({email})

        if(match) return next ( new ErrorHandler ("User already exists", 400) )

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userSchema.create({
            name,
            email,
            password:hashedPassword,
        })

        sendCookie(user, res, "Registered successfully", 201, user.email)

    } catch(error){
        next(error)
}

}


const userLogout = (req, res) =>{
    // res.clearCookie("Token")
    // res.status(200).send("logged out successfully")
    res
    .status(200)
    .clearCookie("token",{
        sameSite: process.env.NODE_ENV==="Development" ? "lax" : "None",
        secure:process.env.NODE_ENV==="Development" ? false : true 
    })
    .send({
        success:true,
        user:req.user
    })
}

const getUserProfile = async (req, res, next) =>{
    const {_id} = req.data;
    if(!mongoose.Types.ObjectId.isValid(_id)) return next ( new ErrorHandler ("Invalid ID", 400) )

    try{
        const user = await userSchema.findById(_id)

        if(!user) return next ( new ErrorHandler ("Something went wrong, Please login again", 400) )

        res.status(200).send({
            success:true,
            user
        })

    } catch(error){
        next(error)
}
}




module.exports = {
    userLogin,
    userLogout,
    registerUser,
    getUserProfile
}