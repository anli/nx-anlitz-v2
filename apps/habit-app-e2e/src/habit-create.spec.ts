import { expect, by, device, element, waitFor } from 'detox';
import { lorem } from 'faker';

describe('Habit Create', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Create a habit', async () => {
    await element(
      by.id('CreateHabitButton').withAncestor(by.id('HabitsScreen'))
    ).tap();

    await expect(element(by.id('HabitCreateScreen'))).toBeVisible();

    await element(
      by.id('NameInput').withAncestor(by.id('HabitCreateScreen'))
    ).typeText(lorem.word());
    await element(by.id('NameInput')).tapReturnKey();

    await element(
      by.id('CreateHabitButton').withAncestor(by.id('HabitCreateScreen'))
    ).tap();

    await expect(element(by.id('HabitsScreen'))).toBeVisible();
  });
});
