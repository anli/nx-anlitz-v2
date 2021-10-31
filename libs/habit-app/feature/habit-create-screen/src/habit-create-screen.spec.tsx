import { MockedProvider } from '@apollo/client/testing';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { lorem } from 'faker';
import React from 'react';
import { HabitCreateScreen } from './habit-create-screen';

const Stack = createNativeStackNavigator();

const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => {
  const module = jest.requireActual('@react-navigation/native');
  return {
    ...module,
    useNavigation: () => ({
      canGoBack: jest.fn().mockReturnValue(true),
      goBack: mockGoBack,
    }),
  };
});

describe('Habit Create Screen', () => {
  it('No input', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Screen"
              component={HabitCreateScreen.Component}
              options={HabitCreateScreen.options}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );
    expect(getByTestId('NameInput')).toBeDefined();
    expect(getByTestId('CreateHabitButton')).toBeDefined();
  });

  it('Submit with errors', async () => {
    const { getByTestId, findByText } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Screen"
              component={HabitCreateScreen.Component}
              options={HabitCreateScreen.options}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );

    fireEvent.press(getByTestId('CreateHabitButton'));

    expect(await findByText('Habit Name is required.')).toBeDefined();
  });

  it('Submit', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Screen"
              component={HabitCreateScreen.Component}
              options={HabitCreateScreen.options}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );

    fireEvent.changeText(getByTestId('NameInput'), lorem.word());
    fireEvent.press(getByTestId('CreateHabitButton'));

    await waitFor(() => expect(mockGoBack).toBeCalled());
    expect(mockGoBack).toBeCalledTimes(1);
  });
});
