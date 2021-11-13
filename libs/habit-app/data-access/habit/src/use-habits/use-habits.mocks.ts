import faker from 'faker';
import { DocumentNode } from 'graphql';
import { HabitsDocument, HabitsSubscription } from './use-habits.generated';

const request = {
  query: HabitsDocument,
};

export const habitsData = Array.from({ length: 3 }, (_, i) => {
  faker.seed(i);
  return {
    id: faker.datatype.uuid(),
    name: faker.lorem.word(),
  };
});

export const MockNoData: {
  request: { query: DocumentNode };
  result: { data: HabitsSubscription };
}[] = [
  {
    request,
    result: {
      data: { queryHabit: [] },
    },
  },
];

export const MockHasData: {
  request: { query: DocumentNode };
  result: { data: HabitsSubscription };
}[] = [
  {
    request,
    result: {
      data: { queryHabit: habitsData },
    },
  },
];
