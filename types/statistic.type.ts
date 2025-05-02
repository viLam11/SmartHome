
export type runningTimeDeviceType = {
    [key: string]: {
        [date: string]: number
    }
};

export type runningTimeOneDeviceType = {
    [date: string]: number
};

export type summaryStatisticType = {
    deviceRatioType: deviceRatioType[]
};
export type deviceRatioType = {
    value: number,
    label: string
};
export type deviceRatioWColorType = {
    value: number,
    label: string,
    color: string,
    gradientCenterColor: string,
};

export type deviceActiveWColorType = {
    type: string,
    displayTitle: string,
    active: number,
    inactive: number,
    color: string
};
