import axios from 'axios';
import { RoomObject } from '../types/room.type';
import { getAuthHeaders } from './authService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getAllRoomService = async (): Promise<RoomObject[]> => {
    try {
        const headers = await getAuthHeaders();
        // console.log(headers)
        const response = await axios.get(`${API_URL}/rooms`, headers);
        return response?.data;
    } catch (error) {
        console.error('Error fetching room devices:', error);
        throw error;
    }
};

export const addNewRoomService = async ({title} : {title: string}) => {
    if (!title) {
        throw new Error("Room name is required");
    }

    try {
        const headers = await getAuthHeaders();
        const response = await axios.post(
            `${API_URL}/rooms`,
            { title: title }, 
            headers
        );
        return response.data;
    } catch (error) {
        console.error("Error adding new room:", error);
        throw error;
    }
};

export const deleteRoomService = async (roomId: string) => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.delete(`${API_URL}/rooms/${roomId}`, headers);
        return response.data;
    } catch (error) {
        console.error("Error deleting room:", error);
        throw error;
    }
};

export const updateRoomService = async (roomId: string, title: string) => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.put(`${API_URL}/rooms/${roomId}`, { title }, headers);
        return response.data;
    } catch (error) {
        console.error("Error updating room:", error);
        throw error;
    }
};