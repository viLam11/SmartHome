import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
export type roomObject = {
    id: string,
    name: string,
    img: string,
    devices: deviceObject[]
};

export type deviceObject = {
    feedId: number,
    feedKey: string,
    tittle: string,
    name: string,
    status: boolean
};

const data: deviceObject[] = [
        { "feedId": 101, "feedKey": "fan_1", "tittle": "fan", "name": "Fan 1", "status": true },
        { "feedId": 102, "feedKey": "fan_2", "tittle": "fan", "name": "Fan 2", "status": false },
        { "feedId": 103, "feedKey": "fan_3", "tittle": "fan", "name": "Fan 3", "status": true },

        { "feedId": 201, "feedKey": "light_1", "tittle": "light", "name": "Light 1", "status": true },
        { "feedId": 202, "feedKey": "light_2", "tittle": "light", "name": "Light 2", "status": false },
        { "feedId": 203, "feedKey": "light_3", "tittle": "light", "name": "Light 3", "status": true },

        { "feedId": 301, "feedKey": "sensor_1", "tittle": "sensor", "name": "Sensor 1", "status": true },
        { "feedId": 302, "feedKey": "sensor_2", "tittle": "sensor", "name": "Sensor 2", "status": false },
        { "feedId": 303, "feedKey": "sensor_3", "tittle": "sensor", "name": "Sensor 3", "status": true }
    ]

const deviceData: deviceObject = { "feedId": 201, "feedKey": "light_1", "tittle": "light", "name": "Light 1", "status": true };

export const getRoomDevices = async (roomID: string): Promise<deviceObject[]> => {
    try {
        // const response = await axios.get(`${API_URL}/devices/room/${roomID}`);
        // return response.data;
        return data;
    } catch (error) {
        console.error("Error fetching room devices:", error);
        throw error;
    }
};

export const getDeviceData = async (feedId: string): Promise<deviceObject> => {
    try {
        // const response = await axios.get(`${API_URL}/devices/${feedId}`);
        // return response.data;
        return deviceData;
    }
    catch (error) {
        console.error("Error fetching device data:", error);
        throw error;
    }
}

export const controlDevice = async (feedId: string, feedKey: string, status: boolean) => {
    try {
        // const response = await axios.put(`${API_URL}/devices/${feedId}`, { feedKey, status });
        // return response.data;
    }
    catch (error) {
        console.error("Error fetching device data:", error);
        throw error;
    }
}