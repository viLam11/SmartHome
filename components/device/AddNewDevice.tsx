import React from 'react';
import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { IconSymbol } from '../ui/IconSymbol';
import { DEVICE_FORMAT, deviceCreateObject } from '@/types/device.type';
import { RoomObject } from '@/types/room.type';
import images from '@/constants/images';
import { addNewDeviceService } from '@/services/deviceService';
import { useLoading } from '@/contexts/LoadingContext';


export default function AddNewDevice({ setModal, room }: { setModal: any, room: RoomObject | null }) {
    const [nameMode, setNameMode] = useState(false);
    const [passwordMode, setPasswordMode] = useState(false);
    const [finishMode, setFinishMode] = useState(false);
    const [deviceType, setDeviceType] = useState('');
    const [deviceName, setDeviceName] = useState('');
    const [feedID, setFeedID] = useState(-1);
    const [feedKey, setFeedKey] = useState('');
    const [roomID, setRoomID] = useState(room?.id || -1);

    const newNameProps = {
        feedID,
        feedKey,
        deviceType,
        deviceName,
        roomID,
        setModal,
        setFeedID,
        setFeedKey,
        setNameMode,
        setFinishMode,
        setDeviceName,
        setPasswordMode
    };

    const newDevice: deviceCreateObject = {
        feedId: feedID,
        feedKey: feedKey,
        type: deviceType,
        title: deviceName,
        roomID: roomID
    };

    function hanldeContinueName() {
        if (deviceType == '') {
            alert('Chọn thiết bị');
            return;
        }
        setNameMode(true);
    }

    const addDevice = async (newDevice: deviceCreateObject) => {
        try {
            await addNewDeviceService(newDevice as deviceCreateObject);
            setModal(false);
        } catch (error) {
            console.log(error);
        }
    }

    if (nameMode) {
        return <SetNewName {...newNameProps} />
    }
    else if (passwordMode) {
        return <SetPassWord setPasswordMode={setPasswordMode} newDevice={newDevice} />
    }
    else if (finishMode) {
        // const addNewDevice = async () => {
        //     await addDevice(newDevice);
        // }
        // addNewDevice();
        return <FinishModal setModal={setModal} newDevice={newDevice} />
    }

    return (
        <View className='flex-1'>
            <View className="flex flex-row">
                <View className="flex-grow w-2/3 mt-4">
                    <Text className="text-xl text-center font-semibold">Thêm thiết bị vào</Text>
                    <Text className="text-xl text-center font-semibold">{room ? room.title : ""}</Text>
                </View>
                <View className="flex items-end mt-4 m-4">
                    <TouchableOpacity onPress={() => setModal(false)} className='bg-black rounded-full'>
                        <IconSymbol name="close" color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <View className='flex flex-grow'>
                <DeviceSelection deviceType={deviceType} setDeviceType={setDeviceType} />
            </View>



            {/* Button */}
            <View className='w-11/12 mx-auto mt-2 p-2'>
                <TouchableOpacity onPress={() => hanldeContinueName()} className='bottom-0'>
                    <View className="bg-green-300 p-2 rounded-lg">
                        <Text className="text-center font-bold">Tiếp tục</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const DeviceSelection = ({ deviceType, setDeviceType }: { deviceType: string | null, setDeviceType: any }) => (
    <View className="mt-4 flex flex-row flex-wrap justify-between items-center">
        {Object.entries(DEVICE_FORMAT).map(([key, device], index) => (
            <View className='w-1/2'>
                <View className='w-11/12 bg-gray-200 h-24 p-2 rounded-lg mx-auto mb-4'>
                    <TouchableOpacity onPress={() => setDeviceType(device.type)} >
                        <View className='flex flex-row justify-between'>
                            <View className="p-2 bg-white rounded-full">
                                <Image source={device.img} style={{ width: 20, height: 20, tintColor: "black" }} />
                            </View>
                            <View className="">
                                <View className={`border-2 rounded-full w-8 h-8 ${deviceType === device.type ? 'border-green-400' : 'border-black'}`}>
                                    {deviceType === device.type && <View className="bg-green-400 rounded-full w-4 h-4 m-auto"></View>}
                                </View>
                            </View>
                        </View>
                        <Text className='text-lg font-bold mt-auto'>{device.displayTittle}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ))}
    </View>
);

const SetNewName = ({ feedID, feedKey, roomID, deviceType, deviceName, setModal, setFeedID, setFeedKey, setNameMode, setFinishMode, setDeviceName, setPasswordMode }: any) => {
    const device = Object.values(DEVICE_FORMAT).find(d => d.type === deviceType);
    const { loading, setLoading } = useLoading();

    async function handleContinueName() {

        if (deviceType === "door") {
            setPasswordMode(true);
            setNameMode(false);
            setLoading(false);
            return;
        }

        const payload = {
            "feedId": +feedID,
            "feedKey": feedKey,
            "type": deviceType,
            "title": deviceName,
            "roomID": +roomID
        }
        const response: any = await addNewDeviceService(payload);
        console.log("received: ", response.status)
        if (response.status == 201) {
            setFinishMode(true);
            setNameMode(false);
            setLoading(false);
        } else {
            alert("Lỗi: " + response);
        }
    }

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
                        <Text className='font-bold text-2xl mb-2'>Đặt tên {device?.displayTittle}</Text>
                        <TextInput
                            className="border border-gray-300 p-3 min-w-80 w-full rounded-md mx-auto"
                            placeholder="Nhập tên thiết bị..."
                            keyboardType="default"
                            autoCapitalize="sentences"
                            value={deviceName}
                            onChangeText={(text) => setDeviceName(text)}
                        />
                    </View>
                    <View className='flex w-full flex-row h-24 mb-2 justify-between mt-2'>
                        <View className="w-1/3  flex flex-col">
                            <Text className="text-md font-bold">FeedID</Text>
                            <TextInput
                                className="border border-gray-300 w-full p-2 h-1/2 rounded-md mx-auto"
                                placeholder=""
                                keyboardType="visible-password"
                                value={(feedID !== -1 && feedID !== 0) ? String(feedID) : ""}
                                onChangeText={(text) => setFeedID(Number(text))}
                            />
                        </View>
                        <View className="w-1/3 flex flex-col">
                            <Text className="text-md font-bold">FeedKey</Text>
                            <TextInput
                                className="border border-gray-300 w-full p- h-1/2 rounded-md mx-auto"
                                placeholder=""
                                keyboardType="visible-password"
                                value={feedKey}
                                onChangeText={(text) => setFeedKey(text)}
                            />
                        </View>
                    </View>



                    <View className="h-32">
                        <View className="bg-green-300 bottom-4 rounded-md mt-4 p-2 w-full mx-auto">
                            <TouchableOpacity onPress={(() => { handleContinueName() })}>
                                <Text className="text-black text-center font-bold">Tiếp tục</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="bg-gray-300 bottom-4 rounded-md mt-4 p-2 w-full mx-auto">
                            <TouchableOpacity onPress={(() => { setNameMode(false) })}>
                                <Text className="text-black text-center font-bold">Quay lại</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        </KeyboardAvoidingView>
    );
}

const SetPassWord = ({ setPasswordMode, newDevice }: any) => {
    async function handleContinuePW() {
        const response : any = await addNewDeviceService(newDevice);
        if (response.status != 201) {
            alert("Lỗi: " + response);
        }
    }

    return (
        <View className='flex-1'>
            <View className="flex items-end m-4 ">
                <TouchableOpacity onPress={() => setPasswordMode(false)} className='bg-black rounded-full'>
                    <IconSymbol name="close" color="white" />
                </TouchableOpacity>
            </View>
            <View className='w-11/12 mx-auto flex-col flex-grow'>
                <Text className='font-bold text-2xl mb-2'>Đặt mật khẩu</Text>
                <TextInput
                    className="border border-gray-300 p-3 min-w-80 w-full rounded-md mx-auto"
                    placeholder="Nhập mật khẩu..."
                    keyboardType="default"
                />
            </View>
            <View className="h-32 w-11/12 mx-auto">
                <View className="bg-green-300 bottom-4 rounded-md mt-4 p-2 w-full mx-auto">
                    <TouchableOpacity onPress={(() => { handleContinuePW() })}>
                        <Text className="text-black text-center font-bold">Tiếp tục</Text>
                    </TouchableOpacity>
                </View>
                <View className="bg-gray-300 bottom-4 rounded-md mt-4 p-2 w-full mx-auto">
                    <TouchableOpacity onPress={(() => { })}>
                        <Text className="text-black text-center font-bold">Quay lại</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const FinishModal = ({ setModal, newDevice }: { setModal: any, newDevice: deviceCreateObject }) => {
    const device = Object.values(DEVICE_FORMAT).find(d => d.type === newDevice.type);
    return (
        <View className='min-h-screen h-full w-full'>
            <View className='h-1/3 mb-10'>
                <View className="flex items-end m-4 ">
                    <TouchableOpacity onPress={() => setModal(false)} className='bg-black rounded-full'>
                        <IconSymbol name="close" color="white" />
                    </TouchableOpacity>
                </View>
                <View className="flex items-center justify-center">
                    <Image source={images.done} style={{ width: 100, height: 100 }} />
                </View>
                <Text className='text-center text-2xl font-bold mt-6'>
                    {device?.type} {newDevice.title} đã được thêm vào
                </Text>
            </View>
            <TouchableOpacity onPress={() => setModal(false)} className="w-11/12 mx-auto h-12 bg-green-300 p-2 rounded-lg">
                <Text className='text-center text-xl font-bold m-auto'>Xong</Text>
            </TouchableOpacity>
        </View>
    );
}