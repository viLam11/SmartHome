import { subDays, format, addDays } from 'date-fns';
import dayjs from 'dayjs';

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

export const runningTimeDeviceType = {
  type: 'light',
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

export const currentTime = {
  hour: dayjs().hour(),
  minute: dayjs().minute(),
  dayOfWeek: dayjs().format('ddd'),
  day: dayjs().date(),
  month: dayjs().format('MMM'),
};

export const summaryStatisticData = {
  totalRuntime: `${currentTime.hour}hrs, ${currentTime.minute} mins`,
  deviceRatio: [
    { value: 0.488, label: 'Light'},
    { value: 0.242, label: 'Fan' },
    { value: 0.27, label: 'Door'},
  ],
  deviceActive: [
    { type: 'light', active: 2, inactive: 4},
    { type: 'fan', active: 1, inactive: 2 },
    { type: 'doors', active: 1, inactive: 0 },
  ],
}