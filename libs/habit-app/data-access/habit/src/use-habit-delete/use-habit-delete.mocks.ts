import faker from 'faker';
import { HabitDeleteDocument } from './use-habit-delete.generated';

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

export const habitDeleteMockSuccess = [
  {
    request,
    result: {
      data: { deleteHabit: { numUids: 1 } },
    },
  },
];
