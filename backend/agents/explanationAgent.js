export const explanationAgent = async (caseData) => {
  let explanation = "";

  if (caseData.risk?.level === "High") {
    explanation = `
This patient is classified as HIGH RISK based on:
• Advanced age and multiple cardiovascular risk factors
• High-risk symptoms such as chest pain, syncope, or breathlessness
• Abnormal cardiac biomarkers and investigations

The overall clinical picture is concerning for acute coronary syndrome
or other life-threatening cardiovascular pathology.

Immediate cardiology consultation, continuous monitoring, and
invasive evaluation are strongly recommended.
`;
  } else if (caseData.risk?.level === "Moderate") {
    explanation = `
This patient demonstrates MODERATE cardiovascular risk due to:
• Presence of concerning symptoms
• Intermediate laboratory abnormalities
• Existing comorbid conditions

Further diagnostic evaluation and close clinical observation are advised.
`;
  } else {
    explanation = `
This patient is currently classified as LOW RISK based on:
• Stable vital signs
• Absence of high-risk symptoms
• No critical laboratory abnormalities

Outpatient follow-up and conservative management may be appropriate.
`;
  }

  return { explanation };
};
