import Navigation from '@/components/Navigation';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
const base_url = process.env.EXPO_PUBLIC_API_URL;

export default function Profile() {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const router = useRouter();
  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = await AsyncStorage.getItem("authToken");
      setToken(authToken);
    }
    fetchUserData();
  }, [])

  useEffect(() => {
    if (!token) return;
    const fetchUserData = async () => {
      const response = await axios.get(`${base_url}/profile`, {
        headers: {
          "Authorization": token
        }
      })
      console.log("### RESPONSE : ", response.data);
      setUserData(response.data);
    }
    fetchUserData();
  }, [token])

  async function hanldeLogout() {
    await AsyncStorage.removeItem("authToken");
    router.push('/(root)/auth/sign-in')
  }

  return (
    <View className="flex-1">
      <View className="flex-grow mx-2">
        <Text className="font-bold text-2xl p-2 mb-4">Profile</Text>
        <View className="flex justify-between items-center">
          <Image
              source={{ uri: `https://ui-avatars.com/api/?name=${userData ? userData.lastName + '+' + userData.firstName : 'John'}&background=random` }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
        </View>
        <Text className="text-center font-bold text-2xl p-2">{userData ? userData.lastName + " " + userData.firstName : ""}</Text>
        <Text className="text-center color-gray-500 text-medium ">{userData ? userData.email : ""}</Text>


        <View className="w-full my-auto">
          <View className="div-1 flex flex-col my-4">
            <View className="bg-white mx-2 p-4 shadow-transparent my-2 flex flex-row align-middle items-center border rounded-3xl">
              <TouchableOpacity className="flex flex-row" onPress={() => { router.push('/profile/notification') }}>
                <IconSymbol name="notification" />
                <Text className='text-black text-2xl font-semibold ml-4'>
                  Thông báo
                </Text>
              </TouchableOpacity>

            </View>
            <View className="my-2">
              <View className="bg-white mx-2 p-4 shadow-transparent my-2 flex flex-row align-middle items-center border rounded-3xl">
                <TouchableOpacity className="flex flex-row" onPress={() => { router.push('/profile/detail') }}>
                  <IconSymbol name="user" />
                  <Text className='text-black text-2xl font-semibold ml-4'>
                    Tài khoản
                  </Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>

          <View className="border mx-2 border-gray-300"></View>

          <View className="div-1 flex flex-col my-4">
            <View className="bg-white mx-2 p-4  shadow-transparent my-2 flex flex-row align-middle items-center border rounded-3xl">
              <IconSymbol name="support" />
              <Text className='text-black text-2xl font-semibold ml-4'>
                Hỗ trợ
              </Text>
             
            </View>
            <View className="my-2">
              <View className="bg-white mx-2 p-4 shadow-transparent my-2 flex flex-row align-middle items-center border rounded-3xl">
                <TouchableOpacity className='flex flex-row' onPress={hanldeLogout}>
                  <IconSymbol name="exit" />
                  <Text className='text-black text-2xl font-semibold ml-4'>
                    Đăng xuất
                  </Text>
                </TouchableOpacity>
                
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="bottom-0 h-20">
        <Navigation current={3} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});