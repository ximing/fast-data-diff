module.exports = {
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./__tests__/setup.js'],
    testRegex: '\\.test\\.tsx?$',
    collectCoverage: false,
    testEnvironment: 'node',
    coverageReporters: ['lcovonly', 'text'],
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: ['node_modules', '.mock.ts', '<rootDir>/src/context.ts']
    // moduleNameMapper: {
    //   'react-platform': 'react-dom',
    // },
};
