import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// This needs to be placed somewhere before attempting to access any environment variables
dotenv.config();

export interface UserCredentials {
  username: string;
  password: string;
  sessionFile: string;
  cookieName?: string;
}

interface Urls {
  testUrl: string;
}

export interface Config {
  urls: Urls;
}

export const config: Config = {
  urls: {
    testUrl: process.env.TEST_URL || "https://fact.aat.platform.hmcts.net/",
  },
};

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Error: ${name} environment variable is not set`);
  }
  return value;
}
