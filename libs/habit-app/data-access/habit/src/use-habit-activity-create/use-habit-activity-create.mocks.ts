import { addDays, formatISO, startOfToday, startOfWeek } from 'date-fns';
import { DocumentNode } from 'graphql';
import { habitsData } from '../use-habits';
import {
  HabitActivityCreateDocument,
  HabitActivityCreateMutation,
} from './use-habit-activity-create.generated';

const request = {
  query: HabitActivityCreateDocument,
  variables: {
    input: {
      count: 1,
      date: formatISO(
        addDays(startOfWeek(startOfToday(), { weekStartsOn: 1 }), 1)
      ),
      habit: { id: habitsData.find(Boolean)?.id },
    },
  },
};

export const MockHabitActivityCreateSuccessful: {
  request: { query: DocumentNode };
  result: { data: HabitActivityCreateMutation };
}[] = [
  {
    request,
    result: {
      data: { addHabitActivity: { numUids: 1 } },
    },
  },
];
