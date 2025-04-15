import axios from 'axios';
import { miniLogObject } from '@/types/log.type';
import { getAuthToken } from './authService';


const getAuthHeaders = async () => {
    const token = await getAuthToken();
    return {
        headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
        },
    };
};

export const getDeviceLogService = async (feedId: string): Promise<miniLogObject[]> => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/devices/${feedId}/logs`, headers);
        return response.data;
    } catch (error) {
        console.error('Error fetching statistic:', error);
        throw error;
    }
}