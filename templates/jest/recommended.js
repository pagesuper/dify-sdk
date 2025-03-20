module.exports = {
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // '^vue$': 'vue/dist/vue.common.js',
  },
  // moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    // '.*\\.(vue)$': 'vue-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    // '<rootDir>/components/**/*.vue',
    // '<rootDir>/pages/**/*.vue',
  ],
};
