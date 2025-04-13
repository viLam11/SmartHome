import axios from 'axios';
import { runningTime } from '@/constants/statistic';
import { runningTimeObjects } from '@/types/statistic.type';
import { getAuthToken } from './authService';

export const getStatisticService = async (feedId: string, endDate: Date | null): Promise<runningTimeObjects> => {
    try {
        // const headers = await getAuthToken();
        // const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/statistic`, headers);
        const response = runningTime;
        return response;
    } catch (error) {
        console.error('Error fetching statistic:', error);
        throw error;
    }
}
