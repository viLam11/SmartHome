import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { IconSymbol } from './ui/IconSymbol';
import images from '@/constants/images';
import axios from 'axios';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// deviceType: 0 - Fan, 1 - Light, 2 - Sensor
const base_url = 'https://nearby-colleen-quanghia-3bfec3a0.koyeb.app/api/v1';

export default function AddNewDevice({ setModal, room }) {
    const [nameMode, setNameMode] = useState(false);
    const [finishMode, setFinishMode] = useState(false);
    const [deviceType, setDeviceType] = useState(1);
    const [deviceName, setDeviceName] = useState('');
    const [doorPassMode, setDoorPassMode] = useState(false);
    const [feedID, setFeedID] = useState('');
    const [feedKey, setFeedKey] = useState('');
    const [roomID, setRoomID] = useState(room.id);
    const [password, setPassword] = useState(null);
    const [success, setSuccess] = useState(false)

    if (nameMode) {
        return <SetNewName success={success} setSuccess={setSuccess}  roomID={roomID} feedID={feedID} setFeedID={setFeedID} feedKey={feedKey} setFeedKey={setFeedKey} setNameMode={setNameMode} setFinishMode={setFinishMode} setDoorPassMode={setDoorPassMode} deviceType={deviceType} setModal={setModal} setDeviceName={setDeviceName} deviceName={deviceName} />
    } else if (finishMode) {
        return <FinishModal success={success} setSuccess={setSuccess} setFinishMode={setFinishMode} setModal={setModal} deviceName={deviceName} deviceType={deviceType} feedID={feedID} feedKey={feedKey} roomID={roomID} password={password} />
    } else if (doorPassMode) {
        return <DoorPassModal setSuccess={setSuccess} deviceName={deviceName} feedID={feedID} feedKey={feedKey} roomID={roomID} password={password} setPassword={setPassword} setFinishMode={setFinishMode} setNameMode={setNameMode} setDoorPassMode={setDoorPassMode} />
    }

    function hanldeContinueName() {
        if (deviceType == -1) {
            alert('Chọn thiết bị');
            return;
        }
        setNameMode(true);
    }

    return (
        <View className='w-full h-full '>
            <View className="flex-1">
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
                                    <Image source={images.sensor} style={{ width: 20, height: 20, tintColor: "black" }} />
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

                        {/* door option */}
                        <View className="bg-gray-200 w-5/12 h-24 p-2 rounded-lg mx-auto">
                            <View className='flex flex-row justify-between'>
                                <View className="p-2 bg-white rounded-full">
                                    <Image source={images.door} style={{ width: 20, height: 20, tintColor: "black" }} />
                                </View>
                                <View className="">
                                    <TouchableOpacity onPress={() => setDeviceType(3)}>
                                        {deviceType == 3 ?
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
                                <Text className='text-lg font-bold'>Cửa</Text>
                            </View>
                        </View>
                    </View>

                </View>
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
    )
}

const SetNewName = ({ roomID, feedKey, setFeedKey, feedID, setFeedID, setFinishMode, setDoorPassMode, setNameMode, setModal, setDeviceName, setSuccess, deviceName, deviceType }) => {
    const [textType, setTextType] = useState('');
    const [token, setToken] = useState(null)
    useEffect(() => {
        const fetchToken = async () => {
            const temp = await AsyncStorage.getItem("authToken")
            setToken(temp)
        }
        fetchToken()
    }, [])
    useEffect(() => {
        if (!token) return
        if (deviceType == 0) {
            setTextType('Quạt');
        }
        else if (deviceType == 1) {
            setTextType('Đèn');
        } else if (deviceType == 2) {
            setTextType('Cảm biến');
        } else if (deviceType == 3) {
            setTextType('Cửa')
        }
    }, [deviceType])

    async function hanldeContinueName() {
        if (!deviceName) { alert("Vui lòng nhập tên thiết bị"); return; }
        if (!feedID) { alert("Vui lòng nhập FeedID"); return; }
        if (!feedKey) { alert("Vui lòng nhập FeedKey"); return; }
        console.log("deviceType", deviceType);
        if (deviceType == 3) {
            setNameMode(false); setDoorPassMode(true);
        }
        else {
            if (!token) return
            console.log("deviceType", deviceType);
            if (deviceType == 3) {
                setNameMode(false)
                setDoorPassMode(true)
                return
            }
            let type = ""
            if (deviceType == 0) {
                type = "fan"
            } else if (deviceType == 1) {
                type = "light"
            } else if (deviceType == 2) {
                type = "sensor"
            } else if (deviceType == 3) {
                type = "door"
            }
            try {
                const payload = {
                    feedId: +feedID,
                    feedKey: feedKey,
                    type: type,
                    title: deviceName,
                    roomID: +roomID
                }
                console.log(payload)
                const response = await axios.post(`${base_url}/devices`, payload, {
                    headers: {
                        "Authorization": token
                    }
                }).catch(err => {
                    console.error("Error khi tạo thiết bị: ", err)
                    setSuccess(false)
                    setFinishMode(true)
                    setNameMode(false)
                    throw new Error("Tạo thiết bị thất bại")
                })
                console.log("Thêm thiết bị thành công: ", response.data);
                setSuccess(true)
                setFinishMode(true)
                setNameMode(false)
                setFinishMode(true);
            } catch (error) {
                console.log("here")
                console.log(error);
            }
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
                        <Text className='font-bold text-2xl mb-2'>Đặt tên {textType}</Text>
                        <TextInput
                            className="border border-gray-300 p-3 min-w-80 w-full rounded-md mx-auto"
                            placeholder="Nhập tên thiết bị..."
                            keyboardType="visible-password"
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
                                value={feedID}
                                onChangeText={(text) => setFeedID(text)}
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
                            <TouchableOpacity onPress={(() => { hanldeContinueName() })}>
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
    )
}

const FinishModal = ({ success, setFinishMode, feedKey, feedID, setModal, deviceName, deviceType, roomID, password }) => {
    const [textType, setTextType] = useState('');
    const [type, setType] = useState('');
    const [token, setToken] = useState(null)
    const [done, setDone] = useState(false);
    useEffect(() => {
        const getToken = async () => {
            const token = await AsyncStorage.getItem('token');
            setToken(token);
        }
        getToken()
    }, [])
    useEffect(() => {
        if (deviceType == 0) {
            setTextType('Quạt');
            setType('fan');
        }
        else if (deviceType == 1) {
            setTextType('Đèn');
            setType('light');
        } else if (deviceType == 2) {
            setTextType('Cảm biến');
            setType('sensor');
        } else if (deviceType == 3) {
            setTextType('Cửa');
            setType('door');
        }
    }, [deviceType])

    async function hanldeAddNewDevice() {
        if (!token) return
        try {
            const device = {
                feedId: +feedID,
                feedKey: feedKey,
                type: type,
                title: deviceName,
                roomID: roomID
            }
            console.log("INPUT device", device);

            const response = await axios.post(`${base_url}/devices`, device, {
                headers: {
                    "Authorization": token
                }
            });
            setModal(false);
            setFinishMode(false);
        } catch (error) {
            console.log("here")
            console.log(error);
        }
        setFinishMode(false);
        setModal(false);
    }


    if (success) {
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
                    <TouchableOpacity onPress={() => setModal(false)}>
                        <Text className='text-center text-xl font-bold m-auto'>Xong</Text>
                    </TouchableOpacity>
    
                </View>
            </View>
        )
    } else {
        return (
            <View className='min-h-screen h-full w-full'>
            <View className='h-1/3  mb-10'>
                <View className="flex items-end m-4 ">
                    <TouchableOpacity onPress={() => setModal(false)} className='bg-black rounded-full'>
                        <IconSymbol name="close" color="white" />
                    </TouchableOpacity>
                </View>
                <View className="flex items-center justify-center">
                    <Image source={images.fail} style={{ width: 100, height: 100 }} />
                </View>
                <View>
                    <Text className='text-center text-2xl font-bold mt-6'>
                       Không thể thêm {textType} {deviceName}
                    </Text>
                </View>

            </View>

            <View className="w-11/12 mx-auto h-30 bottom-0 h-12 bg-green-300 p-2 rounded-lg">
                <TouchableOpacity onPress={() => setModal(false)}>
                    <Text className='text-center text-xl font-bold m-auto'>Thoát</Text>
                </TouchableOpacity>
            </View>
            <View className="w-11/12 m x-auto h-30 bottom-0 h-12 bg-gray-300 p-2 rounded-lg">
                <TouchableOpacity onPress={() => setModal(false)}>
                    <Text className='text-center text-xl font-bold m-auto'>Quay lại</Text>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
    


}

const DoorPassModal = (({ password, deviceName, feedID, feedKey, roomID, setPassword, setNameMode, setFinishMode, setDoorPassMode, setSuccess }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [token, setToken] = useState(null)
    useEffect(() => {
        const fetchToken = async () => {
            const temp = await AsyncStorage.getItem("authToken")
            setToken(temp)
        }
        fetchToken()
    }, [])

    async function hanldeContinue() {
        if (!(password && feedID && feedKey && roomID && token)) {
            console.log("Thiếu data")
        }
        if (!token) return
        if (!password) {
            alert("Vui lòng nhập mật khẩu");
            return;
        }
        if (password.length < 4) {
            alert("Mật khẩu tối thiểu 4 chữ số")
        }
        try {
            const payload = {
                feedId: +feedID,
                feedKey: feedKey,
                type: "door",
                title: deviceName,
                roomId: +roomID
            }
            console.log("Check payload: ", payload)
            const response = await axios.post(`${base_url}/devices`, payload, {
                headers: {
                    'Authorization': token
                }
            }).catch(err => {
                if (err.response) {
                    console.error("Status code:", err.response.status)
                    if (err.response.status == 500) {
                        throw new Error("Trùng feedID")
                    }
                    console.error("Response data:", err.response.data)
                } else {
                    console.error("Không có response (có thể lỗi network)", err)
                }
            })
            console.log(response.data)
            const setPass = await axios.post(`${base_url}/devices/${feedID}/setpwd`, {
                pwd: password
            }).catch(err => {
                console.error("Error khi set password: ", err)
                throw new Error("Set password thất bại")
                setSuccess(false)
            })
            console.log(setPass.data)
            setDoorPassMode(false); setFinishMode(true);
            setSuccess(true)
        } catch (error) {
            setSuccess(false)
            console.log(error.message)
            alert(error.message)
        }
    }
    return (
        <View className='h-full m-4 flex flex-col justify-between'>
            <View className='h-2/3'>
                <Text className='text-2xl font-bold my-2'>Nhập mật khẩu cửa</Text>
                <Text className='italic'>Tối thiểu 4 chữ số</Text>
                <View className="border border-gray-300 p-3 min-w-80 w-full rounded-md mx-auto mt-2 flex flex-row items-center">
                    <TextInput
                        className="flex-1"
                        placeholder="Nhập mật khẩu..."
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!passwordVisible}
                    />
                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                        {passwordVisible ? <IconSymbol name="eye.slash" color="black" size={24} /> : <IconSymbol name="eye" color="black" size={24} />}
                    </TouchableOpacity>
                </View>
            </View>

            <View className='h-1/3'>
                <View className="bg-green-300 bottom-4 rounded-md mt-4 p-2 w-full mx-auto">
                    <TouchableOpacity onPress={hanldeContinue}>
                        <Text className="text-black text-center font-bold">Tiếp tục</Text>
                    </TouchableOpacity>
                </View>
                <View className="bg-gray-300 bottom-4 rounded-md mt-4 p-2 w-full mx-auto">
                    <TouchableOpacity onPress={(() => { setDoorPassMode(false); setNameMode(true); })}>
                        <Text className="text-black text-center font-bold">Quay lại</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
})