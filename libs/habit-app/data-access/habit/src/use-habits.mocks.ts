import { GET_HABITS } from './use-habits';
import faker from 'faker';

const request = {
  query: GET_HABITS,
};

export const habitsData = Array.from({ length: 3 }, (_, i) => {
  faker.seed(i);
  return {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
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
