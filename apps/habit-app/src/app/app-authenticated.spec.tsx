import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react-native';
import React from 'react';
import 'react-native';
import { App } from './app';

jest.mock('@nx-anlitz/shared/utils/apollo-provider', () => ({
  CustomApolloProvider: ({ children }) => children,
}));

jest.mock('react-native-auth0', () => {
  class auth0 {}

  return { __esModule: true, default: auth0 };
});

jest.mock('@nx-anlitz/shared/auth', () => {
  const module = jest.requireActual('@nx-anlitz/shared/auth');

  return {
    ...module,
    useAuth: jest.fn().mockReturnValue({ isAuthenticated: true }),
  };
});

describe('App', () => {
  it('Authenticated User', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <App />
      </MockedProvider>
    );

    expect(getByTestId('HabitsScreen')).toBeDefined();
  });
});
