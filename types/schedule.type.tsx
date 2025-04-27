export type DeviceSchedul =  {
    id: number,
    deviceId: number,
    useId: number,
    action: string,
    scheduleTime: Date,
    repeatDays: string,
    timeZone: string,
    isActive: boolean,  
}