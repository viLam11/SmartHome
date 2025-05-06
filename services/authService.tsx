import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotification } from '@/contexts/NotificationContext';
const API_URL = process.env.EXPO_PUBLIC_API_URL;
console.log(API_URL)

export const registerService = async (userData: { firstname: string, lastname: string, email: string, password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        const { token } = response.data;
        console.log("ket qua dang ky", response)
        await AsyncStorage.setItem('authToken', token);
        return response;
    } catch (error: any ) {        
        if (error.response.status == 400) {
            alert("Email đã tồn tại");
        }
        throw("Email đã tồn tại")
    }
};

export const signInService = async (credentials: { email: string, password: string }) => {
    console.log(API_URL)
    try {
        console.log("ket qua dang nhap", credentials)
        const response = await axios.post(`${API_URL}/login`, credentials);
        const { token } = response.data;
        
        // Lưu token vào AsyncStorage
        await AsyncStorage.setItem('authToken', token);
        console.log("ĐĂNG NHẬP THÀNH CÔNG")
        return response;
    } catch (error: any) {
        if (error.response.status == 400) {
            alert("Email hoặc mật khẩu không đúng");
        }
        throw("Email hoặc mật khẩu không đúng")
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

export const getAuthHeaders = async () => {
    const token = await getAuthToken();
    return {
        headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
        },
    };
};

export const signOutService = async () => {
    try {
        await AsyncStorage.removeItem('authToken');
    } catch (error) {
        console.error('Lỗi khi đăng xuất:', error);
    }
};

export const postDevicIP = async (token: string) => {
    try {
        console.log("TOKEN: ", token);  
        const header = await getAuthHeaders();
        console.log("Header: ", header);
        const response = await axios.post(`${API_URL}/noti-ip`, {
            "ip": token
        }, header);
        console.log("Token successfully posted to backend:", response.data);
        return response
    } catch (error) {
        console.error('Error posting token to backend:', error);
    }
}