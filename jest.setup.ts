import '@testing-library/jest-native/extend-expect';

// ReferenceError: You are trying to `import` a file after the
// Jest environment has been torn down.
// ../../node_modules/@react-navigation/native
// /lib/commonjs/useLinking.native.tsx:
jest.mock('@react-navigation/native/lib/commonjs/useLinking.native', () => ({
  default: () => ({ getInitialState: { then: jest.fn() } }),
  __esModule: true,
}));

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// https://github.com/facebook/react-native/issues/29849
jest.mock('react-native/Libraries/LogBox/LogBox');

jest.mock('react-hook-form', () => {
  (global as any).window = {};
  return jest.requireActual('react-hook-form');
});
