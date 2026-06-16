import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/weekly-report", auth, async (req, res) => {
  res.json({
    content:
      "Great work this week! You are building consistency. Keep focusing on small daily actions.",
  });
});

router.post("/suggest-habits", auth, async (req, res) => {
  res.json({
    suggestions: [
      "Drink 2L water daily",
      "Read 10 pages",
      "Walk for 20 minutes",
      "Practice coding for 1 hour",
      "Sleep before 11 PM",
    ],
  });
});

router.post("/recovery-plan", auth, async (req, res) => {
  res.json({
    content:
      "Start again with one small habit today. Do not try to fix everything at once.",
  });
});

router.post("/chat", auth, async (req, res) => {
  const { question } = req.body;

  res.json({
    content: `You asked: "${question}". Stay consistent and focus on progress, not perfection.`,
  });
});

router.get("/morning", auth, async (req, res) => {
  res.json({
    content:
      "Good morning! Today is a fresh chance to complete your habits and improve yourself.",
  });
});

export default router;