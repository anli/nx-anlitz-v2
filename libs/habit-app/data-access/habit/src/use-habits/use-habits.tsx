import { useHabitsSubscription } from './use-habits.generated';

export const useHabits = () => {
  const { loading, error, data: gqlData } = useHabitsSubscription();
  const data = gqlData?.getUser?.habits || [];

  return { loading, error, data };
};
