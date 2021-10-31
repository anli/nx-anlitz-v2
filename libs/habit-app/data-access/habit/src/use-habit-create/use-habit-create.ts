import { AddHabitInput } from '@nx-anlitz/habit-app/utils/graphql-types';
import { useHabitCreateMutation } from './use-habit-create.generated';

export const useHabitCreate = () => {
  const [addHabit, { data: gqlData, loading, error }] =
    useHabitCreateMutation();
  const data = gqlData?.addHabit?.numUids;

  const handleMutate = ({
    name,
    userId,
  }: Pick<AddHabitInput, 'name' | 'userId'>) => {
    addHabit({
      variables: {
        input: {
          name,
          userId,
          user: { id: userId },
        },
      },
    });
  };

  return { loading, error, data, mutate: handleMutate };
};
