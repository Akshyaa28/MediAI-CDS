import express from "express";
import { analyzeCase, getCaseById } from "../controllers/caseController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Case from "../models/Case.js"; // ✅ ADD THIS LINE

const router = express.Router();

router.post("/analyze", authMiddleware, analyzeCase);
router.get("/:id", authMiddleware, getCaseById);

/* 🔥🔥🔥 ADD THIS BELOW 🔥🔥🔥 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cases = await Case.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 });

    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cases" });
  }
});

export default router;
