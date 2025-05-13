const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.use(authMiddleware);

// Create Task
router.post("/", async (req, res) => {
  const { title, description, project, status } = req.body;
  try {
    const task = new Task({
      title,
      description,
      project,
      status: status || "Pending",
      createdAt: new Date(),
      completedAt: status === "Completed" ? new Date() : null,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks for a project
router.get("/", async (req, res) => {
  const { project } = req.query;
  try {
    const tasks = await Task.find({ project });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a task
router.put("/:id", async (req, res) => {
  try {
    const update = { ...req.body };
    if (update.status === "Completed") {
      update.completedAt = new Date();
    }
    const task = await Task.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;