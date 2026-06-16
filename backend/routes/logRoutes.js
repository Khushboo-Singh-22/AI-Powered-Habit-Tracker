import express from "express";
import Log from "../models/Log.js";
import Habit from "../models/Habit.js";
import auth from "../middleware/auth.js";

const router = express.Router();

const todayKey = () => new Date().toISOString().split("T")[0];

const formatDate = (date) => date.toISOString().split("T")[0];

const subDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() - days);
  return d;
};

const calculateStreak = (dates) => {
  if (!dates.length) return { current: 0, longest: 0 };

  const set = new Set(dates);
  let current = 0;
  let cursor = new Date();

  while (set.has(formatDate(cursor))) {
    current++;
    cursor = subDays(cursor, 1);
  }

  let longest = 0;
  let run = 0;
  let prev = null;

  const sorted = [...dates].sort();

  for (const date of sorted) {
    if (!prev) {
      run = 1;
    } else {
      const diff =
        (new Date(date) - new Date(prev)) / (1000 * 60 * 60 * 24);
      run = diff === 1 ? run + 1 : 1;
    }

    longest = Math.max(longest, run);
    prev = date;
  }

  return { current, longest };
};

// Mark habit complete
router.post("/", auth, async (req, res) => {
  try {
    const { habitId, date } = req.body;
    const completedDate = date || todayKey();

    const habit = await Habit.findOne({
      _id: habitId,
      userId: req.user._id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    let log = await Log.findOne({
      userId: req.user._id,
      habitId,
      completedDate,
    });

    if (!log) {
      log = await Log.create({
        userId: req.user._id,
        habitId,
        completedDate,
      });
    }

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Unmark habit complete
router.delete("/", auth, async (req, res) => {
  try {
    const { habitId, date } = req.body;
    const completedDate = date || todayKey();

    await Log.findOneAndDelete({
      userId: req.user._id,
      habitId,
      completedDate,
    });

    res.json({ message: "Unmarked" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Today logs
router.get("/today", auth, async (req, res) => {
  try {
    const today = todayKey();

    const logs = await Log.find({
      userId: req.user._id,
      completedDate: today,
    });

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Logs by range
router.get("/range", auth, async (req, res) => {
  try {
    const { start, end } = req.query;

    const logs = await Log.find({
      userId: req.user._id,
      completedDate: {
        $gte: start,
        $lte: end,
      },
    });

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Heatmap 90 days
router.get("/heatmap", auth, async (req, res) => {
  try {
    const days = [];
    const end = new Date();

    for (let i = 89; i >= 0; i--) {
      const d = subDays(end, i);
      const key = formatDate(d);

      const count = await Log.countDocuments({
        userId: req.user._id,
        completedDate: key,
      });

      days.push({
        date: key,
        count,
      });
    }

    res.json(days);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Overall stats
router.get("/stats", auth, async (req, res) => {
  try {
    const days = [];

    for (let i = 29; i >= 0; i--) {
      days.push(formatDate(subDays(new Date(), i)));
    }

    const habits = await Habit.find({
      userId: req.user._id,
      isArchived: false,
    });

    const perHabit = [];

    for (const habit of habits) {
      const logs = await Log.find({
        userId: req.user._id,
        habitId: habit._id,
        completedDate: {
          $gte: days[0],
          $lte: days[days.length - 1],
        },
      });

      const dates = logs.map((log) => log.completedDate);
      const streak = calculateStreak(dates);

      perHabit.push({
        habitId: habit._id,
        name: habit.name,
        icon: habit.icon,
        color: habit.color,
        category: habit.category,
        completions30d: logs.length,
        currentStreak: streak.current,
        longestStreak: streak.longest,
      });
    }

    res.json({
      perHabit,
      days,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Single habit stats
router.get("/stats/:habitId", auth, async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.habitId,
      userId: req.user._id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const logs = await Log.find({
      userId: req.user._id,
      habitId: habit._id,
    }).sort({ completedDate: -1 });

    const dates = logs.map((log) => log.completedDate);
    const streak = calculateStreak(dates);

    res.json({
      habit,
      totalCompletions: logs.length,
      currentStreak: streak.current,
      longestStreak: streak.longest,
      completionRate: 75,
      monthly: {},
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;