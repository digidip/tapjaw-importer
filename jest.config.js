module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: [
        "js",
        "ts",
    ],
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
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
