import axios from 'axios';
// import { deviceData } from '../constants/data';
import { deviceListObject, deviceStatusObject, deviceCreateObject } from '../types/device.type';
import { getAuthHeaders } from './authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Hàm tạo headers với Authorization token

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
        const headers = await getAuthHeaders();
        const response = await axios.get(`${API_URL}/devices/${feedId}`, headers);
        await AsyncStorage.setItem('deviceType', response.data.type);
        await AsyncStorage.setItem('deviceTitle', response.data.title);
        return response.data;
        // return deviceData;
    } catch (error) {
        console.error('Error fetching device data:', error);
        throw error;
    }
};

export const controlDevice = async (feedId: string, value: string) => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.post(`${API_URL}/devices/${feedId}`, { value }, headers);
        return response.data;
    } catch (error) {
        console.error('Error controlling device:', error);
        throw error;
    }
};

export const addNewDeviceService = async (device: deviceCreateObject) => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.post(`${API_URL}/devices`, device, headers );
        console.log(response.request)
        return response.data;
    } catch (error) {
        console.error('Error adding new device:', error);
        throw error;
    }
};


export const checkDoorPwdService = async (feedId: string, pwd: string) => {
    try {
        // const headers = await getAuthHeaders();
        // console.log(headers)
        console.log(feedId, pwd)
        // const respone = await axios.post(`${API_URL}/devices/${feedId}/checkpwd`, { pwd: pwd }, headers);
        // return respone;
    } catch(e) {
        console.log("Error: ", e);
        throw e;
    }   
}
