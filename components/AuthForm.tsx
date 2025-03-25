import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter, Link } from 'expo-router';
import images from '@/constants/images';
import { signInService, registerService } from '@/services/authService';

export default function AuthForm({ type }: { type: 'sign-in' | 'register' }) {
    const isSignIn = type === 'sign-in';
    const router = useRouter();

    // State cho form
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Xử lý đăng nhập & đăng ký
    const handleAuth = async () => {
        if (!email || !password || (!isSignIn && !firstName && !lastName)) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }

        setLoading(true);
        try {
            if (isSignIn) {
                const response = await signInService({ email, password });
                setTimeout(() => {
                    router.replace('/rooms/home');
                }, 3000);
            } else {
                const response = await registerService({ FirstName: firstName, LastName: lastName, email, password });
                Alert.alert('Thành công', 'Đăng ký thành công');
                setTimeout(() => {
                    router.replace('/rooms/home');
                }, 3000);
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Đăng nhập hoặc đăng ký thất bại');
        }
        setLoading(false);
    };

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerClassName="h-full mx-2 items-center">
                <View className="mt-2 flex flex-row space-x-4 items-center">
                    <Image source={images.logo} className="w-1/3 h-auto" resizeMode="contain" />
                    <Text className="text-3xl font-bold flex-1 text-center">Smart Home</Text>
                </View>

                <Text className="text-xl font-bold text-center mt-10">{isSignIn ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'}</Text>

                <View className="mt-4 w-5/6">
                    {!isSignIn && (<>
                            <TextInput
                                placeholder="FirstName"
                                className="border border-gray-300 p-3 rounded-lg"
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                            <TextInput
                                placeholder="LastName"
                                className="border border-gray-300 p-3 rounded-lg"
                                value={lastName}
                                onChangeText={setLastName}
                            />                    
                        </>
                    )}
                    <TextInput
                        placeholder="Email"
                        className="border border-gray-300 p-3 rounded-lg"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        placeholder="Mật khẩu"
                        className="border border-gray-300 p-3 rounded-lg"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <View className="w-3/6 mt-4 justify-center items-center">
                    <TouchableOpacity onPress={handleAuth} disabled={loading}>
                        <View className="w-48 bg-orange-500 p-3 rounded-lg flex items-center">
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text className="text-center font-bold text-white">{isSignIn ? 'LOGIN' : 'REGISTER'}</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="flex flex-row items-center my-4 w-5/6">
                    <View className="flex-1 h-[1px] bg-gray-300" />
                    <Text className="mx-2 text-gray-500">OR</Text>
                    <View className="flex-1 h-[1px] bg-gray-300" />
                </View>

                {[
                    { name: 'google', color: 'red', text: 'Sign Up with Google' },
                    { name: 'apple', color: 'black', text: 'Sign Up with Apple' }
                ].map(({ name, color, text }) => (
                    <TouchableOpacity key={name} className="flex flex-row w-5/6 items-center justify-center border border-gray-300 p-3 rounded-lg mt-2">
                        <FontAwesome name={name} size={20} color={color} />
                        <Text className="ml-2 font-medium">{text}</Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity className="mt-6">
                    <Text className="text-center font-bold text-gray-500">CONTINUE AS A GUEST</Text>
                </TouchableOpacity>

                <View className="flex flex-row justify-center items-center my-4">
                    <Text className="text-gray-500">{isSignIn ? 'New here?' : 'Already have an account?'}</Text>
                    <Link href={isSignIn ? '/auth/register' : '/auth/sign-in'} className="ml-2 bg-red-500 p-3 rounded-lg">
                        <Text className="font-medium text-white">{isSignIn ? 'Register' : 'Sign In'}</Text>
                    </Link>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
