import { ComponentMeta, ComponentStory } from '@storybook/react-native';
import faker from 'faker';
import React from 'react';
import { Text } from './text';

faker.seed(0);
const text = faker.lorem.paragraph(1);

const Meta: ComponentMeta<typeof Text> = {
  title: 'Text',
  component: Text,
};

export default Meta;

type Story = ComponentStory<typeof Text>;

export const Basic: Story = () => <Text color="text">{text}</Text>;

export const Critical: Story = () => <Text color="critical">{text}</Text>;
