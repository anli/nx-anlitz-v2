import { baseTheme } from '@nx-anlitz/shared/ui';
import { ThemeProvider } from '@shopify/restyle';
import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import React from 'react';

export const decorators = [
  withBackgrounds,
  (Story) => (
    <ThemeProvider theme={baseTheme}>
      <Story />
    </ThemeProvider>
  ),
];
export const parameters = {
  backgrounds: [
    { name: 'plain', value: 'white', default: true },
    { name: 'warm', value: 'hotpink' },
    { name: 'cool', value: 'deepskyblue' },
  ],
};
