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

export type summaryStatisticObjects = {
    totalRuntime: string,
    deviceRatio: deviceRatio[],
    deviceActive: deviceActive[]
};
export type deviceRatio = {
    value: number,
    label: string
};

export type deviceActive = {
    type: string,
    active: number,
    inactive: number
};

export type deviceRatioWColor = {
    value: number,
    label: string,
    color: string
};

export type deviceActiveWColor = {
    type: string,
    active: number,
    inactive: number,
    color: string
};
