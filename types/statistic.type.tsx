export type runningTimeObjects = {
    type: string,
    title: string,
    data: timeADayObject[],
    startDate: string,
    endDate: string
};

export type timeADayObject = {
    dayOfWeek: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun',
    value: number
};

