import { MockedProvider } from '@apollo/client/testing';
import {
  habitData,
  habitNonSubscriptionMockHasData,
} from '@nx-anlitz/habit-app/data-access/habit';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { act, fireEvent, render } from '@testing-library/react-native';
import { lorem } from 'faker';
import React from 'react';
import { HabitUpdateScreen } from './habit-update-screen';

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

describe('Habit View Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Has data', async () => {
    const { getByTestId } = render(
      <MockedProvider
        mocks={habitNonSubscriptionMockHasData}
        addTypename={false}
      >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Screen"
              component={HabitUpdateScreen.Component}
              options={HabitUpdateScreen.options}
              initialParams={{ id: habitData.id }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(getByTestId('NameInput')).toBeDefined();
    expect(getByTestId('NameInput').props.value).toEqual(habitData.name);
    expect(getByTestId('UpdateHabitButton')).toBeDefined();
  });

  it('Submit with errors', async () => {
    const { getByTestId, getByText } = render(
      <MockedProvider
        mocks={habitNonSubscriptionMockHasData}
        addTypename={false}
      >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Screen"
              component={HabitUpdateScreen.Component}
              options={HabitUpdateScreen.options}
              initialParams={{ id: habitData.id }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    fireEvent.changeText(getByTestId('NameInput'), '');
    fireEvent.press(getByTestId('UpdateHabitButton'));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(getByText('Habit Name is required.')).toBeDefined();
  });

  it('Submit', async () => {
    const { getByTestId } = render(
      <MockedProvider
        mocks={[...habitNonSubscriptionMockHasData]}
        addTypename={false}
      >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Screen"
              component={HabitUpdateScreen.Component}
              options={HabitUpdateScreen.options}
              initialParams={{ id: habitData.id }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    fireEvent.changeText(getByTestId('NameInput'), lorem.word());
    fireEvent.press(getByTestId('UpdateHabitButton'));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(mockGoBack).toBeCalledTimes(1);
  });
});
