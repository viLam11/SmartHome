import axios from 'axios';
import { miniLogObject } from '@/types/log.type';
import { getAuthHeaders } from './authService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
export const getDeviceLogService = async (feedId: string): Promise<miniLogObject[]> => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get(`${API_URL}/devices/${feedId}/logs`, headers);
        console.log("API: ", `${API_URL}/devices/${feedId}/logs`)
        console.log("HIST DATA: ", JSON.stringify(response.data, null, 2));  
        return response.data;
    } catch (error) {
        console.error('Error fetching statistic:', error);
        throw error;
    }
}

export const fetchHistory = async (feedId: string): Promise<miniLogObject[]> => {  
    try {
        console.log("API: ", `${API_URL}/logs/${feedId}/usage`) 
        const headers = await getAuthHeaders();
        const response = await axios.get(`${API_URL}/logs/${feedId}/usage`, headers);
        return response.data;
    } catch (error) {
        console.error('Error fetching history:', error);
        throw error;
    }
}   