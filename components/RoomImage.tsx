import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';
import { TextInput } from 'react-native-gesture-handler';
import images from '@/constants/images';


export default function RoomImage({ roomData, setRoomData, newRoomName, setImageMode, setModal }) {
    const [img, setImage] = useState(images.home1);
    const [imgNo, setImgNo] = useState(-1);


    function hanldeSelectImage(num) {
        if (num == imgNo) {
            setImgNo(-1);
            return;
        }
        setImgNo(num);
    }

    function addNewRoom() {

        let newRoom = {
            id: roomData.length + 1,
            img: images.home1,
            name: newRoomName,
            device: 0,
            light: 0,
            light_on: 0,
            fan: 0,
            fan_on: 0,
            sensor: 0,
            sensor_on: 0
        }
        setRoomData([...roomData, newRoom]);
        setModal(false);
        setImageMode(false);
    }

    return (
        <View className='w-full h-full'>
            <View className="flex items-end m-4 ">
                <TouchableOpacity onPress={() => setImageMode(false)} className='bg-black rounded-full '>
                    <IconSymbol name="close" color="white" />
                </TouchableOpacity>
            </View>

            <View className='w-11/12 mx-auto bottom-2 flex-grow'>
                <View >
                    <View className="flex flex-row justify-between">
                        <View className='mb-2'>
                            <TouchableOpacity onPress={() => hanldeSelectImage(1)}>
                                <Image source={images.home1}  style={{width: 150, height: 70}} resizeMode='contain' className={imgNo == 1 ? 'opacity-60 rounded-md bg-black-100' : ''}></Image>
                                {imgNo == 1 ? 
                                    <View className="absolute bg-white rounded-full bottom-3 right-2">
                                        <IconSymbol name="checkmark" color="black"/>
                                    </View> 
                                    : null
                                }
                            </TouchableOpacity>
                        </View>
                        <View className='mb-2'>
                            <TouchableOpacity onPress={() => hanldeSelectImage(2)}>
                                <Image source={images.home2}  style={{width: 150, height: 70, borderRadius: 10}}  className={imgNo == 2 ? 'opacity-60 rounded-md bg-black-100' : ''}></Image>
                                {imgNo == 2 ? 
                                    <View className="absolute bg-white rounded-full bottom-3 right-2">
                                        <IconSymbol name="checkmark" color="black"/>
                                    </View> 
                                    : null
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View className="flex flex-row justify-between">
                        <View className='mb-2'>
                            <TouchableOpacity onPress={() => hanldeSelectImage(3)}>
                                <Image source={images.home3}  style={{width: 150, height: 70}} resizeMode='contain' className={imgNo == 3 ? 'opacity-60 rounded-md bg-black-100' : ''}></Image>
                                {imgNo == 3 ? 
                                    <View className="absolute bg-white rounded-full bottom-3 right-2">
                                        <IconSymbol name="checkmark" color="black"/>
                                    </View> 
                                    : null
                                }
                            </TouchableOpacity>
                        </View>
                        <View className='mb-2'>
                            <TouchableOpacity onPress={() => hanldeSelectImage(4)}>
                                <Image source={images.home4}  style={{width: 150, height: 70, borderRadius: 10}}  className={imgNo == 2 ? 'opacity-60 rounded-md bg-black-100' : ''}></Image>
                                {imgNo == 4 ? 
                                    <View className="absolute bg-white rounded-full bottom-3 right-2">
                                        <IconSymbol name="checkmark" color="black"/>
                                    </View> 
                                    : null
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="flex flex-row justify-between">
                        <View>
                            <TouchableOpacity onPress={() => hanldeSelectImage(5)}>
                                <Image source={images.home1}  style={{width: 150, height: 70}} resizeMode='contain' className={imgNo == 5 ? 'opacity-60 rounded-md bg-black-100' : ''}></Image>
                                {imgNo == 5 ? 
                                    <View className="absolute bg-white rounded-full bottom-3 right-2">
                                        <IconSymbol name="checkmark" color="black"/>
                                    </View> 
                                    : null
                                }
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => hanldeSelectImage(2)}>
                                <Image source={images.home4}  style={{width: 150, height: 70, borderRadius: 10}}  className={imgNo == 4 ? 'opacity-60 rounded-md bg-black-100' : ''}></Image>
                                {imgNo == 4 ? 
                                    <View className="absolute bg-white rounded-full bottom-3 right-2">
                                        <IconSymbol name="checkmark" color="black"/>
                                    </View> 
                                    : null
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View >
                    <View className="bg-green-300 rounded-md mt-4 p-2 w-full mx-auto">
                        <TouchableOpacity onPress={() => addNewRoom()}>
                            <Text className="text-black text-center font-bold">Xong</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="bg-gray-200 rounded-md mt-4 p-2 w-full mx-auto">
                        <TouchableOpacity onPress={() => {setImageMode(false); setModal(true)}}>
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
