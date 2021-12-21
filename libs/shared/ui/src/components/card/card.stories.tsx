import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';
import faker from 'faker';
import React from 'react';
import { View } from '..';
import { Card } from './card';

faker.seed(0);
const title = faker.lorem.words();
const checkboxes = Array.from({ length: 7 }, (_, i) => ({
  key: `${i}`,
  value: false,
  onPress: action('onCheckboxPress'),
}));

const Meta: ComponentMeta<typeof Card> = {
  title: 'Card',
  component: Card,
};

export default Meta;

type Story = ComponentStory<typeof Card>;

export const Basic: Story = () => (
  <View padding="base">
    <Card title={title} checkboxes={checkboxes} onPress={action('onPress')} />
  </View>
);
