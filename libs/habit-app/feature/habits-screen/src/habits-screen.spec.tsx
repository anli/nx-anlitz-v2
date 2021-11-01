import { MockedProvider } from '@apollo/client/testing';
import {
  habitsData,
  MockHasData,
  MockNoData,
} from '@nx-anlitz/habit-app/data-access/habit';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { act, fireEvent, render } from '@testing-library/react-native';
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
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('No habits', async () => {
    const { getByText, getByTestId } = render(
      <MockedProvider mocks={MockNoData} addTypename={false}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Screen"
              component={HabitsScreen.Component}
              options={HabitsScreen.options}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(
      getByText('You have no habits. Press + to create one')
    ).toBeDefined();
    expect(getByTestId('CreateHabitButton')).toBeDefined();
  });

  it('Create Habit', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={MockNoData} addTypename={false}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Screen"
              component={HabitsScreen.Component}
              options={HabitsScreen.options}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    fireEvent.press(getByTestId('CreateHabitButton'));

    expect(mockNavigate).toBeCalledTimes(1);
    expect(mockNavigate).toBeCalledWith('HabitCreateScreen');
  });

  it('Has habits', async () => {
    const { getByText, queryByText } = render(
      <MockedProvider mocks={MockHasData} addTypename={false}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Screen"
              component={HabitsScreen.Component}
              options={HabitsScreen.options}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );
    expect(
      getByText('You have no habits. Press + to create one')
    ).toBeDefined();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(queryByText('You have no habits. Press + to create one')).toBeNull();
  });

  it('View Habit', async () => {
    const { getByText } = render(
      <MockedProvider mocks={MockHasData} addTypename={false}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Screen"
              component={HabitsScreen.Component}
              options={HabitsScreen.options}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    fireEvent.press(getByText(habitsData.find(Boolean)?.name || ''));

    expect(mockNavigate).toBeCalledTimes(1);
    expect(mockNavigate).toBeCalledWith('HabitViewScreen', {
      id: habitsData.find(Boolean)?.id,
    });
  });
});
