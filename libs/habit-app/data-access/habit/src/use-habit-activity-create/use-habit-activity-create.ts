import { AddHabitActivityInput } from '@nx-anlitz/habit-app/utils/graphql-types';
import { useHabitActivityCreateMutation } from './use-habit-activity-create.generated';

export const useHabitActivityCreate = () => {
  const [habitActivityCreate, { data: gqlData, loading, error }] =
    useHabitActivityCreateMutation();
  const data = gqlData?.addHabitActivity?.numUids;

  const handleMutate = ({ count, date, habit }: AddHabitActivityInput) => {
    return habitActivityCreate({
      variables: {
        input: {
          count,
          date,
          habit,
        },
      },
    });
  };

  return { loading, error, data, mutate: handleMutate };
};
