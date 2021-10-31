import { useHabitsQuery } from './use-habits.generated';

export const useHabits = () => {
  const { loading, error, data: gqlData } = useHabitsQuery();
  const data = gqlData?.getUser?.habits || [];

  return { loading, error, data };
};
