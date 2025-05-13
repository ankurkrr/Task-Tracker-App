const express = require("express");
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware"); // Import middleware
const router = express.Router();

// Protect all routes with authMiddleware
router.use(authMiddleware);

// Create Project
router.post("/", async (req, res) => {
  try {
    // Count projects for this user
    const projectCount = await Project.countDocuments({ user: req.user.id });
    if (projectCount >= 4) {
      return res.status(400).json({ error: "You can only create up to 4 projects." });
    }
    const project = new Project({ ...req.body, user: req.user.id });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all projects for the logged-in user
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a project
router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a project
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;