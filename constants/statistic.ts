import { subDays, format, addDays } from 'date-fns';

const endDate = subDays(new Date(), 1);
const startDate = subDays(endDate, 6);

export const runningTime = {
  type: 'light',
  title: 'So 1',
  data: Array.from({ length: 7 }, (_, i) => {
    const currentDate = addDays(startDate, i);
    return {
      date: format(currentDate, 'dd/MM'),
      value: Math.floor(Math.random() * 24),
    };
  }),
  startDate: format(startDate, 'dd/MM/yyyy'),
  endDate: format(endDate, 'dd/MM/yyyy'),
};

