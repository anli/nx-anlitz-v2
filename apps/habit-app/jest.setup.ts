import '@testing-library/jest-native/extend-expect';

// ReferenceError: You are trying to `import` a file after the
// Jest environment has been torn down.
// ../../node_modules/@react-navigation/native
// /lib/commonjs/useLinking.native.tsx:
jest.mock('@react-navigation/native/lib/commonjs/useLinking.native', () => ({
  default: () => ({ getInitialState: { then: jest.fn() } }),
  __esModule: true,
}));
