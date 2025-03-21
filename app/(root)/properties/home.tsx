import { ScrollView, Text, View, Image, TouchableOpacity, Alert, Modal } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import icons from "@/constants/icons";
import Room from "@/components/Room";
import Navigation from "@/components/Navigation";
import images from "@/constants/images";
import { IconSymbol } from "@/components/ui/IconSymbol";
import NewRoomModal from "@/components/NewRoomModal";
import RoomImage from "@/components/RoomImage";


export default function HomeIndex() {
    const router = useRouter();
    const [roomNum, setRoomNum] = useState(1);
    const [imgArray, setImgArray] = useState([images.home1, images.home3, images.home3, images.home4]);
    const [modal, setModal] = useState(false);
    const [imageMode, setImageMode] = useState(false);  

    function hanldeAddNewRoom() {
        // alert(`change to ${!modal}`)
        setModal(!modal);
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='min-h-screen flex flex-col'>
            {modal || imageMode ? <View className="absolute top-0 left-0 z-10 w-full h-full bg-black/50" /> : <></>}
            
            <View className={`m-2 ${modal ? 'min-h-screen' : ' min-h-screen'}`}>
                <View className="flex-grow mx-2">
                    <View className="flex flex-row justify-between">
                        <Text className="text-2xl font-extrabold mb-4">My Rooms</Text>
                        <View>
                            <TouchableOpacity className="bg-black rounded-full" onPress={() => hanldeAddNewRoom()}>
                               <IconSymbol name="add" color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {Array.from({ length: roomNum }).map((_, index) => (
                        <TouchableOpacity key={index} onPress={() => { router.push(`/properties/${index}`) }}>
                            <Room key={index} img={imgArray[index]} />
                        </TouchableOpacity>

                    ))}
                </View>
                <View className="h-32">
                    <View className="bottom-10 w-full">
                        <Navigation current={2} />
                    </View>
                </View>
            </View>
            {imageMode ?
            <View className={`bg-white h-2/3 w-full bottom-0 z-20 rounded-s-3xl ${modal ? 'absolute' : 'hidden'}`}>
                <RoomImage setImageMode={setImageMode} setModal={setModal} />
            </View>
            : 
            <View className={`bg-white h-3/5 w-full bottom-0 z-20 rounded-s-3xl ${modal ? 'absolute' : 'hidden'}`}>
                <NewRoomModal setModal={setModal}  setImageMode={setImageMode} />
            </View>
            }
            

        </ScrollView>


    )
}