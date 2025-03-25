import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "https://nearby-colleen-quanghia-3bfec3a0.koyeb.app/api/v1";

export const registerService = async (userData: { firstname: string, lastname: string, email: string, password: string }) => {
    try {
        console.log(userData);
        const response = await axios.post(`${API_URL}/register`, userData);
        const { token } = response.data;
        await AsyncStorage.setItem('authToken', token);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi đăng ký:', error);
        throw error;
    }
};

export const signInService = async (credentials: { email: string, password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        const { token } = response.data;
        
        // Lưu token vào AsyncStorage
        await AsyncStorage.setItem('authToken', token);

        return response.data;
    } catch (error) {
        console.error('Lỗi khi đăng nhập:', error);
        throw error;
    }
};

export const getAuthToken = async () => {
    try {
        return await AsyncStorage.getItem('authToken');
    } catch (error) {
        console.error('Lỗi khi lấy token:', error);
        return null;
    }
};

export const signOutService = async () => {
    try {
        await AsyncStorage.removeItem('authToken');
    } catch (error) {
        console.error('Lỗi khi đăng xuất:', error);
    }
};
