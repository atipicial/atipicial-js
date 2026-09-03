module.exports = {
  testRunner: "jest-circus/runner",
  testEnvironment: "node",
  globals: {
    __TARGETNET__: "LocalNet",
  },
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig-test.json",
        diagnostics: false,
      },
    ],
  },
  coveragePathIgnorePatterns: [
    "<rootDir>/packages/.*/lib/",
    "<rootDir>/packages/.*/dist/",
  ],
  testRegex:
    "((/packages/.*/)?__(tests|integration)__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@atipicial/atipicial-core$": "<rootDir>/packages/atipicial-core/src/index.ts",
    "^(\\.{1,2}/.+)\\.js$": "$1",
  },
};
