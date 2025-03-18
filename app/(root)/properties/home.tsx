import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import icons from "@/constants/icons";
import Room from "@/components/Room";
import Navigation from "@/components/Navigation";
import images from "@/constants/images";
export default function HomeIndex() {
    const router = useRouter();
    const [roomNum, setRoomNum] = useState(2);  
    const [imgArray, setImgArray] = useState([images.home1, images.home3, images.home3, images.home4]);
    return(
        <ScrollView className="bg-background flex-grow min-h-screen">
            <View className="flex-grow mx-2">
                <View className="flex flex-row justify-between">
                    <Text className="text-2xl font-extrabold mb-4">My Rooms</Text>
                </View>

                {Array.from({ length: roomNum }).map((_, index) => (
                   <TouchableOpacity key={index} onPress={() => {router.push(`/properties/${index}`)}}>
                        <Room key={index} img={imgArray[index]} />
                   </TouchableOpacity>
                    
                ))}

                {/* View này giúp Navigation luôn ở cuối */}
                

                
            </View>
            <View className="flex-grow" >
                <Text></Text>
            </View>
            <Navigation current={1} />
        </ScrollView>
        
    )
}