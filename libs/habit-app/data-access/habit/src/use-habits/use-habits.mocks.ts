import { endOfWeek, formatISO, startOfToday, startOfWeek } from 'date-fns';
import faker from 'faker';
import { DocumentNode } from 'graphql';
import { HabitsDocument, HabitsSubscription } from './use-habits.generated';

const request = {
  query: HabitsDocument,
  variables: {
    minDate: formatISO(startOfWeek(startOfToday(), { weekStartsOn: 1 })),
    maxDate: formatISO(endOfWeek(startOfToday(), { weekStartsOn: 1 })),
  },
};

export const habitsData = Array.from({ length: 3 }, (_, i) => {
  faker.seed(i);
  return {
    id: faker.datatype.uuid(),
    name: faker.lorem.word(),
    habitActivities: [
      {
        id: faker.datatype.uuid(),
        date: formatISO(startOfWeek(startOfToday(), { weekStartsOn: 1 })),
        count: 1,
      },
    ],
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
