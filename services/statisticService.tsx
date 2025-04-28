import axios from 'axios';
import { runningTime, runningTimeDeviceType, summaryStatisticData } from '@/constants/statistic';
import { runningTimeDeviceTypeObjects, runningTimeObjects, summaryStatisticObjects } from '@/types/statistic.type';
import { getAuthHeaders } from './authService';

export const getStatisticService = async (feedId: string, endDate: Date | null): Promise<runningTimeObjects> => {
    try {
        // const headers = await getAuthHeaders();
        // const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/logs/${feedId}/`, headers);
        const response = runningTime;
        return response;
    } catch (error) {
        console.error('Error fetching statistic:', error);
        throw error;
    }
}


export const getSummaryDeviceStatisticService = async (room: string, type: string, endDate: Date | null): Promise<runningTimeDeviceTypeObjects> => {
    try {
        // const headers = await getAuthHeaders();
        // const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/statistic`, headers);
        const response = runningTimeDeviceType;
        return response;
    } catch (error) {
        console.error('Error fetching statistic:', error);
        throw error;
    }
}

export const getSummaryStatisticService = async (): Promise<summaryStatisticObjects> => {
    try {
        // const headers = await getAuthHeaders();
        // const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/statistic`, headers);
        const response = summaryStatisticData;
        return response;
    } catch (error) {
        console.error('Error fetching statistic:', error);
        throw error;
    }
}