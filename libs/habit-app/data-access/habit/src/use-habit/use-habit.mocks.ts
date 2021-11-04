import faker from 'faker';
import { HabitNonSubscriptionDocument } from './use-habit-non-subscription.generated';
import { HabitDocument } from './use-habit.generated';

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

export const habitMockHasData = [
  {
    request,
    result: {
      data: { getHabit: habitData },
    },
  },
];

export const habitNonSubscriptionMockHasData = [
  {
    request: { ...request, query: HabitNonSubscriptionDocument },
    result: {
      data: { getHabit: habitData },
    },
  },
];
