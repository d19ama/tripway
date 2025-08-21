module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.(test|spec)\\.ts$',
  transform: {
    '.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',

  coverageReporters: ['text', 'lcov'],
  reporters: ['default'],

  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },
};
