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
        console.log("API: ", `${API_URL}/devices/${feedId}` )
        console.log("HEADERS: ", headers)   
        const response = await axios.get(`${API_URL}/devices/${feedId}`, headers);
        console.log("Device data:" , response.data);    
        return response.data;
    } catch (error) {
        console.error('Error fetching device data:', error);
        throw error;
    }
};

export const controlDevice = async (feedId: string, value: string) => {
    try {
        const headers = await getAuthHeaders();
        console.log("Headers: ", headers);
        console.log("Control device: ", feedId, value);
        const response = await axios.post(`${API_URL}/devices/${feedId}`, { 
            value: value    
         }, headers);
        return response.data;
    } catch (error) {
        console.error('Error controlling device:', error);
        throw error;
    }
};

export const addNewDeviceService = async (device: deviceCreateObject) => {
    console.log("ADD NEW DEVICE: ", device);
    try {
        const headers = await getAuthHeaders();
        console.log("Headers: ", headers); 
        const response = await axios.post(`${API_URL}/devices`, device, headers );
        console.log("RESPONSE: ", response.status)
        return response;
    } catch (error) {
        console.error('Error adding new device:', error);
        return error;
    }
};

export const deleteDevice = async (deviceId: number) => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.delete(`${API_URL}/devices/${deviceId}`, headers);
        return response;
    } catch (error) {
        console.error('Error deleting device:', error);
        throw error;
    }
}


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

export const fetchSensorData = async (feedId: number) => {
    try {
        const response = await axios.get(`${API_URL}/sensors/${feedId}`);
        return response;
    } catch (error) {
        console.error('Error fetching sensor data:', error);
        return error;
    }
}