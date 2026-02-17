/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
    "/src/components/ui/",
    "/src/lib/",
    "/src/data/",
  ],
  coverageProvider: "v8",
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
};

export default createJestConfig(config);
