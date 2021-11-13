import faker from 'faker';
import { DocumentNode } from 'graphql';
import {
  HabitDeleteDocument,
  HabitDeleteMutation,
} from './use-habit-delete.generated';

faker.seed(0);
const habitData = {
  id: faker.datatype.uuid(),
  name: faker.lorem.word(),
};

const request = {
  query: HabitDeleteDocument,
  variables: {
    filter: {
      id: habitData.id,
    },
  },
};

export const habitDeleteMockSuccess: {
  request: { query: DocumentNode };
  result: { data: HabitDeleteMutation };
}[] = [
  {
    request,
    result: {
      data: { deleteHabit: { numUids: 1 } },
    },
  },
];
