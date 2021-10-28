module.exports = {
  preset: '../../jest.preset',
  coveragePathIgnorePatterns: ['/node_modules/', '/libs/'],
  displayName: 'habit-app',
  setupFilesAfterEnv: ['<rootDir>/../../jest.setup.ts'],
};
