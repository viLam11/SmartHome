import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { IconSymbol } from './ui/IconSymbol';
import { DEVICE_FORMAT, roomObject, deviceCreateObject } from '@/types/device';
import images from '@/constants/images';
import { addNewDeviceService } from '@/services/deviceService';

// deviceType: 0 - Fan, 1 - Light, 2 - Sensor

export default function AddNewDevice({ setModal, room }: { setModal: any, room: roomObject }) {
    const [step, setStep] = useState<'select' | 'name' | 'finish'>('select');
    const [deviceType, setDeviceType] = useState<string | null>(null);
    const [deviceName, setDeviceName] = useState('');
    const [deviceFeedKey, setDeviceFeedKey] = useState('');

    const addDevice = async (newDevice: deviceCreateObject) => {
        try {
            await addNewDeviceService(newDevice as deviceCreateObject);
            setModal(false);
        } catch (error) {
            console.log(error);
        }
    }

    if (step === 'name') {
        return <SetNewName setStep={setStep} setDeviceName={setDeviceName} deviceType={deviceType} setModal={setModal} />;
    }

    if (step === 'finish') {
        const newDevice: deviceCreateObject = {
            feedId: 1,
            feedKey: deviceFeedKey || 'light',
            type: deviceType || 'light',
            title: deviceName,
            roomID: room?.id || '666'
        };
        const addNewDevice = async () => {
            await addDevice(newDevice);
        }
        addNewDevice();
        
        return <FinishModal setModal={setModal} newDevice={newDevice} />;
    }

    return (
        <View>
            <Header title={`Thêm thiết bị vào ${room?.name || ''}`} setModal={setModal} />
            <DeviceSelection deviceType={deviceType} setDeviceType={setDeviceType} />
            <View className='w-11/12 mx-auto mt-2'>
                <TouchableOpacity onPress={() => deviceType !== null ? setStep('name') : alert('Chọn thiết bị')}>
                    <View className="bg-green-300 p-2 rounded-lg">
                        <Text className="text-center font-bold">Tiếp tục</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const Header = ({ title, setModal }: { title: string, setModal: any }) => (
    <View className="flex flex-row">
        <View className="flex-grow w-2/3 mt-4">
            <Text className="text-xl text-center font-semibold">{title}</Text>
        </View>
        <View className="flex items-end mt-4 m-4">
            <TouchableOpacity onPress={() => setModal(false)} className='bg-black rounded-full'>
                <IconSymbol name="close" color="white" />
            </TouchableOpacity>
        </View>
    </View>
);

const DeviceSelection = ({ deviceType, setDeviceType }: { deviceType: string | null, setDeviceType: any }) => (
    <View className="mt-4 flex flex-row flex-wrap justify-start">
        {Object.entries(DEVICE_FORMAT).map(([key, device], index) => (
            <View className='w-2/5 bg-gray-200 h-24 p-2 rounded-lg mx-auto mb-2'>
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
        ))}
    </View>
);

const SetNewName = ({ setStep, setDeviceName, deviceType, setModal }: { setStep: any, setDeviceName: any, deviceType: string | null, setModal: any }) => {
    const device = Object.values(DEVICE_FORMAT).find(d => d.type === deviceType);
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <View className='w-full h-full'>
                <Header title={`Đặt tên ${device?.displayTittle || ''}`} setModal={setModal} />
                <View className='w-11/12 mx-auto flex-grow'>
                    <TextInput
                        className="border border-gray-300 p-3 min-w-80 w-full rounded-md mx-auto"
                        placeholder="Nhập tên thiết bị..."
                        keyboardType="visible-password"
                        onChangeText={setDeviceName}
                    />
                    <View className="h-32">
                        <TouchableOpacity onPress={() => setStep('finish')} className="bg-green-300 mt-4 p-2 rounded-md">
                            <Text className="text-black text-center font-bold">Tiếp tục</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setStep('select')} className="bg-gray-300 mt-4 p-2 rounded-md">
                            <Text className="text-black text-center font-bold">Quay lại</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}


const FinishModal = ({ setModal, newDevice }: { setModal: any, newDevice: deviceCreateObject }) => {
    const device = Object.values(DEVICE_FORMAT).find(d => d.type === newDevice.type);
    return (
        <View className='min-h-screen h-full w-full'>
            <View className='h-1/3 mb-10'>
                <Header title="" setModal={setModal} />
                <View className="flex items-center justify-center">
                    <Image source={images.done} style={{ width: 100, height: 100 }} />
                </View>
                <Text className='text-center text-2xl font-bold mt-6'>
                    {device?.name} {newDevice.title} đã được thêm vào
                </Text>
            </View>
            <TouchableOpacity onPress={() => setModal(false)} className="w-11/12 mx-auto h-12 bg-green-300 p-2 rounded-lg">
                <Text className='text-center text-xl font-bold m-auto'>Xong</Text>
            </TouchableOpacity>
        </View>
    );
}