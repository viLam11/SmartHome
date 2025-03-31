import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';
import images from '@/constants/images';
import { addNewRoomService } from '@/services/roomService';

interface RoomImageProps {
    count: number;
    setCount: (count: number) => void;
    setImageMode: (mode: boolean) => void;
    setModal: (modal: boolean) => void;
    newRoomName: string;
}

export default function RoomImage({ count, setCount, setImageMode, setModal, newRoomName }: RoomImageProps) {
    const [imgNo, setImgNo] = useState<number | null>(null);
import axios from 'axios';

const base_url = 'https://nearby-colleen-quanghia-3bfec3a0.koyeb.app/api/v1';

export default function RoomImage({ count, setCount, roomData, setRoomData, newRoomName, setImageMode, setModal }) {
    const [img, setImage] = useState(images.home1);
    const [imgNo, setImgNo] = useState(-1);

    function handleSelectImage(num: number) {
        setImgNo(prev => (prev === num ? null : num));
    }

    function addNewRoom() {
        console.log("adding new room...: ", newRoomName)
        if (!newRoomName) {
            alert("Please enter room name");
            return;
        }
        let newRoom = {
            "title": newRoomName
        }
        console.log("### New room: ", newRoom);
        const response = axios.post(`${base_url}/rooms`, newRoom, {
            headers: {
                "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVkQXQiOjE3NDM0ODE5NDksInVzZXJJRCI6IjEifQ.7p08PVx626gl4dmeRDWa8KO9K_RDm8sN66AQQMvs4DQ"
            }
        })
        console.log("### Response add new room: ", response);
        setModal(false);
        setImageMode(false);
        setCount(count + 1);
    }

    return (
        <View className="w-full h-full">
            {/* Đóng modal */}
            <View className="flex items-end m-4">
                <TouchableOpacity onPress={() => setImageMode(false)} className="bg-black rounded-full">
                    <IconSymbol name="close" color="white" />
                </TouchableOpacity>
            </View>

            <View className='w-11/12 mx-auto bottom-2 flex-grow'>
                <View >
                    <View className="flex flex-row justify-between">
                        <View className='mb-2'>
                            <TouchableOpacity onPress={() => hanldeSelectImage(1)}>
                                <Image source={images.home1} style={{ width: 150, height: 70 }} resizeMode='contain' className={imgNo == 1 ? 'opacity-60 rounded-md bg-black-100' : ''}></Image>
                                {imgNo == 1 ?
                                    <View className="absolute bg-white rounded-full bottom-3 right-2">
                                        <IconSymbol name="checkmark" color="black" />
                                    </View>
                                    : null
                                }
                            </TouchableOpacity>
                        </View>
                        <View className='mb-2'>
                            <TouchableOpacity onPress={() => hanldeSelectImage(2)}>
                                <Image source={images.home2} style={{ width: 150, height: 70, borderRadius: 10 }} className={imgNo == 2 ? 'opacity-60 rounded-md bg-black-100' : ''}></Image>
                                {imgNo == 2 ?
                                    <View className="absolute bg-white rounded-full bottom-3 right-2">
                                        <IconSymbol name="checkmark" color="black" />
                                    </View>
                                    : null
                                }
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="flex flex-row justify-between">
                        <View className='mb-2'>
                            <TouchableOpacity onPress={() => hanldeSelectImage(3)}>
                                <Image source={images.home3} style={{ width: 150, height: 70 }} resizeMode='contain' className={imgNo == 3 ? 'opacity-60 rounded-md bg-black-100' : ''}></Image>
                                {imgNo == 3 ?
                                    <View className="absolute bg-white rounded-full bottom-3 right-2">
                                        <IconSymbol name="checkmark" color="black" />
                                    </View>
                                    : null
                                }
                            </TouchableOpacity>
                        </View>
                        <View className='mb-2'>
                            <TouchableOpacity onPress={() => hanldeSelectImage(4)}>
                                <Image source={images.home4} style={{ width: 150, height: 70, borderRadius: 10 }} className={imgNo == 2 ? 'opacity-60 rounded-md bg-black-100' : ''}></Image>
                                {imgNo == 4 ?
                                    <View className="absolute bg-white rounded-full bottom-3 right-2">
                                        <IconSymbol name="checkmark" color="black" />
                                    </View>
                                    : null
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="flex flex-row justify-between">
                        <View>
                            <TouchableOpacity onPress={() => hanldeSelectImage(5)}>
                                <Image source={images.home1} style={{ width: 150, height: 70 }} resizeMode='contain' className={imgNo == 5 ? 'opacity-60 rounded-md bg-black-100' : ''}></Image>
                                {imgNo == 5 ?
                                    <View className="absolute bg-white rounded-full bottom-3 right-2">
                                        <IconSymbol name="checkmark" color="black" />
                                    </View>
                                    : null
                                }
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => hanldeSelectImage(2)}>
                                <Image source={images.home4} style={{ width: 150, height: 70, borderRadius: 10 }} className={imgNo == 4 ? 'opacity-60 rounded-md bg-black-100' : ''}></Image>
                                {imgNo == 4 ?
                                    <View className="absolute bg-white rounded-full bottom-3 right-2">
                                        <IconSymbol name="checkmark" color="black" />
                                    </View>
                                    : null
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Nút hành động */}
                <View className="bg-green-300 rounded-md mt-4 p-2 w-full mx-auto">
                    <TouchableOpacity onPress={addNewRoom}>
                        <Text className="text-black text-center font-bold">Xong</Text>
                    </TouchableOpacity>
                </View>

                    <View className="bg-gray-200 rounded-md mt-4 p-2 w-full mx-auto">
                        <TouchableOpacity onPress={() => { setImageMode(false); setModal(true) }}>
                            <Text className="text-black text-center font-bold">Quay lại</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 80,
        position: "relative",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        opacity: 0.6, // 60% độ mờ
    },
});
