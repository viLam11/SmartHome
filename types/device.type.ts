import images from '@/constants/images';

export type deviceStatusObject = {
    feedId: number,
    feedKey: string,
    value: string,
    type: string,
    title: string,
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
        "displayTittle": 'Cửa',
        "router": "devices/doors/"
    },
    "fanList": {
        "img": images.fan,
        "type": "fan",
        "displayTittle": 'Quạt',
        "router": "devices/fans/"
    },
    "lightList": {
        "img": images.lightbulb,
        "type": "light",
        "displayTittle": 'Đèn',
        "router": "devices/lights/"
    },
    "sensorList": {
        "img": images.sensor,
        "type": "sensor",
        "displayTittle": 'Cảm biến',
        "router": "devices/sensors/"
    }
};



export type SensorDataType = {
    image: string ,
    message: string | null,
    value: number,
    roomId: number, 
    feedId: number, 
    feedKey: string,   
    title: string,   
    type: 'temperature' | 'humidity' | 'brightness',  
    unit: string | null
}
