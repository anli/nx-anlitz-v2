import { render } from '@testing-library/react-native';
import React from 'react';
import 'react-native';
import App from './app';

it('renders correctly', () => {
  const { getByText } = render(<App />);
  expect(getByText('Welcome')).toBeDefined();
});
