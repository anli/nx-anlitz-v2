import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';
import faker from 'faker';
import React from 'react';
import { FlatList } from 'react-native';
import { Text } from '../text';
import { HorizontalBounceView } from './horizontal-bounce-view';

const data = Array.from({ length: 100 }, (_, k) => {
  faker.seed(k);
  return faker.lorem.sentence();
});

const Meta: ComponentMeta<typeof HorizontalBounceView> = {
  title: 'Horizontal Bounce View',
  component: HorizontalBounceView,
};

export default Meta;

type Story = ComponentStory<typeof HorizontalBounceView>;

export const Basic: Story = () => (
  <HorizontalBounceView onStart={action('onStart')} onEnd={action('onEnd')}>
    <FlatList data={data} renderItem={({ item }) => <Text>{item}</Text>} />
  </HorizontalBounceView>
);
