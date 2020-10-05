module.exports = {
  moduleFileExtensions: [
    'js',
    'ts',
  ],
  moduleDirectories: [
    'node_modules',
    'src',
  ],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: 'src/.*\\.spec\\.(tsx?)$',
  verbose: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*',
  ],
  preset: 'ts-jest',
  testMatch: null,
}