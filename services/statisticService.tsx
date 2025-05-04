import axios, { all } from 'axios';
import { endDateData, runningTime, runningTimeDeviceData, summaryStatisticData } from '@/constants/statistic';
import { runningTimeDeviceType, runningTimeOneDeviceType, summaryStatisticType } from '@/types/statistic.type';
import { getAuthHeaders } from './authService';
import { subDays } from 'date-fns';
import { RoomObject } from '@/types/room.type';

const base_url = process.env.EXPO_PUBLIC_API_URL;

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


export const getAllRoom  = async () => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/rooms`, headers);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getRoomStatis = async (roomId: string, startDate: string, endDate: string) => {
    try {
        const response = await axios.post(`${base_url}/statistic/rooms/${roomId}`, {
            "start": "2025-04-20T00:00:00Z",
            "end": "2025-05-03T23:59:59Z"
        })
        let lightData = response.data.light;
        lightData = Object.entries(lightData).map(([key, value]) => {
            const [year, month, day] = key.split("-");
            return {
                label: `${day}/${month}`, // Định dạng dd/MM
                value: parseFloat(value.toFixed(2)), // Chuyển đổi thành số và làm tròn đến 2 chữ số thập phân
                dataPointText: parseFloat(value.toFixed(2)).toString(), 
                hidden: value == 0.0 ? true : false
            };
        })

        let fanData = response.data.fan;
        fanData = Object.entries(fanData).map(([key, value]) => {   
            const [year, month, day] = key.split("-");
            return {
                label: `${day}/${month}`, // Định dạng dd/MM
                value: parseFloat(value.toFixed(2)), // Chuyển đổi thành số và làm tròn đến 2 chữ số thập phân
                dataPointText: parseFloat(value.toFixed(2)).toString(), 
                hidden: value == 0.0 ? true : false
            };  
        })

        // console.log("ROOM ", roomId);
        // console.log("LIGHT DATA: ", lightData); 
        // console.log("FAN DATA: ", fanData); 
        return {
            light: lightData,
            fan: fanData
        }
    } catch (error) {
        throw error;
    }
}

export const getAllRoomStat = async (startDate: string, endDate: string) => {
    try {
        const allRoom = await getAllRoom();
        // console.log("ALL ROOM: ", allRoom); 
        const allAPIs = allRoom.map((room: any) => getRoomStatis(room.id, startDate, endDate)); // gọi ngay
        const responses = await Promise.all(allAPIs); // đợi tất cả hoàn thành

        // console.log(JSON.stringify(responses, null, 2));

        const lightMap: { [label: string]: number[] } = {};
        const fanMap: { [label: string]: number[] } = {};

        responses.forEach((response: any) => {
            response.light.forEach((item: any) => {
                if (!lightMap[item.label]) lightMap[item.label] = [];
                lightMap[item.label].push(item.value);
            });

            response.fan.forEach((item: any) => {
                if (!fanMap[item.label]) fanMap[item.label] = [];
                fanMap[item.label].push(item.value);
            });
        });
        const calcSum = (map: { [label: string]: number[] }) => {
            return Object.entries(map).map(([label, values]) => {
                const sum = values.reduce((acc, val) => acc + val, 0);
                
                return {
                    label: label,
                    value: sum,
                    dataPointText: sum.toString(),
                    dataPointTextColor: "black",
                    hidden: sum === 0.0
                };
            });
        };

        const sumLight = calcSum(lightMap);
        const sumFan = calcSum(fanMap);

        return {
            light: sumLight,
            fan: sumFan
        };
    } catch (error) {
        return error;
    }
};
