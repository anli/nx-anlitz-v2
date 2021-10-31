module.exports = {
  preset: '../../../../jest.preset',
  displayName: 'habit-app-feature-habits-screen',
  setupFilesAfterEnv: ['<rootDir>/../../../../jest.setup.ts'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
};
