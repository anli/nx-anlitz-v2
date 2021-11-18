import { by, device, element, expect } from 'detox';

describe('App', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('App is loaded', async () => {
    await expect(element(by.id('HabitsScreen'))).toBeVisible();
  });
});
