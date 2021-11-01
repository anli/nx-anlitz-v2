import faker from 'faker';
import { HabitsDocument } from './use-habits.generated';

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

export const MockNoData = [
  {
    request,
    result: {
      data: { getUser: { habits: [] } },
    },
  },
];

export const MockHasData = [
  {
    request,
    result: {
      data: { getUser: { habits: habitsData } },
    },
  },
];
