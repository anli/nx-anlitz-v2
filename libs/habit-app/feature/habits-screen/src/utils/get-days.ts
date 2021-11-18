import { addDays, format } from 'date-fns';

export const getDays = (startDate: Date) =>
  Array.from(
    {
      length: 7,
    },
    (_, index) => {
      const date = addDays(startDate, index);
      return {
        date,
        dayName: format(date, 'EEEEEE'),
      };
    }
  );
