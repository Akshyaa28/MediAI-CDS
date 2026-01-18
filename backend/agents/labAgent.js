export const labAgent = async (data) => {
  const labs = (data.labs || []).map(l => l.toLowerCase());

  return {
    labFlags: {
      troponinHigh: labs.includes("troponin"),
      ecgAbnormal: labs.includes("ecg abnormal"),
      dDimerHigh: labs.includes("elevated d-dimer"),
      creatinineHigh: labs.includes("raised creatinine"),
      hypoxia: labs.includes("low oxygen saturation"),
      anemia: labs.includes("low hemoglobin"),
      hyperglycemia: labs.includes("elevated blood sugar"),
      dyslipidemia: labs.includes("high cholesterol"),
      chestXrayAbnormal: labs.includes("abnormal chest xray")
    }
  };
};
