const rnPreset = require('react-native/jest-preset');

module.exports = {
  ...rnPreset,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  resolver: '@nrwl/jest/plugins/resolver',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|@react-native|@react-navigation)',
  ],
};
