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
            <ScrollView contentContainerClassName="h-full">
                <Image source={images.onboarding} className="w-full h-4/6" resizeMode='contain'></Image>

                <View className='px-10'>
                    <Text className='text-base text-center text--uppercase font-rubik text-black-100'>Welcome to ReState</Text>
                    <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
                        Let's Get You Close to  {"\n"}
                        <Text className='text-primary-300'>Your Ideal home</Text>
                    </Text>
                    <Text className='text=lg font-rubik text-black-200 text-center mt-12'>Login to ReState with Google</Text>

                    <TouchableOpacity onPress={() => {}} className='bg-white shadow-md shadow-zinc-300 w=full py-4 mt-5'>
                        <View className='flex flex-row items-center justify-center'>
                            <Image source={icons.google} className='w-5 h-5' resizeMode='contain'></Image>
                            <Text className='text-lg font-rubik-mediumt text-black-300 ml-2'>Continue with Google</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})
