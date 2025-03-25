import axios from 'axios';
import { deviceData } from '../constants/data';
import { deviceListObject, deviceStatusObject, deviceCreateObject } from '../types/device';
import { getAuthToken } from './authService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Hàm tạo headers với Authorization token
const getAuthHeaders = async () => {
    const token = await getAuthToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
};

export const getRoomDevices = async (roomID: string): Promise<deviceListObject> => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get(`${API_URL}/devices/room/${roomID}`, headers);
        return response.data;
    } catch (error) {
        console.error('Error fetching room devices:', error);
        throw error;
    }
};

export const getDeviceData = async (feedId: string): Promise<deviceStatusObject> => {
    try {
        // const headers = await getAuthHeaders();
        // const response = await axios.get(`${API_URL}/devices/${feedId}`, headers);
        // return response.data;
        return deviceData;
    } catch (error) {
        console.error('Error fetching device data:', error);
        throw error;
    }
};

export const controlDevice = async (feedId: string, feedKey: string, status: boolean) => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.put(`${API_URL}/devices/${feedId}`, { feedKey, status }, headers);
        return response.data;
    } catch (error) {
        console.error('Error controlling device:', error);
        throw error;
    }
};

export const addNewDeviceService = async (device: deviceCreateObject) => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.post(`${API_URL}/devices`, device, headers);
        return response.data;
    } catch (error) {
        console.error('Error adding new device:', error);
        throw error;
    }
};
