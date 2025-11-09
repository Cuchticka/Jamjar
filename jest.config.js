const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest', // Only use babel-jest for TS/TSX
  },
  transformIgnorePatterns: [
    "/node_modules/(?!next-intl|@next-intl|react-intl|intl-messageformat)",
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/components/posts/PostCard.tsx",
    "src/components/posts/PostCard.test.tsx",
    "src/components/mentions/Mentions.tsx",
    "src/components/mentions/Mentions.test.tsx",
    "src/components/mentions/Mentions.plugin.test.tsx",
    "src/components/mentions/UserMentions.test.tsx",
    "src/components/mentions/UserMentions.tsx"
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
};