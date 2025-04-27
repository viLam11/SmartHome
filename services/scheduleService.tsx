import axios from 'axios';
import { getAuthHeaders } from './authService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
export const getSchedule = async ( feedId: string) => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get(`${API_URL}/schedules/${feedId}`, headers);
        return response.data;
    } catch (error) {
        console.error('Error fetching room devices:', error);
        throw error;
    }
};

export const setSchedule = async ( payload: any) => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.post(`${API_URL}/schedules`, payload, headers);
        return response.data;
    } catch (error) {
        console.error('Error fetching room devices:', error);
        throw error;
    }
};