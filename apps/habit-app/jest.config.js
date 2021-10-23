module.exports = {
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  displayName: 'habit-app',
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  moduleNameMapper: {
    '^.+.(css|style|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  preset: 'react-native',
  resolver: '@nrwl/jest/plugins/resolver',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
