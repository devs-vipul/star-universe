module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
  },
};
