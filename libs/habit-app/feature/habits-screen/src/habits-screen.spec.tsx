import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { HabitsScreen } from './habits-screen';

const Stack = createNativeStackNavigator();

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  const module = jest.requireActual('@react-navigation/native');
  return {
    ...module,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('Habits Screen', () => {
  it('No habits', () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Screen"
            component={HabitsScreen.Component}
            options={HabitsScreen.options}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
    expect(
      getByText('You have no habits. Press + to create one')
    ).toBeDefined();
    expect(getByTestId('CreateHabitButton')).toBeDefined();
  });

  it('Create Habit', async () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Screen"
            component={HabitsScreen.Component}
            options={HabitsScreen.options}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    fireEvent.press(getByTestId('CreateHabitButton'));
    await waitFor(() => expect(mockNavigate).toBeCalledTimes(1));

    expect(mockNavigate).toBeCalledWith('HabitCreateScreen');
  });
});
