import { ScrollView, Text, View, Image, TouchableOpacity, Alert, Modal, KeyboardAvoidingView, Platform } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
// import icons from "@/constants/icons";
import Room from "@/components/Room";
import Navigation from "@/components/Navigation";
// import images from "@/constants/images";
import { IconSymbol } from "@/components/ui/IconSymbol";
import NewRoomModal from "@/components/NewRoomModal";
import RoomImage from "@/components/RoomImage";
import { rooms } from "@/constants/data";
import axios from "axios";
import images from "@/constants/images";
import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";
// import {API_URL} from "@env";


export default function HomeIndex() {
    const base_url = 'https://nearby-colleen-quanghia-3bfec3a0.koyeb.app/api/v1';
    // const base_url = API_URL;
    const router = useRouter();
    // const [roomNum, setRoomNum] = useState(1);
    const [imgArray, setImgArray] = useState([images.home1, images.home3, images.home3, images.home4]);
    const [modal, setModal] = useState(false);
    const [imageMode, setImageMode] = useState(false);
    // Room data
    const [roomData, setRoomData] = useState([]);
    const [deleteMode, setDeleteMode] = useState(false);
    const [newRoomName, setNewRoomName] = useState('');
    const [reponse, setReponse] = useState('');
    const [count, setCount] = useState(0);
    const [token, setToken] = useState<string | null>(null);

    function handleDeleteMode() {
        setCount(count + 1);
        setDeleteMode(!deleteMode);
    }

    useEffect(() => {  
        console.log("fetching data");
        const fetchRoomData = async () => {
            const authToken = await AsyncStorage.getItem("authToken");
            setToken(authToken);
            const response = await axios.get(`https://nearby-colleen-quanghia-3bfec3a0.koyeb.app/api/v1/rooms`, {
                headers: {
                    "Authorization": authToken
                }
            })
            // if (!response) throw new Error("Failed to fetch image");
            console.log("### RESPONSE : ", response.data);   
            let x = response.data;
            let rooms = []
            rooms = x.map((room: {fanCount: number, lightCount: number, sensorCount: number, doorCount: number}) => ({
                ...room,  // Giữ nguyên dữ liệu cũ của room
                img: imgArray[Math.floor(Math.random() * imgArray.length)],   
                device: room.fanCount + room.lightCount + room.sensorCount + room.doorCount
            }));
            console.log("### DATA :" , rooms);
            let token = await AsyncStorage.getItem("authToken");
            console.log("Token: ", token);
            setRoomData(rooms);
        }
        fetchRoomData();
        

        // let interval = setInterval(() => {fetchRoomData()}, 10000); 
    }, [count]);
    


    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View className="min-h-screen">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='min-h-screen flex flex-col'>
                    {modal || imageMode ? <View className="absolute top-0 left-0 z-10 w-full h-full bg-black/50" /> : <></>}

                    <View className={`m-2 ${modal ? 'min-h-screen' : ' min-h-screen'}`}>
                        <View className="flex-grow mx-2">
                            <View className="flex flex-row justify-between">
                                <Text className="text-2xl font-extrabold mb-4">My Rooms</Text>
                                <View className="flex flex-row space-x-2">
                                    {deleteMode ?
                                        <View>
                                            <TouchableOpacity className="bg-black rounded-full p-1" onPress={() => handleDeleteMode()}>
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
                                                <TouchableOpacity className="bg-black rounded-full p-1" onPress={() => handleDeleteMode()}>
                                                    <IconSymbol name="edit" size={18} color="white" />
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                    }
                                </View>
                            </View>
                            {roomData && roomData.map((room : {id: number, img: string, title: string, device: number, lightCount: number, light_on: number, fanCount: number, fan_on: number, sensorCount: number, sensor_on: number}, index) => (
                                <View>
                                    <TouchableOpacity key={index} onPress={() => { router.push(`/rooms/${room.id}`) }}>
                                        <Room key={index} setRoomData={setRoomData} deleteMode={deleteMode} id={room.id} img={room.img} name={room.title} device={room.device} light={room.lightCount} light_on={room.light_on} fan={room.fanCount} fan_on={room.fan_on} sensor={room.sensorCount} sensor_on={room.sensor_on} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        <View className="h-32">
                            <View className=" w-full">
                                <Navigation current={2} />
                            </View>
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
                                <RoomImage count={count} setCount={setCount} roomData={roomData} setRoomData={setRoomData}  setImageMode={setImageMode} newRoomName={newRoomName}  setModal={setModal} />
                            </View>
                            :
                            <View className="bg-white h-1/3 w-full bottom-0 z-20 rounded-s-3xl">
                                <NewRoomModal setModal={setModal} newRoomName={newRoomName} setNewRoomName={setNewRoomName} setImageMode={setImageMode} />
                            </View>
                        }
                    </KeyboardAvoidingView>
                </Modal>
            </View>
        </KeyboardAvoidingView>
    )
}