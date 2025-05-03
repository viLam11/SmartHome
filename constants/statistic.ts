import { subDays, format, addDays } from 'date-fns';
import { runningTimeDeviceType, runningTimeOneDeviceType, summaryStatisticType } from '@/types/statistic.type';
import dayjs from 'dayjs';

const now = new Date();
export const endDateData = now.getHours() > 7 ? now : new Date(subDays(now, 1));
export const startDateData =  new Date(subDays(endDateData, 6));

export const runningTime: runningTimeOneDeviceType = Object.fromEntries(
  Array.from({ length: 7 }, (_, i) => {
    const currentDate = addDays(startDateData, i);
    return [format(currentDate, 'dd/MM'), Math.floor(Math.random() * 24)];
  })
);

export const runningTimeDeviceData: runningTimeDeviceType = {
  light: Object.fromEntries(
    Array.from({ length: 7 }, (_, i) => {
      const currentDate = addDays(startDateData, i);
      return [format(currentDate, 'yy-MM-dd'), Math.floor(Math.random() * 24)];
    })
  ),
  fan: Object.fromEntries(
    Array.from({ length: 7 }, (_, i) => {
      const currentDate = addDays(startDateData, i);
      return [format(currentDate, 'yy-MM-dd'), Math.floor(Math.random() * 24)];
    })
  ),
};

export const currentTime = {
  hour: dayjs().hour(),
  minute: dayjs().minute(),
  dayOfWeek: dayjs().format('ddd'),
  day: dayjs().date(),
  month: dayjs().format('MMM'),
};

export const summaryStatisticData: summaryStatisticType = {
  deviceRatioType: [
    { value: 0.488, label: 'Living Room' },
    { value: 0.242, label: 'Garage' },
    { value: 0.27, label: 'Bedroom' },
  ],
}

export const deviceActive = [
  { type: 'light', active: 2, inactive: 4},
  { type: 'fan', active: 1, inactive: 2 },
  { type: 'doors', active: 1, inactive: 0 },
]