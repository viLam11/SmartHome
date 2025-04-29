import axios from 'axios';
import { getAuthHeaders } from './authService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
export const getSchedule = async ( feedId: string) => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get(`${API_URL}/schedules/${feedId}`, headers);
        console.log('Schedule fetched:', response.data);
        return response;
    } catch (error) {
        console.error('Error fetching room devices:', error);
        throw error;
    }
};

export const setSchedule = async ( payload: any) => {
    try {
        const headers = await getAuthHeaders();
        console.log("SET TIME: ", payload)
        const response = await axios.post(`${API_URL}/schedules`, payload, headers);
        console.log('Schedule created:', response);
        return response;
    } catch (error) {
        console.error('Error fetching room devices:', error);
        return error;
    }
};


export const deleteSchedule = async (scheduleId: number) => {
    try {
        const response = await axios.delete(`${API_URL}/schedules/${scheduleId}`);
        return response;
    } catch (error) {
        console.error('Error deleting device:', error);
        throw error;
    }   
}