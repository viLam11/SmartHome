import { getAuthHeaders } from './authService';
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;   

export const getNotifications = async () => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get(`${API_URL}/noti`, headers);
        console.log("NOTIFICATION: ", response.data)    
        return response;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }   
}