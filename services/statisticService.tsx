import axios from 'axios';
import { endDateData, runningTime, runningTimeDeviceData, summaryStatisticData } from '@/constants/statistic';
import { runningTimeDeviceType, runningTimeOneDeviceType, summaryStatisticType } from '@/types/statistic.type';
import { getAuthHeaders } from './authService';
import { subDays } from 'date-fns';

export const getStatisticService = async (feedId: string, endDate: Date | null): Promise<runningTimeOneDeviceType> => {
    try {
        const headers = await getAuthHeaders();
        endDate = endDate ? new Date(endDate.setUTCHours(23, 59, 59, 999)) : endDateData;
        const startDate = new Date(subDays(endDate, 6).setUTCHours(0, 0, 0, 0));
        console.log('startDate (UTC)', startDate.toISOString());
        console.log('endDate (UTC)', endDate.toISOString());

        const response = await axios.post(
            `${process.env.EXPO_PUBLIC_API_URL}/statistic/device/${feedId}`,
            {
                start: startDate.toISOString(),
                end: endDate ? endDate.toISOString() : new Date().toISOString(),
            },
            headers
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching statistic:', error);
        throw error;
    }
}

export const getSummaryDeviceStatisticService = async (roomId: string, endDate: Date | null): Promise<runningTimeDeviceType> => {
    try {
        const headers = await getAuthHeaders();
        // if (roomId === 'All') {
        //     const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/statistic/rooms`, headers);
        //     return response.data;
        // }
        // else {
        //     const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/statistic/room/${roomId}`, headers);
        //     return response.data;
        // }
        const response = runningTimeDeviceData;
        return response;
    } catch (error) {
        console.error('Error fetching statistic:', error);
        throw error;
    }
}

export const getDeviceKindUptimeService = async (roomId: string, deviceType: string, endDate: Date | null): Promise<{ total: number }> => {
    try {
        const headers = await getAuthHeaders();
        endDate = !endDate ? endDateData : new Date(endDate.setHours(23, 59, 59, 999));
        const startDate = new Date(subDays(endDate, 6).setHours(0, 0, 0, 0));

        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/statistic/rooms/${roomId}/${deviceType}`,
            {
                start: startDate.toISOString(),
                end: endDate ? endDate.toISOString() : new Date().toISOString(),
            },
            headers);
        return response.data;
    } catch (error) {
        console.error('Error fetching statistic:', error);
        throw error;
    }
}

export const getRoomsUptimeService = async (roomId: string, type: string, endDate: Date | null): Promise<summaryStatisticType> => {
    try {
        // const headers = await getAuthHeaders();
        // const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/statistic/rooms`, headers);
        const response = summaryStatisticData;
        console.log('response', response);
        return response;
    } catch (error) {
        console.error('Error fetching statistic:', error);
        throw error;
    }
}