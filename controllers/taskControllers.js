const taskSchema = require("../models/taskSchema")
const{ ErrorHandler} = require("../middlewares/error");
const { default: mongoose } = require("mongoose");
const { success } = require("../utils/success");

const addTask = async (req, res, next) =>{

const {tittle, description} = req.body;

if(!tittle || !description) return next ( new ErrorHandler ("Please fill out all fields", 400) )

try {
    const task = await taskSchema.create({
        tittle,
        description,
        user:req.data
    })
    
    success(true, "task added successfully", 201,req, res)
    
} catch(error){
    next(error)
}
}


const getTask = async(req, res, next )=>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) return next ( new ErrorHandler ("Invalid ID", 400) )

    try {
        
    const task = await taskSchema.findById(id)
    if(!task) return next ( new ErrorHandler ("No such task found", 400) )


    success(true,null, null, 200,req, res)


    } catch (error) {
        next(error)    
    }

}



const getAllTasks = async(req, res, next )=>{
    const userId = req.data._id;

    if(!mongoose.Types.ObjectId.isValid(userId)) return next ( new ErrorHandler ("Invalid ID", 400) )

    try {
        const tasks = await taskSchema.find({user:userId})

        if(!tasks) return next ( new ErrorHandler ("No tasks found", 400) )
    
        res.status(200).send({
            success:true,
            tasks
        })
    } catch (error) {
        next(error)
    }

}

const updateTask = async(req, res, next )=>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) return next ( new ErrorHandler ("Invalid ID", 400) )

    try {
        const task = await taskSchema.findById(id)
        if(!task) return next ( new ErrorHandler ("No such task exists", 400) )
    
        task.isCompleted = !task.isCompleted
        await task.save()
    
        res.status(200).send({
            success:true,
            task
        })
    
    } catch (error) {
        next(error)        
    }
}

const deleteTask = async(req, res, next )=>{
    const _id = req.params.id;

    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return next ( new ErrorHandler ("Invalid ID", 400) )

        const task = await taskSchema.findByIdAndDelete({_id})
        if(!task) return next ( new ErrorHandler ("No such task exists", 400) )
    
    
        res.status(200).send({
            success:true,
            task
        })
    
    } catch (error) {
        next(error)        
    }
}


module.exports = {addTask , getTask, getAllTasks, updateTask, deleteTask}