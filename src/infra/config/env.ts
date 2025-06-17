import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(10),
  BCRYPT_SALT_ROUNDS: z.coerce.number().default(8),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Environment variables error:", _env.error.format());
  process.exit(1);
}

export const env = _env.data;
