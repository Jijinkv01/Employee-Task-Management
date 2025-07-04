const mongoose = require("mongoose")

const taskSchema  = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Finished'],
    default: 'Pending'
  },
  commitMessage: {
    type: String,
    default: ""
  },
  isCommited: {
    type: Boolean,
    default: false
  },
  approvalStatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
}, {timestamps: true});

const Task = mongoose.model("task", taskSchema);

module.exports = Task