const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const crypto = require("crypto");


// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password, country } = req.body;
  try {
    const user = new User({ name, email, password, country });
    await user.save();
    // Issue JWT after signup
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({ token });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.status(400).json({ error: "Email ID already exists." });
    }
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Hash new password
    const bcrypt = require("bcryptjs");
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;