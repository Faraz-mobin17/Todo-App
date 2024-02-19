import fs from "fs";
import dotenv from "dotenv";

import { dotenvPath } from "../path";

if (fs.existsSync(dotenvPath)) {
  dotenv.config(dotenvPath);
} else {
  console.error("Error dot env file doesn't exits");
  process.exit();
}

const envVars = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017",
  LIMIT: process.env.LIMIT || "16kb",
  CROSS_ORIGIN: "*",
};

export { envVars };
