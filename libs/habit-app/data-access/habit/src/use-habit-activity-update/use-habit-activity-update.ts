import { HabitActivityPatch } from '@nx-anlitz/habit-app/utils/graphql-types';
import { useHabitActivityUpdateMutation } from './use-habit-activity-update.generated';

export const useHabitActivityUpdate = () => {
  const [habitActivityUpdate, { data: gqlData, loading, error }] =
    useHabitActivityUpdateMutation();
  const data = gqlData?.updateHabitActivity?.numUids;

  const handleMutate = ({
    id,
    set,
  }: {
    id: string;
    set: HabitActivityPatch;
  }) => {
    return habitActivityUpdate({
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
