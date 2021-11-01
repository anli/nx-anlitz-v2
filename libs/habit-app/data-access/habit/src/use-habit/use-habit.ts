import { useHabitSubscription } from './use-habit.generated';

export const useHabit = ({ id }: { id: string }) => {
  const {
    loading,
    error,
    data: gqlData,
  } = useHabitSubscription({ variables: { id } });
  const data = gqlData?.getHabit;

  return { loading, error, data };
};
