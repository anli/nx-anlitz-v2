import { render } from '@testing-library/react-native';
import React from 'react';
import { HabitsScreen } from './habits-screen';

describe('Habits Screen', () => {
  it('No habits', () => {
    const { getByText, getByTestId } = render(<HabitsScreen.Component />);
    expect(
      getByText('You have no habits. Press + to create one')
    ).toBeDefined();
    expect(getByTestId('CreateHabitButton')).toBeDefined();
  });
});
