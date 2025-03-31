import images from '@/constants/images';

export type deviceStatusObject = {
    feedId: number,
    feedKey: string,
    title: string,
    name: string,
    status: boolean,
    createdAt: string
};

export type deviceCreateObject = {
    feedId: number,
    feedKey: string,
    type: string,
    title: string,
    roomID: number,
};

export type deviceListObject = {
    doorList: deviceStatusObject[],
    fanList: deviceStatusObject[],
    lightList: deviceStatusObject[],
    sensorList: deviceStatusObject[]
};


export const DEVICE_FORMAT: Record<string, Record<string, string>> = {
    "doorList": {
        "img": images.door,
        "type": "door",
        "displayTittle": 'Door',
        "router": "devices/doors/"
    },
    "fanList": {
        "img": images.fan,
        "type": "fan",
        "displayTittle": 'Fan',
        "router": "devices/fans/"
    },
    "lightList": {
        "img": images.lightbulb,
        "type": "light",
        "displayTittle": 'Light',
        "router": "devices/lights/"
    },
    "sensorList": {
        "img": images.aircondition,
        "type": "sensor",
        "displayTittle": 'Sensor',
        "router": "devices/sensors/"
    }
};