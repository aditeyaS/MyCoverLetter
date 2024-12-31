export const getVariables = (coverLetter: string): string[] => {
  const vars: string[] = [];
  const regex = /\[\[(.*?)\]\]/g;
  const matches = coverLetter.match(regex);
  if (matches) {
    for (const match of matches) {
      vars.push(match.slice(2, -2));
    }
  }
  return vars;
};
