import { render } from '@testing-library/react-native';
import React from 'react';
import 'react-native';
import { App } from './app';

process.env.GRAPHQL_URL = '';

describe('App', () => {
  it('App is loaded', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('HabitsScreen')).toBeDefined();
  });
});
