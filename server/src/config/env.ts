import * as z from "zod";

const createEnv = () => {
  const EnvSchema = z.object({
    MONGO_DB_URL: z.string(),
    JWT_KEY: z.string(),
    PORT: z.string().optional().default("8080"),
    FRONT_END_URL: z.string().url(),
  });

  const envVars = Object.entries(process.env).reduce<Record<string, string>>(
    (acc, curr) => {
      const [key, value] = curr;
      if (key.startsWith("MCL_") && value !== undefined) {
        acc[key.replace("MCL_", "")] = value;
      }
      return acc;
    },
    {}
  );
  const parsedEnv = EnvSchema.safeParse(envVars);
  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided. The following variables are missing or invalid:
      ${Object.entries(parsedEnv.error.flatten().fieldErrors)
        .map(([k, v]) => `- ${k}: ${v}`)
        .join("\n")}`
    );
  }
  return parsedEnv.data;
};

export const env = createEnv();
