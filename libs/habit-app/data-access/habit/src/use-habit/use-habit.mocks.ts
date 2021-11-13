import faker from 'faker';
import { DocumentNode } from 'graphql';
import {
  HabitNonSubscriptionDocument,
  HabitNonSubscriptionQuery,
} from './use-habit-non-subscription.generated';
import { HabitDocument, HabitSubscription } from './use-habit.generated';

faker.seed(0);
export const habitData = {
  id: faker.datatype.uuid(),
  name: faker.lorem.word(),
};

const request = {
  query: HabitDocument,
  variables: {
    id: habitData.id,
  },
};

export const habitMockHasData: {
  request: { query: DocumentNode };
  result: { data: HabitSubscription };
}[] = [
  {
    request,
    result: {
      data: { getHabit: habitData },
    },
  },
];

export const habitNonSubscriptionMockHasData: {
  request: { query: DocumentNode };
  result: { data: HabitNonSubscriptionQuery };
}[] = [
  {
    request: { ...request, query: HabitNonSubscriptionDocument },
    result: {
      data: { getHabit: habitData },
    },
  },
];
