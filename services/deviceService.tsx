// import axios from 'axios';
import { data, deviceData } from '../constants/data';
import { deviceObject } from '../types/device';

// const API_URL = process.env.EXPO_PUBLIC_API_URL;


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