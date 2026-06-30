import { z } from "zod";
import dotenv from "dotenv";

// Load the .env file into process.env
dotenv.config();

const envSchema = z.object({
  URI: z.string().min(1),
  PORT: z.string().default("3000"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  JWT_SECRET: z.string().min(1),
  EMAIL_HOST: z.string().min(1),
  EMAIL_PORT: z.string().default("465"),
  EMAIL_USER: z.string().min(1),
  EMAIL_PASS: z.string().min(1),
  REDIS_HOST: z.string().min(1),
  REDIS_PORT: z.string().default("6379")
});

// This will throw an error if process.env.variable is missing
export const env = envSchema.parse(process.env);