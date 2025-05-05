import React from "react";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";
import axios from 'axios'
import NotiCard from "../../../components/NotiCard";
import { useRouter, useSearchParams } from "expo-router";
import { getNotifications } from '@/services/notiService';

import AsyncStorage from "@react-native-async-storage/async-storage";
import Navigation from "@/components/Navigation";

const base_url = process.env.EXPO_PUBLIC_API_URL;

export default function Notification() {
    const router = useRouter()
    const [notis, setNotis] = useState([])  

    useEffect(() => {
        const fetchNoti = async () => {
            const response = await getNotifications()
            console.log(response.data)
            setNotis(response.data)
        }
        fetchNoti()
    }, [])


    return (
        <View className="flex-1 bg-white"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView  className="flex-grow w-11/12 mx-auto ">
                <View className="flex flex-row my-4 items-center">
                    <TouchableOpacity onPress={() => router.back()} className="mr-4">
                        <IconSymbol name="back" color="black" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold">Tài khoản</Text>
                </View>
                <View>
                    <Text className="text-3xl font-bold">Thông báo</Text>

                    <FlatList
                        data={notis}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <NotiCard
                                key={index}
                                time={item.createdAt}
                                message={item.message}
                            />
                        )}
                    />

                </View>
            </ScrollView>
            <View className="h-20">
                <Navigation current={3} />
            </View>
        </View>
    )
}