import axios from 'axios';
import { endDateData, runningTime, runningTimeDeviceData, summaryStatisticData } from '@/constants/statistic';
import { runningTimeDeviceType, runningTimeOneDeviceType, summaryStatisticType } from '@/types/statistic.type';
import { getAuthHeaders } from './authService';
import { subDays } from 'date-fns';

export const getTotaltimeOneDeviceService = async (feedId: string, endDate: Date): Promise<{ total: number }> => {
    try {
        const headers = await getAuthHeaders();
        endDate = new Date(endDate.setHours(6, 59, 59, 999));
        const startDate = new Date(subDays(endDate, 7).setHours(7, 0, 0, 0));

        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/statistic/device/${feedId}/total`,
            {
                start: startDate.toISOString(),
                end: endDate ? endDate.toISOString() : new Date().toISOString(),
            },
            headers);
        return {total: parseFloat(response.data.total.toFixed(2)) };
    } catch (error) {
        console.error('Error fetching statistic:', error);
        throw error;
    }
}

export const getRunningTimeOneDeviceService = async (feedId: string, endDate: Date): Promise<runningTimeOneDeviceType> => {
    try {
        const headers = await getAuthHeaders();
        endDate = new Date(endDate.setHours(6, 59, 59, 999));
        const startDate = new Date(subDays(endDate, 7).setHours(7, 0, 0, 0));

        const response = await axios.post(
            `${process.env.EXPO_PUBLIC_API_URL}/statistic/device/${feedId}`,
            {
                start: startDate.toISOString(),
                end: endDate.toISOString(),
            },
            headers
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching statistic:', error);
        throw error;
    }
}

/////////////////////////////////////////// Summary Statistic ///////////////////////////////////////////
// totaltime
export const getDeviceKindTotaltimeService = async ( deviceType: string, endDate: Date): Promise<{ total: number }> => {
    try {
        const headers = await getAuthHeaders();
        endDate = new Date(endDate.setHours(6, 59, 59, 999));
        const startDate = new Date(subDays(endDate, 7).setHours(7, 0, 0, 0));
        if (deviceType === '-1') {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/statistic/type/total`,
                {
                    start: startDate.toISOString(),
                    end: endDate.toISOString(),
                },
                headers);
            return {total: parseFloat(response.data.total.toFixed(2)) };
        }
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/statistic/type/${deviceType}`,
            {
                start: startDate.toISOString(),
                end: endDate.toISOString(),
            },
            headers);
        return {total: parseFloat(response.data.total.toFixed(2)) };
    } catch (error) {
        console.error('Error fetching statistic:', error);
        throw error;
    }
}
// bar chart
export const getRunningTimeAllDeviceService = async (roomId: number, endDate: Date): Promise<runningTimeDeviceType> => {
    try {
        const headers = await getAuthHeaders();
        endDate = new Date(endDate.setHours(6, 59, 59, 999));
        const startDate = new Date(subDays(endDate, 7).setHours(7, 0, 0, 0));
        
        if (roomId === -1) {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/statistic/rooms`,
                {
                    start: startDate.toISOString(),
                    end: endDate.toISOString(),
                },
                headers);
            return response.data;
        }
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/statistic/rooms/${roomId}`, 
            {
                start: startDate.toISOString(),
                end: endDate.toISOString(),
            },
            headers);
        return response.data;
        // const response = runningTimeDeviceData;
        // return response;
    } catch (error) {
        console.error('Error fetching statistic:', error);
        throw error;
    }
}
// pie chart
export const getRoomsUptimeService = async (type: string, endDate: Date): Promise<summaryStatisticType> => {
    try {
        const headers = await getAuthHeaders();
        endDate = new Date(endDate.setHours(6, 59, 59, 999));
        const startDate = new Date(subDays(endDate, 7).setHours(7, 0, 0, 0));
        if (type === '-1') type = 'total';
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/statistic/graph/${type}`, 
            {
                start: startDate.toISOString(),
                end: endDate.toISOString(),
            },
            headers);
        // const response = summaryStatisticData;
        return response.data;
    } catch (error) {
        console.error('Error fetching statistic:', error);
        throw error;
    }
}