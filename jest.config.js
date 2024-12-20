module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'jest-environment-node',
    testTimeout: 30000,
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        './src/**/*',
        '!src/index.tsx',
        '!src/types.tsx',
    ],
    coverageReporters: ['text', 'lcov'],
    coverageDirectory: 'coverage'
}
