import { by, device, element, expect } from 'detox';
import { lorem } from 'faker';

describe('Habit Create', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Create a habit', async () => {
    await element(
      by.id('CreateHabitButton').withAncestor(by.id('HabitsScreen'))
    ).tap();

    await waitFor(element(by.id('HabitCreateScreen')))
      .toBeVisible()
      .withTimeout(2000);

    await element(by.id('NameInput')).typeText(lorem.word());
    await element(by.id('NameInput')).tapReturnKey();

    await element(
      by.id('CreateHabitButton').withAncestor(by.id('HabitCreateScreen'))
    ).tap();

    await waitFor(element(by.id('HabitsScreen')))
      .toBeVisible()
      .withTimeout(2000);
    await expect(element(by.id('HabitsScreen'))).toBeVisible();
  });
});
