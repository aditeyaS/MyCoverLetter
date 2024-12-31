import Issues from "@/models/issues";

export const github_owner = "aditeyaS";
export const github_repo = "MyCoverLetter";

const GITHUB_BASE_URL = `https://api.github.com/repos/${github_owner}/${github_repo}/issues`;

export const getIssues = async (): Promise<Issues[]> => {
  const response = await fetch(`${GITHUB_BASE_URL}?per_page=5`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};
