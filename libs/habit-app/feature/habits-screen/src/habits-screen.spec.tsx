import { MockedProvider } from '@apollo/client/testing';
import {
  habitsData,
  MockHabitActivityCreateSuccessful,
  MockHasData,
  MockNoData,
} from '@nx-anlitz/habit-app/data-access/habit';
import { AuthProvider } from '@nx-anlitz/shared/auth';
import { baseTheme } from '@nx-anlitz/shared/ui';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from '@shopify/restyle';
import { act, fireEvent, render } from '@testing-library/react-native';
import {
  addWeeks,
  endOfWeek,
  startOfToday,
  startOfWeek,
  subWeeks,
} from 'date-fns';
import React, { ReactNode } from 'react';
import { HabitsScreen } from './habits-screen';
import { formatDateRange } from './utils';

const Stack = createNativeStackNavigator();

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  const module = jest.requireActual('@react-navigation/native');
  return {
    ...module,
    useNavigation: () => ({
      ...module.useNavigation(),
      navigate: mockNavigate,
    }),
  };
});

const mockClearSession = jest.fn();
jest.mock('react-native-auth0', () => {
  class auth0 {
    get webAuth() {
      return {
        clearSession: mockClearSession,
      };
    }
  }

  return { __esModule: true, default: auth0 };
});

const CommonProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={baseTheme}>
      <AuthProvider domain="" clientId="">
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
};

describe('Habits Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('No habits', async () => {
    const { getByText, getByTestId } = render(
      <CommonProviders>
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
      </CommonProviders>
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
      <CommonProviders>
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
      </CommonProviders>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    fireEvent.press(getByTestId('CreateHabitButton'));

    expect(mockNavigate).toBeCalledTimes(1);
    expect(mockNavigate).toBeCalledWith('HabitCreateScreen');
  });

  it('Has habits', async () => {
    const { queryByText } = render(
      <CommonProviders>
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
      </CommonProviders>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(queryByText('You have no habits. Press + to create one')).toBeNull();
  });

  it('View Habit', async () => {
    const { getByText } = render(
      <CommonProviders>
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
      </CommonProviders>
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

  it('Logout', async () => {
    const { getByTestId } = render(
      <CommonProviders>
        <MockedProvider mocks={[]} addTypename={false}>
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
      </CommonProviders>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    fireEvent.press(getByTestId('LogoutButton'));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(mockClearSession).toBeCalledTimes(1);
  });

  it('See correct header title when previous period is press', async () => {
    const { getByText, getByTestId } = render(
      <CommonProviders>
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
      </CommonProviders>
    );
    const initialStartDate = startOfWeek(startOfToday(), { weekStartsOn: 1 });
    const initialEndDate = endOfWeek(startOfToday(), { weekStartsOn: 1 });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    fireEvent.press(getByTestId('PreviousPeriodButton'));
    fireEvent.press(getByTestId('PreviousPeriodButton'));
    fireEvent.press(getByTestId('PreviousPeriodButton'));
    fireEvent.press(getByTestId('PreviousPeriodButton'));
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(
      getByText(
        formatDateRange(
          subWeeks(initialStartDate, 4),
          subWeeks(initialEndDate, 4)
        )
      )
    ).toBeDefined();
  });

  it('See correct header title when next period is press', async () => {
    const { getByText, getByTestId } = render(
      <CommonProviders>
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
      </CommonProviders>
    );
    const initialStartDate = startOfWeek(startOfToday(), { weekStartsOn: 1 });
    const initialEndDate = endOfWeek(startOfToday(), { weekStartsOn: 1 });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    fireEvent.press(getByTestId('NextPeriodButton'));
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(
      getByText(
        formatDateRange(
          addWeeks(initialStartDate, 1),
          addWeeks(initialEndDate, 1)
        )
      )
    ).toBeDefined();
  });

  it('See correct header title when today is press', async () => {
    const { getByText, getByTestId } = render(
      <CommonProviders>
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
      </CommonProviders>
    );
    const initialStartDate = startOfWeek(startOfToday(), { weekStartsOn: 1 });
    const initialEndDate = endOfWeek(startOfToday(), { weekStartsOn: 1 });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    fireEvent.press(getByTestId('NextPeriodButton'));
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    fireEvent.press(getByTestId('TodayButton'));
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(
      getByText(formatDateRange(initialStartDate, initialEndDate))
    ).toBeDefined();
  });

  it('Press checked Habit Activity Day Checkbox', async () => {
    const { getAllByTestId } = render(
      <CommonProviders>
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
      </CommonProviders>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(
      getAllByTestId('HabitActivityDayCheckbox')[0].props.accessibilityState
        .checked
    ).toEqual(true);
    fireEvent.press(getAllByTestId('HabitActivityDayCheckbox')[0]);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  });

  it('Press unchecked Habit Activity Day Checkbox ', async () => {
    const { getAllByTestId } = render(
      <CommonProviders>
        <MockedProvider
          mocks={[...MockHasData, ...MockHabitActivityCreateSuccessful]}
          addTypename={false}
        >
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
      </CommonProviders>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(
      getAllByTestId('HabitActivityDayCheckbox')[1].props.accessibilityState
        .checked
    ).toEqual(false);
    fireEvent.press(getAllByTestId('HabitActivityDayCheckbox')[1]);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  });
});
