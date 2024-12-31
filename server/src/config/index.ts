function ensureEnv(variable: string | undefined, name: string): string {
  if (!variable) {
    throw new Error(`Environment variable ${name} is missing or undefined`);
  }
  return variable;
}

export const env = {
  MONGO_DB_URL: ensureEnv(process.env.MONGO_DB_URL, "MONGO_DB_URL"),
  JWT_KEY: ensureEnv(process.env.JWT_KEY, "JWT_KEY"),
  PORT: process.env.PORT || "8080",
  FRONT_END_URL: ensureEnv(process.env.FRONT_END_URL, "FRONT_END_URL"),
};
