import React from 'react';
import { StyleSheet, View , Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import images from '@/constants/images';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function SignIn() {
    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerClassName="h-full mx-2">
                <View className="mt-2 flex flex-row space-x-4 items-center">
                    <View className="w-1/3 h-auto">
                        <Image source={images.logo} className="w-full h-auto" resizeMode="contain" />
                    </View>
                    <View className='w-2/3 flex flex-row justify-center items-center'>
                        <Text className="text-3xl font-bold">Smart Home</Text>
                    </View>
                </View>
                <View className="flex flex-row items-center justify-center mt-10">
                    <Text className="text-xl font-bold">ĐĂNG KÝ</Text>
                </View>

                <View className="mt-4 space-y-3">
                    <TextInput
                        placeholder="Họ và tên"
                        className="border border-gray-300 p-3 rounded-lg"
                    />
                    <TextInput
                        placeholder="Email"
                        className="border border-gray-300 p-3 rounded-lg"
                        keyboardType="email-address"
                    />
                    <TextInput
                        placeholder="Mật khẩu"
                        className="border border-gray-300 p-3 rounded-lg"
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity className="mt-4 bg-orange-500 border border-gray-300 p-3 rounded-lg">
                    <Text className="text-center font-bold text-white">LOGIN</Text>
                </TouchableOpacity>

                <View className="flex flex-row items-center my-4">
                    <View className="flex-1 h-[1px] bg-gray-300" />
                    <Text className="mx-2 text-gray-500">OR</Text>
                    <View className="flex-1 h-[1px] bg-gray-300" />
                </View>

                <TouchableOpacity className="flex flex-row items-center justify-center border border-gray-300 p-3 rounded-lg">
                    <FontAwesome name="google" size={20} color="red" />
                    <Text className="ml-2 font-medium">Sign Up with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex flex-row items-center justify-center border border-gray-300 p-3 rounded-lg mt-2">
                    <FontAwesome name="apple" size={20} color="black" />
                    <Text className="ml-2 font-medium">Sign Up with Apple</Text>
                </TouchableOpacity>

                <TouchableOpacity className="mt-6">
                    <Text className="text-center font-bold text-gray-500">CONTINUE AS A GUEST</Text>
                </TouchableOpacity>

                <View className="flex flex-row items-center my-4">
                    <Link href="/auth/sign-in">
                        <TouchableOpacity className="p-3 rounded-lg">
                            <Text className="mx-2 text-gray-500">Already have an account?</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}