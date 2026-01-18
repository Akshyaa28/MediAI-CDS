export const symptomAgent = async (data) => {
  const symptoms = (data.symptoms || []).map(s => s.toLowerCase());

  return {
    symptomInsights: {
      chestPain: symptoms.includes("chest pain"),
      breathlessness: symptoms.includes("breathlessness"),
      palpitations: symptoms.includes("palpitations"),
      syncope: symptoms.includes("syncope"),
      dizziness: symptoms.includes("dizziness"),
      sweating: symptoms.includes("sweating"),
      fatigue: symptoms.includes("fatigue"),
      legSwelling: symptoms.includes("leg swelling")
    }
  };
};
