const { getAllTask, createTask, getTaskById, deleteTaskById, updateTaskById } = require("../services/task.service");
const ErrorHandler = require("../utils/ErrorHandler");

exports.PostTask= async(req, res, next)=>{
    try {
        const id = req.user._id
        const taskData = {...req.body,id}
        console.log("clg from controller line 7",taskData);
        
        const result = await createTask(taskData)
        
        res.status(200).json({
            status: 'success',
            message: 'create task successfully',
            data: result
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}
exports.getTasks = async (req, res, next) => {
    try {
        console.log("line 20",req.user);
      const page = Number(req.query.page) || 1;  
      const limit = 5; 
      const skip = (page - 1) * limit;
  
      const { result, totalCount } = await getAllTask(req.user._id,skip, limit);
  
      res.status(200).json({
        status: 'success',
        message: 'Tasks retrieved successfully',
        count:totalCount,
        data: result
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  };
exports.getTaskByID =async (req, res,next)=>{
    try {
        const{ id } = req.params;
        const result = await getTaskById(id);
        res.status(200).json({
            status: 'success',
            message: ' single task get successfully',
            data: result
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
}
exports.UpdateTaskByID =async (req, res,next)=>{
    try {
        const{ id } = req.params;
        const data = req.body
        const result = await updateTaskById(id, data);
        res.status(200).json({
            status: 'success',
            message: ' single task delete successfully',
            data: result
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
}

exports.DeleteTaskByID =async (req, res,next)=>{
    try {
        const{ id } = req.params;
        const result = await deleteTaskById(id);
        res.status(200).json({
            status: 'success',
            message: ' single task delete successfully',
            data: result
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
}