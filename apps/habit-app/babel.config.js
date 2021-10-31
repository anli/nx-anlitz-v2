module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: 'react-native-dotenv',
      },
    ],
  ],
  env: {
    test: {
      plugins: [['module:react-native-dotenv']],
    },
  },
};
