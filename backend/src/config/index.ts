// src/config/index.ts
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
};
