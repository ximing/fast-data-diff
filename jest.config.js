const { jsWithTs: tsjPreset } = require('ts-jest/presets')
const path = require('path')

module.exports = {
    testEnvironment: 'node',
    transform: {
        ...tsjPreset.transform
    },
    testURL: 'http://localhost/',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node'
    ],
    globals: {
        'ts-jest': {
            diagnostics: false,
            tsConfig: {
                jsx: 'react',
                allowJs: true,
                target: 'ES6'
            }
        }
    },
    testPathIgnorePatterns: [
        'node_modules',
        'utils'
    ],
    moduleNameMapper: {
    },
    setupFiles: ['<rootDir>/__tests__/setup.js'],
    testMatch: ['**/__tests__/?(*.)+(spec|test).[jt]s?(x)']
}
