import React from "react";
import { ScrollView, Text, View, Image, TouchableOpacity, Alert, Modal, KeyboardAvoidingView, Platform } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import Room from "@/components/Room";
import Navigation from "@/components/Navigation";
import { IconSymbol } from "@/components/ui/IconSymbol";
import NewRoomModal from "@/components/NewRoomModal";
import RoomImage from "@/components/RoomImage";
import { getAllRoomService } from "@/services/roomService";
import { RoomObject } from "@/types/room.type";
import images from "@/constants/images";
import { useLoading } from "@/contexts/LoadingContext";
import { getRoomDevices } from "@/services/deviceService";
import { calculateActiveDevice } from "@/components/CaculateData";
import { deviceActiveWColorType } from "@/types/statistic.type";


export default function HomeIndex() {
    const router = useRouter();
    const { setLoading } = useLoading();
    // const [roomNum, setRoomNum] = useState(1);
    // const [imgArray, setImgArray] = useState([images.home1, images.home3, images.home3, images.home4]);
    const [modal, setModal] = useState(false);
    const [imageMode, setImageMode] = useState(false);
    // Room data
    const [allRoomData, setAllRoomData] = useState<RoomObject[]>([]);
    const [deleteMode, setDeleteMode] = useState(false);
    const [newRoomName, setNewRoomName] = useState('');
    const [count, setCount] = useState(0);
    
    const [deviceActive, setDeviceActive] = useState<deviceActiveWColorType[]>([]);
    // function handleDeleteMode() {
    //     setCount(count + 1);
    //     setDeleteMode(!deleteMode);
    // }

    useEffect(() => {
        const fetchRoomData = async () => {
            // setLoading(true);
            try {
                const response = await getAllRoomService();
                if (!response) throw new Error("Failed to fetch image");
                setAllRoomData(response);
              
                const deviceActiveData = await getRoomDevices("4");
                setDeviceActive(calculateActiveDevice(deviceActiveData));
            } catch (error) {
              console.error("Error fetching room data:", error);
            } finally {
            //   setLoading(false);
            }
          };
        fetchRoomData();
    }, [count]);

    const calculateDeviceNumber = (room: RoomObject) => {
        return (room.fanCount ?? 0) + (room.lightCount ?? 0) + (room.sensorCount ?? 0) + (room.doorCount ?? 0);
    }

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View className="flex-1">
                <ScrollView className='flex flex-col'>
                    {modal || imageMode ? <View className="absolute top-0 left-0 z-10 w-full h-full bg-black/50" /> : <></>}

                    <View className={`m-2 ${modal ? 'min-h-screen' : ' min-h-screen'}`}>

                        <View className="flex-grow mx-2">
                            <View className="flex flex-row justify-between">
                                <Text className="text-2xl font-extrabold mb-4">My Rooms</Text>
                                <View className="flex flex-row space-x-2">
                                    {deleteMode ?
                                        <View>
                                            <TouchableOpacity className="bg-black rounded-full p-1" onPress={() => setDeleteMode(false)}>
                                                <IconSymbol name="save" size={18} color="white" />
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <> <View className="mr-2">
                                            <TouchableOpacity className="bg-black rounded-full" onPress={() => setModal(!modal)}>
                                                <IconSymbol name="add" color="white" />
                                            </TouchableOpacity>
                                        </View>
                                            <View>
                                                <TouchableOpacity className="bg-black rounded-full p-1" onPress={() => setDeleteMode(!deleteMode)}>
                                                    <IconSymbol name="edit" size={18} color="white" />
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                    }
                                </View>
                            </View>
                       
                            {allRoomData && allRoomData.map((room, index) => (
                                <View>
                                    <TouchableOpacity key={index} onPress={() => { router.push(`/rooms/${room.id}`) }}>
                                        <Room key={index} deleteMode={deleteMode} setDeleteMode={setDeleteMode} id={room.id} img={images.home1} title={room.title} allDeviceCount={calculateDeviceNumber(room)} lightCount={room.lightCount} lightStatus={room.lightStatus} fanCount={room.fanCount} fanStatus={room.fanStatus} sensorCount={room.sensorCount} sensorStatus={room.sensorStatus} doorCount={room.doorCount} doorStatus={room.doorStatus} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>

                    </View>
                </ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal || imageMode}
                    onRequestClose={() => {
                        setModal(false);
                        setImageMode(false);
                    }}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={{ flex: 1, justifyContent: 'flex-end' }}
                    >
                        {imageMode ?
                            <View className="bg-white h-1/2 w-full bottom-0 z-20 rounded-s-3xl">
                                <RoomImage count={count} setCount={setCount} roomData={allRoomData} setRoomData={setAllRoomData}  setImageMode={setImageMode} newRoomName={newRoomName}  setModal={setModal} />
                            </View>
                            :
                            <View className="bg-white h-1/3 w-full bottom-0 z-20 rounded-s-3xl">
                                <NewRoomModal setModal={setModal} newRoomName={newRoomName} setNewRoomName={setNewRoomName} setImageMode={setImageMode} />
                            </View>
                        }
                    </KeyboardAvoidingView>
                </Modal>
                
                <View className="absolute w-full bottom-2">
                    <Navigation current={2} />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}