const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest', // Only use babel-jest for TS/TSX
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",      // Include all TS and TSX files
    "srdc/components/**/*.{ts,tsx}", // Include components
    "!src/**/*.d.ts",         // Exclude type definitions
    "!src/components/types/*.ts",       // Optionally exclude types files
    // "!src/components/mentions/*.{ts,tsx}", // Exclude mentions component   
  ],
};