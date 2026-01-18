export const diagnosisAgent = async (data) => {
  const diagnosis = [];
  const symptoms = (data.symptoms || []).map(s => s.toLowerCase());
  const labs = (data.labs || []).map(l => l.toLowerCase());
  const history = (data.history || []).map(h => h.toLowerCase());

  if (data.risk?.level === "High") {
    diagnosis.push({
      name: "Acute Coronary Syndrome (NSTEMI)",
      confidence: 0.85
    });
  }

  if (symptoms.includes("chest pain")) {
    diagnosis.push({
      name: "Unstable Angina",
      confidence: 0.65
    });
  }

  if (symptoms.includes("breathlessness") && labs.includes("elevated d-dimer")) {
    diagnosis.push({
      name: "Pulmonary Embolism",
      confidence: 0.6
    });
  }

  if (symptoms.includes("palpitations")) {
    diagnosis.push({
      name: "Cardiac Arrhythmia",
      confidence: 0.5
    });
  }

  if (symptoms.includes("syncope")) {
    diagnosis.push({
      name: "Cardiogenic Syncope",
      confidence: 0.55
    });
  }

  if (labs.includes("low oxygen saturation")) {
    diagnosis.push({
      name: "Acute Hypoxic Respiratory Failure",
      confidence: 0.6
    });
  }

  if (history.includes("stroke")) {
    diagnosis.push({
      name: "Recurrent Cerebrovascular Event",
      confidence: 0.4
    });
  }

  return { diagnosis };
};
