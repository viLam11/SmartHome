import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import Navigation from '@/components/Navigation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const base_url = 'https://nearby-colleen-quanghia-3bfec3a0.koyeb.app/api/v1'


export default function Detail() {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fectchToken = async () => {
            const token = await AsyncStorage.getItem('authToken')    
            if (token) setToken(token);
        }
        fectchToken()
    }, [])

    useEffect(() => {
        if (!token) return;
        const fetchUser = async () => { 
            try {
                const response = await axios.get(`${base_url}/profile`, { 
                    headers: {
                        Authorization: token
                    }
                } )
                console.log("User data: ", response.data);
                setUserData(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    }, [token])
    
    return(
        <ScrollView className="min-h-screen bg-white">
            <View className="min-h-screen w-11/12 mx-auto">
                <View className="flex flex-row my-4 mb">
                    <TouchableOpacity onPress={() => router.back()} className="mr-4">
                        <IconSymbol name="back" />  
                    </TouchableOpacity>
                    <Text className="text-xl font-bold">Tài khoản</Text>
                </View>
                {/* Detail  */}
                <View>
                    <Text className="text-2xl font-bold ">Thông tin cá nhân</Text>
                    <View>
                        <Text>{ userData ? (userData.lastName + " " + userData.firstName) : "" }</Text>
                    </View>
                    <View>
                        <Text>{userData ? userData.email :"" }</Text>
                    </View>
                    <View>
                        <Text>{userData ? userData.phone : ""}</Text>
                    </View>
                </View>
               
            </View>
            <View className=" absolute h-24 bottom-0 w-full">
                    <Navigation current={3} />
                </View>
        </ScrollView>
    )
}
