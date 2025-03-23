import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { IconSymbol } from './ui/IconSymbol';
import images from '@/constants/images';

// deviceType: 0 - Fan, 1 - Light, 2 - Sensor

export default function AddNewDevice({ setModal, room }) {
    const [nameMode, setNameMode] = useState(false);
    const [finishMode, setFinishMode] = useState(false);
    const [deviceType, setDeviceType] = useState(1);   
    const [deviceName, setDeviceName] = useState('');
    if (nameMode) { 
        return <SetNewName setNameMode={setNameMode} setFinishMode={setFinishMode} deviceType={deviceType} setModal={setModal} setDeviceName={setDeviceName} deviceName={deviceName} />
    } else if (finishMode) {
        return <FinishModal setModal={setModal} deviceName={deviceName} deviceType={deviceType} />
    } 

    function hanldeContinueName() {
        if (deviceType == -1) {
            alert('Chọn thiết bị');
            return;
        }
        setNameMode(true);
    }

    return (
        <View>
            <View className="flex flex-row">
                <View className="flex-grow w-2/3 mt-4">
                    <Text className="text-xl text-center font-semibold">Thêm thiết bị vào</Text>
                    <Text className="text-xl text-center font-semibold">{room ? room.name : ""}</Text>
                </View>
                <View className="flex items-end mt-4 m-4">
                    <TouchableOpacity onPress={() => setModal(false)} className='bg-black rounded-full'>
                        <IconSymbol name="close" color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <View className="mt-4">
                <View className="flex flex-row w-full justify-between mx-auto">
                    <View className="bg-gray-200 w-5/12 h-24 p-2 rounded-lg mx-auto">
                        <View className='flex flex-row justify-between'>
                            <View className="p-2 bg-white rounded-full">
                                <Image source={images.fan} style={{ width: 20, height: 20, tintColor: "black" }} />
                            </View>
                            <View className="">
                                <TouchableOpacity onPress={() => setDeviceType(0)}>
                                   {deviceType == 0 ? 
                                    <View className=" border-green-400 border-2 rounded-full w-8 h-8">
                                        <View className="bg-green-400 rounded-full w-4 h-4 m-auto"></View>
                                    </View>
                                    :
                                   <View className=" border-black border-2 rounded-full w-8 h-8"></View>
                                   }  
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className='mt-auto'>
                            <Text className='text-lg font-bold'>Quạt</Text>
                        </View>
                    </View>
                    <View className="bg-gray-200 w-5/12 mx-auto h-24 p-2 rounded-lg">
                        <View className='flex flex-row justify-between'>
                            <View className="p-2 bg-white rounded-full">
                                <Image source={images.lightbulb} style={{ width: 20, height: 20, tintColor: "black" }} />
                            </View>
                            <View className="">
                            <TouchableOpacity onPress={() => setDeviceType(1)}>
                                   {deviceType == 1 ? 
                                    <View className=" border-green-400 border-2 rounded-full w-8 h-8">
                                        <View className="bg-green-400 rounded-full w-4 h-4 m-auto"></View>
                                    </View>
                                    :
                                   <View className=" border-black border-2 rounded-full w-8 h-8"></View>
                                   }  
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className='mt-auto'>
                            <Text className='text-lg font-bold'>Đèn</Text>
                        </View>
                    </View>
                </View>
                <View className="flex flex-row w-full justify-between mx-auto mt-2">
                    <View className="bg-gray-200 w-5/12 h-24 p-2 rounded-lg mx-auto">
                        <View className='flex flex-row justify-between'>
                            <View className="p-2 bg-white rounded-full">
                                <Image source={images.aircondition} style={{ width: 20, height: 20, tintColor: "black" }} />
                            </View>
                            <View className="">
                                <TouchableOpacity onPress={() => setDeviceType(2)}>
                                   {deviceType == 2 ? 
                                    <View className=" border-green-400 border-2 rounded-full w-8 h-8">
                                        <View className="bg-green-400 rounded-full w-4 h-4 m-auto"></View>
                                    </View>
                                    :
                                   <View className=" border-black border-2 rounded-full w-8 h-8"></View>
                                   }  
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className='mt-auto'>
                            <Text className='text-lg font-bold'>Cảm biến</Text>
                        </View>
                    </View>
                        <View className="bg-white w-5/12 mx-auto p-2 rounded-lg">
                    </View>
                </View>
                
            </View>

        {/* Button */}
            <View className='w-11/12 mx-auto mt-2'>
                <TouchableOpacity onPress={() => hanldeContinueName() }>
                    <View className="bg-green-300 p-2 rounded-lg">
                        <Text className="text-center font-bold">Tiếp tục</Text>
                    </View>
                </TouchableOpacity>
            </View>
 
        </View>
    )
}

const SetNewName = ({setFinishMode, setNameMode, setModal, setDeviceName, deviceName, deviceType}) => {  
    const [textType, setTextType] = useState('');
    useEffect(() => {
        if (deviceType == 0) {
            setTextType('Quạt');
        }
        else if (deviceType == 1) {
            setTextType('Đèn');
        } else if (deviceType == 2) {
            setTextType('Cảm biến');
        }
    }, [deviceType])

    return (
           <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <View className='w-full h-full'>
                        <View className="flex items-end m-4 ">
                            <TouchableOpacity onPress={() => setModal(false)} className='bg-black rounded-full'>
                                <IconSymbol name="close" color="white" />
                            </TouchableOpacity>
                        </View>
        
                        <View className='w-11/12 mx-auto flex-col flex-grow'>
                            <View className='flex-grow'>
                                <Text className='font-bold text-2xl mb-2'>Đặt tên {textType}</Text>
                                <TextInput
                                    className="border border-gray-300 p-3 min-w-80 w-full rounded-md mx-auto"
                                    placeholder="Nhập tên thiết bị..."
                                    keyboardType="visible-password"
                                    value={deviceName}
                                    onChangeText={(text) => setDeviceName(text)}
                                />
                            </View>
                            <View className="h-32">
                                <View className="bg-green-300 bottom-4 rounded-md mt-4 p-2 w-full mx-auto">
                                    <TouchableOpacity onPress={(() => { setNameMode(false); setFinishMode(true); })}>
                                        <Text className="text-black text-center font-bold">Tiếp tục</Text>
                                    </TouchableOpacity>
                                </View>
                                <View className="bg-gray-300 bottom-4 rounded-md mt-4 p-2 w-full mx-auto">
                                    <TouchableOpacity onPress={(() => { setNameMode(false)})}>
                                        <Text className="text-black text-center font-bold">Quay lại</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
        
                    </View>
                </KeyboardAvoidingView>
    )
}

const FinishModal = ({setModal, deviceName, deviceType}) => {
    const [textType, setTextType] = useState('');
    useEffect(() => {
        if (deviceType == 0) {
            setTextType('Quạt');
        }
        else if (deviceType == 1) {
            setTextType('Đèn');
        } else if (deviceType == 2) {
            setTextType('Cảm biến');
        }
    }, [deviceType])

    function hanldeAddNewDevice() {
        setModal(false);
    }   
    return (
        <View className='min-h-screen h-full w-full'>
            <View className='h-1/3  mb-10'>
                <View className="flex items-end m-4 ">
                    <TouchableOpacity onPress={() => setModal(false)} className='bg-black rounded-full'>
                        <IconSymbol name="close" color="white" />
                    </TouchableOpacity>
                </View>
                <View className="flex items-center justify-center">
                    <Image source={images.done} style={{ width: 100, height: 100 }} />
                </View>
                <View>
                    <Text className='text-center text-2xl font-bold mt-6'>   
                        {textType} {deviceName} đã được thêm vào
                    </Text>
                </View>
    
            </View>
           
            <View className="w-11/12 mx-auto h-30 bottom-0 h-12 bg-green-300 p-2 rounded-lg">
                <TouchableOpacity onPress={() => hanldeAddNewDevice()}>
                    <Text className='text-center text-xl font-bold m-auto'>Xong</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    )
}