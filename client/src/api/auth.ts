import { LoginForm } from "@/app/routes/auth/login";
import { env } from "@/config/env";
import User from "@/models/user";

const BASE_URL = env.API_URL;
const AUTH_BASE_URL = `${BASE_URL}/api/auth`;

export const login = async (data: LoginForm): Promise<User> => {
  const response = await fetch(`${AUTH_BASE_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const validateUser = async (): Promise<User> => {
  const response = await fetch(`${AUTH_BASE_URL}/verify`, {
    method: "GET",
    credentials: "include",
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error("Error during loogout.");
  }
  return responseBody;
};

export const logout = async () => {
  const response = await fetch(`${AUTH_BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error during loogout.");
  }
};
