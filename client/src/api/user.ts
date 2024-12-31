import { env } from "@/config/env";
import { RegisterForm } from "@/app/routes/auth/register";

const BASE_URL = env.API_URL;
const USER_BASE_URL = `${BASE_URL}/api/user`;

export const register = async (data: RegisterForm) => {
  const response = await fetch(`${USER_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};
