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

    function handleSelectImage(num: number) {
        setImgNo(prev => (prev === num ? null : num));
    }

    async function addNewRoom() {
        try {
            if (!newRoomName.trim()) {
                Alert.alert("Lỗi", "Vui lòng nhập tên phòng!");
                return;
            }

            await addNewRoomService({ title: newRoomName });
            Alert.alert("Thành công", "Phòng đã được thêm!");
            setModal(false);
            setImageMode(false);
            setCount(count + 1);
        } catch (error) {
            Alert.alert("Lỗi", "Không thể thêm phòng, vui lòng thử lại.");
        }
    }

    return (
        <View className="w-full h-full">
            {/* Đóng modal */}
            <View className="flex items-end m-4">
                <TouchableOpacity onPress={() => setImageMode(false)} className="bg-black rounded-full">
                    <IconSymbol name="close" color="white" />
                </TouchableOpacity>
            </View>

            {/* Chọn ảnh */}
            <View className="w-11/12 mx-auto bottom-2 flex-grow">
                <View className="flex flex-row justify-between flex-wrap">
                    {[images.home1, images.home2, images.home3, images.home4].map((image, index) => (
                        <TouchableOpacity key={index} onPress={() => handleSelectImage(index + 1)} className="mb-2">
                            <Image
                                source={image}
                                style={{ width: 150, height: 70, borderRadius: 10 }}
                                className={imgNo === index + 1 ? 'opacity-60 bg-black-100' : ''}
                            />
                            {imgNo === index + 1 && (
                                <View className="absolute bg-white rounded-full bottom-3 right-2">
                                    <IconSymbol name="checkmark" color="black" />
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Nút hành động */}
                <View className="bg-green-300 rounded-md mt-4 p-2 w-full mx-auto">
                    <TouchableOpacity onPress={addNewRoom}>
                        <Text className="text-black text-center font-bold">Xong</Text>
                    </TouchableOpacity>
                </View>

                <View className="bg-gray-200 rounded-md mt-4 p-2 w-full mx-auto">
                    <TouchableOpacity onPress={() => { setImageMode(false); setModal(true); }}>
                        <Text className="text-black text-center font-bold">Quay lại</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
