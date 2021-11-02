import { useHabitDeleteMutation } from './use-habit-delete.generated';

export const useHabitDelete = () => {
  const [habitDelete, { data: gqlData, loading, error }] =
    useHabitDeleteMutation();
  const data = gqlData?.deleteHabit?.numUids;

  const handleMutate = ({ id }: { id: string }) => {
    habitDelete({
      variables: {
        filter: {
          id: [id],
        },
      },
    });
  };

  return { loading, error, data, mutate: handleMutate };
};
