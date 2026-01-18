export const orchestrator = async (caseData, agents) => {
  let context = { ...caseData };

  for (const agent of agents) {
    const result = await agent(context);
    context = { ...context, ...result };
  }

  return context;
};
