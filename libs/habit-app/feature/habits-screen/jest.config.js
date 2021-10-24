module.exports = {
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  displayName: 'habit-app-feature-habits-screen',
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  preset: 'react-native',
  resolver: '@nrwl/jest/plugins/resolver',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community||@react-native|@react-navigation)',
  ],
};
