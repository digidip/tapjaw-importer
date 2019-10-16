module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: [
    "js",
    "ts",
  ],
  roots: [
    "./src"
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverage: true,
  coverageReporters: ['text', 'html', 'lcov'],
  coveragePathIgnorePatterns: [
      "/node_modules/",
      "/lib/"
  ]
};
