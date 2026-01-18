export const calculateRisk = (data) => {
  let score = 0;

  const symptoms = (data.symptoms || []).map(s => s.toLowerCase());
  const labs = (data.labs || []).map(l => l.toLowerCase());
  const history = (data.history || []).map(h => h.toLowerCase());

  // ---------------- AGE ----------------
  if (data.age >= 70) score += 25;
  else if (data.age >= 60) score += 20;
  else if (data.age >= 40) score += 10;

  // ---------------- SYMPTOMS (10+) ----------------
  if (symptoms.includes("chest pain")) score += 25;
  if (symptoms.includes("breathlessness")) score += 15;
  if (symptoms.includes("palpitations")) score += 10;
  if (symptoms.includes("dizziness")) score += 8;
  if (symptoms.includes("syncope")) score += 15;
  if (symptoms.includes("fatigue")) score += 5;
  if (symptoms.includes("nausea")) score += 5;
  if (symptoms.includes("sweating")) score += 10;
  if (symptoms.includes("leg swelling")) score += 10;
  if (symptoms.includes("cough with blood")) score += 20;

  // ---------------- LABS (10+) ----------------
  if (labs.includes("troponin")) score += 30;
  if (labs.includes("ecg abnormal")) score += 25;
  if (labs.includes("elevated d-dimer")) score += 20;
  if (labs.includes("high bp")) score += 10;
  if (labs.includes("low oxygen saturation")) score += 20;
  if (labs.includes("raised creatinine")) score += 10;
  if (labs.includes("high cholesterol")) score += 8;
  if (labs.includes("elevated blood sugar")) score += 10;
  if (labs.includes("low hemoglobin")) score += 10;
  if (labs.includes("abnormal chest xray")) score += 15;

  // ---------------- HISTORY (10+) ----------------
  if (history.includes("diabetes")) score += 10;
  if (history.includes("hypertension")) score += 10;
  if (history.includes("smoking")) score += 15;
  if (history.includes("coronary artery disease")) score += 20;
  if (history.includes("previous heart attack")) score += 25;
  if (history.includes("chronic kidney disease")) score += 15;
  if (history.includes("copd")) score += 15;
  if (history.includes("stroke")) score += 20;
  if (history.includes("obesity")) score += 10;
  if (history.includes("family history of heart disease")) score += 10;

  // ---------------- LIMIT SCORE ----------------
  if (score > 100) score = 100;

  // ---------------- RISK LEVEL ----------------
  let level = "Low";
  if (score >= 70) level = "High";
  else if (score >= 40) level = "Moderate";

  return { score, level };
};
