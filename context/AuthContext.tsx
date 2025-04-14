import React from "react";
import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://nearby-colleen-quanghia-3bfec3a0.koyeb.app/api/v1";

interface AuthProps {
    authState : {
        token: string | null;
        isAuthenticated: boolean | null;
    };
    onRegister? : (
        email: string,
        password: string
    ) => Promise<any>;
    onLogout? : () => Promise<void>;
    onLogin? : (
        email: string,
        password: string
    ) => Promise<any>;  
    isLoading: boolean;
}

const AuthContext = createContext<AuthProps>({
    isLoading: true,
    authState: {
        token: null,
        isAuthenticated: null,
    }
});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        isAuthenticated: boolean | null;
    }>({
        token: null,
        isAuthenticated: null,
    });
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const fetchToken = async () => {
            const token = await AsyncStorage.getItem("authToken");
            console.log("Token from AsyncStorage", token);  
            if (token) {
                setAuthState({
                    token: token,
                    isAuthenticated: true,
                })
                axios.defaults.headers.common['Authorization'] = `${token}`;
            } 
            setIsLoading(false);
            console.log("Auth state, loading: ", authState, isLoading);
        } 
        fetchToken();
    }, [])

    const register = async (email: string, password: string) => {
        try {
            return await axios.post(`${API_URL}/register`, {email, password});
        } catch (error) {
            return {
                error: true,
                msg: (error as any).response.data.message,
            }
        }
    }
    const login = async (email: string, password: string) => {
        try {
            const result =  await axios.post(`${API_URL}/login`, {email, password});
            console.log("Login successful" , result.data);
            setAuthState({
                token: result.data.token,   
                isAuthenticated: true,
            })
            await AsyncStorage.setItem("authToken", result.data.token);
            axios.defaults.headers.common['Authorization'] = `${result.data.token}`;
            await SecureStore.setItemAsync("authToken", result.data.token);
            return result;
        } catch (error) {
            return {
                error: true,
                msg: (error as any).response.data.message,
            }
        }
    }
    const logout = async () => {
        try {
            await AsyncStorage.removeItem("authToken");
            setAuthState({
                token: null,
                isAuthenticated: false,
            })
        } catch (error) {
            console.log("Logout failed", error);
        }
    }
    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState: authState,
        isLoading: isLoading,
    }

    return  <AuthContext.Provider value={value}>  {children} </AuthContext.Provider>;
}