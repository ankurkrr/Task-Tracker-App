const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
});

module.exports = mongoose.model("Task", TaskSchema);