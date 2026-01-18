import Case from "../models/Case.js";
import { orchestrator } from "../agents/orchestrator.js";

import { symptomAgent } from "../agents/symptomAgent.js";
import { labAgent } from "../agents/labAgent.js";
import { diagnosisAgent } from "../agents/diagnosisAgent.js";
import { riskAgent } from "../agents/riskAgent.js";
import { guidelineAgent } from "../agents/guidelineAgent.js";
import { safetyAgent } from "../agents/safetyAgent.js";
import { explanationAgent } from "../agents/explanationAgent.js";

/* ================= ANALYZE CASE ================= */
export const analyzeCase = async (req, res) => {
  try {
    const caseData = req.body;

    const analysis = await orchestrator(caseData, [
      symptomAgent,
      labAgent,
      diagnosisAgent,
      riskAgent,
      guidelineAgent,
      safetyAgent,
      explanationAgent
    ]);

    const savedCase = await Case.create({
      ...caseData,
      analysis,
      createdBy: req.user.id
    });

    res.json({
      success: true,
      caseId: savedCase._id,
      analysis
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET CASE BY ID ================= */
export const getCaseById = async (req, res) => {
  try {
    const foundCase = await Case.findById(req.params.id);
    if (!foundCase) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.json(foundCase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
