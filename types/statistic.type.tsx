export type runningTimeObjects = {
    type: string,
    title: string,
    data: timeADayObject[],
    startDate: string,
    endDate: string
};

export type runningTimeDeviceTypeObjects = {
    type: string,
    data: timeADayObject[],
    startDate: string,
    endDate: string
};

export type timeADayObject = {
    date: string,
    value: number
};

