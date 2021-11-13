import { useHabitsSubscription } from './use-habits.generated';

export const useHabits = () => {
  const { loading, error, data: gqlData } = useHabitsSubscription();
  const data = gqlData?.queryHabit || [];

  return { loading, error, data };
};
