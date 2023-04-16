const express = require("express")
const {addTask, getTask, getAllTasks, updateTask, deleteTask} = require("../controllers/taskControllers")
const {routeError}  = require("../utils/features")

const router = express.Router()

router.post("/add", addTask)
router.get("/getAllTasks", getAllTasks)
router.route("/:id").get(getTask).put(updateTask).delete(deleteTask)
router.use(routeError);

module.exports = router