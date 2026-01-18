import { calculateRisk } from "../utils/riskCalculator.js";

export const riskAgent = async (caseData) => {
  const { score, level } = calculateRisk(caseData);

  let message = "Low cardiovascular risk at present.";

  if (level === "High") {
    message =
      "High probability of acute cardiovascular or thromboembolic event. Immediate intervention required.";
  } else if (level === "Moderate") {
    message =
      "Moderate cardiovascular risk detected. Close monitoring and further evaluation advised.";
  }

  return {
    risk: {
      score,
      level,
      message
    }
  };
};
