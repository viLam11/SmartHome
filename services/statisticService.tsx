import axios, { all } from 'axios';
import { endDateData, runningTime, runningTimeDeviceData, summaryStatisticData } from '@/constants/statistic';
import { runningTimeDeviceType, runningTimeOneDeviceType, summaryStatisticType } from '@/types/statistic.type';
import { getAuthHeaders } from './authService';
import { subDays } from 'date-fns';
import { RoomObject } from '@/types/room.type';
import { room } from '@/constants/data';

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
            "start": startDate  ,
            "end": endDate  
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
        const headers = await getAuthHeaders(); 
        const response = await axios.post(`${base_url}/statistic/rooms`, {
            "start": startDate,
            "end": endDate
        }, headers);    

        // console.log("RESPONSE: ", response.data);

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

        return {
            light: lightData,
            fan: fanData    
        };
    } catch (error) {
        return error;
    }
};

export const getDeviceStat = async (deviceId: string, startDate: string, endDate: string) => {  
    try {
        const headers = await getAuthHeaders(); 
        const response = await axios.post(`${base_url}/statistic/device/${deviceId}`, {
            "start": startDate,
            "end": endDate
        }, headers);    

        let data = Object.entries(response.data).map(([key, value]) => {
            const [year, month, day] = key.split("-");
            return {
                label: `${day}/${month}`, // Định dạng dd/MM
                value: parseFloat(value.toFixed(2)), // Chuyển đổi thành số và làm tròn đến 2 chữ số thập phân
                dataPointText: parseFloat(value.toFixed(2)).toString(), 
                hidden: value == 0.0 ? true : false
            };
        })
        console.log("DEVICE DATA: ", data);
        return data;
    } catch (error) {
        return error;
    }
}

export const getTotalUseByRoomId = async ({roomId, startDate, endDate}: {roomId: string, startDate: string, endDate: string}) => {
    try {
        console.log("Start date: ", startDate); 
        console.log("End date: ", endDate);
        let newStartDate = new Date(startDate + "T00:01:00Z"); 
        const [lightTotal, fanTotal] = await Promise.all([ 
            axios.post(`${base_url}/statistic/rooms/${roomId}/light`, {
                "start": newStartDate,
                "end": endDate
            }),
            axios.post(`${base_url}/statistic/rooms/${roomId}/fan`, {
                "start": newStartDate,
                "end": endDate
            })
         ])
        return {
            lightSum: lightTotal.data.total,
            fanSum: fanTotal.data.total
        }
    } catch (error) {
        return error;
    }   
}

export const totalHome = async ({startDate, endDate}: {startDate: string, endDate: string}) => {
    try {
        const allRooms = await getAllRoom();    
        const roomIds = allRooms.map((room: RoomObject) => room.id);
        const totalUseByRoomIdPromises = roomIds.map((roomId: string) => {
            return getTotalUseByRoomId({roomId, startDate, endDate});
        });
        const totalUseByRoomIdResults = await Promise.all(totalUseByRoomIdPromises);
        let result = allRooms.map((room: any, index: number) => {  
            return {
                roomId: room.id,
                roomName: room.title,
                lightSum: totalUseByRoomIdResults[index].lightSum,
                fanSum: totalUseByRoomIdResults[index].fanSum
            }
         })
        console.log("TOTAL USE BY ROOM ID RESULTS: ", result);
        return result;
    } catch (error) {
        return error;
    }
}