import { ThemeProvider } from '@shopify/restyle';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';
import React from 'react';
import { baseTheme } from '../../themes';
import { View } from './view';

const Meta: ComponentMeta<typeof View> = {
  title: 'View',
  component: View,
  argTypes: {},
  args: {},
};

export default Meta;

type Story = ComponentStory<typeof View>;

export const Basic: Story = () => (
  <ThemeProvider theme={baseTheme}>
    <View backgroundColor="critical" width={20} height={20} />
  </ThemeProvider>
);
