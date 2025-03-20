import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import icons from "@/constants/icons";
import Room from "@/components/Room";
import Navigation from "@/components/Navigation";
import images from "@/constants/images";
export default function HomeIndex() {
    const router = useRouter();
    const [roomNum, setRoomNum] = useState(4);
    const [imgArray, setImgArray] = useState([images.home1, images.home3, images.home3, images.home4]);
    return (

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='min-h-screen flex flex-col m-2'>
                <View className="flex-grow mx-2">
                    <View className="flex flex-row justify-between">
                        <Text className="text-2xl font-extrabold mb-4">My Rooms</Text>
                    </View>

                    {Array.from({ length: roomNum }).map((_, index) => (
                        <TouchableOpacity key={index} onPress={() => { router.push(`/properties/${index}`) }}>
                            <Room key={index} img={imgArray[index]} />
                        </TouchableOpacity>

                    ))}
                </View>

                <View className="h-32">
                    <View className=" bottom-2 w-full">
                        <Navigation current={2} />
                    </View>
                </View>
            </ScrollView>


    )
}