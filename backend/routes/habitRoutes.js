import express from "express";
import Habit from "../models/Habit.js";
import Log from "../models/Log.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET all habits
router.get("/", auth, async (req, res) => {
  try {
    const includeArchived = req.query.includeArchived === "true";

    const habits = await Habit.find({
      userId: req.user._id,
      ...(includeArchived ? {} : { isArchived: false }),
    }).sort({ order: 1, createdAt: 1 });

    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE habit
router.post("/", auth, async (req, res) => {
  try {
    const count = await Habit.countDocuments({ userId: req.user._id });

    const habit = await Habit.create({
      userId: req.user._id,
      name: req.body.name,
      description: req.body.description || "",
      category: req.body.category || "Other",
      frequency: req.body.frequency || "daily",
      targetDays: req.body.targetDays || 7,
      color: req.body.color || "#6366f1",
      icon: req.body.icon || "🎯",
      order: count,
    });

    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE habit
router.put("/:id", auth, async (req, res) => {
  try {
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ARCHIVE / UNARCHIVE habit
router.put("/:id/archive", auth, async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    habit.isArchived = !habit.isArchived;
    await habit.save();

    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE habit
router.delete("/:id", auth, async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    await Log.deleteMany({
      habitId: req.params.id,
      userId: req.user._id,
    });

    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;