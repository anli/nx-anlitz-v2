import { MockedProvider } from '@apollo/client/testing';
import {
  habitData,
  habitDeleteMockSuccess,
  habitMockHasData,
} from '@nx-anlitz/habit-app/data-access/habit';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { HabitViewScreen } from './habit-view-screen';

const Stack = createNativeStackNavigator();

const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => {
  const module = jest.requireActual('@react-navigation/native');
  return {
    ...module,
    useNavigation: () => ({
      ...module.useNavigation(),
      canGoBack: jest.fn().mockReturnValue(true),
      goBack: mockGoBack,
    }),
  };
});

describe('Habit View Screen', () => {
  it('See habit information', async () => {
    const { getByText } = render(
      <MockedProvider mocks={habitMockHasData} addTypename={false}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Screen"
              component={HabitViewScreen.Component}
              options={HabitViewScreen.options}
              initialParams={{ id: habitData.id }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(getByText(habitData.name)).toBeDefined();
  });

  it('Delete a habit', async () => {
    const { getByTestId } = render(
      <MockedProvider
        mocks={[...habitMockHasData, ...habitDeleteMockSuccess]}
        addTypename={false}
      >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Screen"
              component={HabitViewScreen.Component}
              options={HabitViewScreen.options}
              initialParams={{ id: habitData.id }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    fireEvent.press(getByTestId('HabitDeleteButton'));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(mockGoBack).toBeCalledTimes(1);
  });
});
