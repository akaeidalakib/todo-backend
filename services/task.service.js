const Task = require("../models/task.model");


    exports.createTask = async (data) => {
        console.log("clg from seervice line 5",data);
        const result = await Task.create(data);
        return result;
    };
    exports.getAllTask = async (id,skip, limit) => {
      const result = await Task.find({id:id}).skip(skip).limit(limit);
      const totalCount = await Task.countDocuments({}); 
      return {result, totalCount};
    };

exports.getTaskById= async(id)=>{
    const results = await Task.findOne({_id:id})
    return results
    }
exports.updateTaskById = async (id, data) => {
        const result = await Task.updateOne({ _id: id }, data, {
          runValidators: true
        });
        return result;
      }

exports.deleteTaskById = async (id) => {
        const result = await Task.deleteOne({ _id: id });
        return result;
      };