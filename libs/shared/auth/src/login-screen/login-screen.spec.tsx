import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { AuthProvider } from '../auth-provider';
import { LoginScreen } from './login-screen';

const Stack = createNativeStackNavigator();

const mockAuthorize = jest.fn().mockResolvedValue({ accessToken: '' });
jest.mock('react-native-auth0', () => {
  class auth0 {
    get webAuth() {
      return {
        authorize: mockAuthorize,
      };
    }
  }

  return { __esModule: true, default: auth0 };
});

describe('Login Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Login', async () => {
    const { getByTestId } = render(
      <AuthProvider domain="" clientId="">
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Screen"
              component={LoginScreen.Component}
              options={LoginScreen.options}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    );

    fireEvent.press(getByTestId('LoginButton'));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(mockAuthorize).toBeCalledTimes(1);
  });
});
