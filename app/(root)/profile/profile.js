import Navigation from '@/components/Navigation';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';


export default function Profile() {
  const [token, setToken] = 

  return (
    <View className="flex-1">
      <View className="flex-grow mx-2">
        <Text className="font-bold text-2xl p-2 mb-4">Profile</Text>
        <View className="flex justify-between items-center">
          <Image className='w-40 h-40 bg-red-100' source={{ uri: 'https://ui-avatars.com/api/?name=John' }} />
        </View>
        <Text className="text-center font-bold text-2xl p-2">Name</Text>
        <Text className="text-center color-gray-500 text-medium ">ngoc@gmail.com</Text>


        <View className="w-full my-auto">
          <View className="div-1 flex flex-col my-4">
            <View className="bg-white mx-2 p-4 rounded-xl shadow-transparent my-2 flex flex-row align-middle items-center ">
              <IconSymbol name="notification" />
              <Text className='text-black text-2xl font-semibold ml-4'>
                Thông báo
              </Text>
            </View>
            <View className="my-2">
              <View className="bg-white mx-2 p-4 rounded-xl shadow-transparent my-2 flex flex-row align-middle items-center ">
                <IconSymbol name="user" />
                <Text className='text-black text-2xl font-semibold ml-4'>
                  Tài khoản
                </Text>
              </View>
            </View>
          </View>

          <View className="border mx-2 border-gray-300"></View>

          <View className="div-1 flex flex-col my-4">
            <View className="bg-white mx-2 p-4 rounded-xl shadow-transparent my-2 flex flex-row align-middle items-center ">
              <IconSymbol name="support" />
              <Text className='text-black text-2xl font-semibold ml-4'>
                Hỗ trợ
              </Text>
            </View>
            <View className="my-2">
              <View className="bg-white mx-2 p-4 rounded-xl shadow-transparent my-2 flex flex-row align-middle items-center ">
                <IconSymbol name="exit" />
                <Text className='text-black text-2xl font-semibold ml-4'>
                  Đăng xuất
                </Text>
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