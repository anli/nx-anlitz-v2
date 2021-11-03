import { HabitPatch } from '@nx-anlitz/habit-app/utils/graphql-types';
import { useHabitUpdateMutation } from './use-habit-update.generated';

export const useHabitUpdate = () => {
  const [habitUpdate, { data: gqlData, loading, error }] =
    useHabitUpdateMutation();
  const data = gqlData?.updateHabit?.numUids;

  const handleMutate = ({ id, set }: { id: string; set: HabitPatch }) => {
    habitUpdate({
      variables: {
        input: {
          filter: { id: [id] },
          set,
        },
      },
    });
  };

  return { loading, error, data, mutate: handleMutate };
};
