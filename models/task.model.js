const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
// Define the Task schema
const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  id: {
    type: ObjectId,
    ref: "User"
  },
  description: String,
  priority: {
    type: String,
    enum: {
      values:['Low', 'Medium', 'High'],
      message: "value can't be {VALUE}, must be Low/Medium/High"
    },
    default: 'Medium'
  },
  status: {
    type: String,
    enum: {
      values:['Pending', 'Completed'],
      message: "value can't be {VALUE}, must be Pending/Completed"
    },
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Task model message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag"
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
