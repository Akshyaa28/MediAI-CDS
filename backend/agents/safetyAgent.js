export const safetyAgent = async (caseData) => {
  const safetyAlerts = [];

  if (caseData.creatinine > 1.5) {
    safetyAlerts.push("Avoid contrast agents due to renal impairment");
  }

  if (caseData.onMetformin && caseData.contrastPlanned) {
    safetyAlerts.push("Hold metformin before contrast imaging");
  }

  if (caseData.bp < 90) {
    safetyAlerts.push("Hypotension detected – avoid nitrates and beta blockers");
  }

  if (caseData.oxygenSaturation < 90) {
    safetyAlerts.push("Severe hypoxia – initiate supplemental oxygen");
  }

  if (!caseData.allergies || caseData.allergies.length === 0) {
    safetyAlerts.push("No documented drug allergies");
  } else {
    safetyAlerts.push(`Allergy alert: ${caseData.allergies.join(", ")}`);
  }

  return { safetyAlerts };
};
