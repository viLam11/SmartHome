import React from 'react';
import { StyleSheet, View , Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import images from '@/constants/images';
import icons from '@/constants/icons';

export default function SignIn() {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    return (
        <SafeAreaView className='bg-white h-full'> 
            <ScrollView contentContainerClassName="h-full mx-2">
                <View className='mt-2 flex flex-row space-x-4 items-center '>
                    <Image source={images.logo} className="w-16 h-16 ml-6 "></Image>
                    <Text className='text-3xl font-rubik-bold ml-10'>Smart Home</Text>
                </View>
                <View className='mt-4'>
                   <Text className='text-xl font-bold'>Đăng nhập</Text>
                
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})
