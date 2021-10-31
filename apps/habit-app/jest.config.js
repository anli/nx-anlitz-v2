module.exports = {
  preset: '../../jest.preset',
  displayName: 'habit-app',
  setupFilesAfterEnv: ['<rootDir>/../../jest.setup.ts'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/main.tsx'],
};
