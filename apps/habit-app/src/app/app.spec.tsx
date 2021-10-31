import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react-native';
import React from 'react';
import 'react-native';
import { App } from './app';

jest.mock('@nx-anlitz/shared/utils/apollo-provider', () => ({
  CustomApolloProvider: ({ children }) => children,
}));

describe('App', () => {
  it('App is loaded', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <App />
      </MockedProvider>
    );
    expect(getByTestId('HabitsScreen')).toBeDefined();
  });
});
