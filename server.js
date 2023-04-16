const express = require("express");
const dotenv = require("dotenv");
const database = require("./connection/dbConfig");
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser');
const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");
const { isAuthenticated } = require("./middlewares/auth");
const { errorMiddleware } = require("./middlewares/error");
const app = express();


//dotenv
dotenv.config({ path:"./connection/config.env"})


//connecting to database
database.connect();


// using middlewares
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({limit:"30mb", extended:"true"}) )
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials:true // if not used then no credentials will reach frontend like in header or cookies
}))

//authentication
app.use(["/user/:id", "/task"], isAuthenticated)


//using routes
app.use("/", userRouter)
app.use("/task", taskRouter)

//Error middleware
app.use(errorMiddleware)




// listening to the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`server is listening to the port ${PORT} in ${process.env.NODE_ENV} mode`)
})  