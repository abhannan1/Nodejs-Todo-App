const express = require("express")
const {userLogin, registerUser, userLogout, getUserProfile,getAllUsers} = require("../controllers/userControllers")


const router = express.Router()

router.post("/register", registerUser)
router.post("/login", userLogin)
router.get("/logout", userLogout)
router.get("/user/:id", getUserProfile)
// router.post("/allUsers", getAllUsers)


module.exports = router