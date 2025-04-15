import React from "react";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";
import axios from 'axios'
import NotiCard from "../../../components/NotiCard";
import { useRouter, useSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const base_url = 'https://nearby-colleen-quanghia-3bfec3a0.koyeb.app/api/v1'

export default function Notification() {
    const router = useRouter()
    const [token, setToken] = useState(null)
    const [pass, setPass] = useState(null)

    useEffect(() => {
        const fetchToken = async () => {
            const token = await AsyncStorage.getItem("authToken")
            setToken(token)
        }
        fetchToken()
    }, [])


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View className="min-h-screen w-11/12 mx-auto">
                <View className="flex flex-row my-4 items-center">
                    <TouchableOpacity onPress={() => router.back()} className="mr-4">
                        <IconSymbol name="back" color="black" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold">Tài khoản</Text>
                </View>
                <View>
                    <Text className="text-3xl font-bold">Thông báo</Text>

                    <FlatList
                        data={Array.from({ length: 50 })}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <NotiCard
                                key={index}
                                time="12:00 12/04/2021"
                                message="Thông báo mẫu"
                            />
                        )}
                    />

                </View>
            </View>


        </KeyboardAvoidingView>
    )
}