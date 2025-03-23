import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import images from '@/constants/images';
import { useState, useEffect } from 'react';
import { Table, Row } from "react-native-table-component";
import DeviceNav from '@/components/DeviceNav';
import Navigation from '@/components/Navigation';
import SpinningFan from '@/components/SpinningFan';


const renderCell = (data, index) => {
    if (index === 3) {
        // Nếu là cột "Edit", thêm button
        return (
            <TouchableOpacity onPress={() => alert("Xóa hàng này")}>
                <Text style={{ color: "red", textAlign: "center" }}>Xóa</Text>
            </TouchableOpacity>
        );
    }
    return <Text>{data}</Text>;
};




export default function Fan() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [color, setColor] = useState("white");
    const [speed, setSpeed] = useState(0);
    const [status, setSatus] = useState(true);
    const [statusAuto, setSatusAuto] = useState(true);  

    const tableHead = ["Start", "End", "Brightness", "Edit"];
    const tableData = [
        ["17:00", "16:00", "nhẹ", ".."],
        ["20:00", "21:00", "nhẹ", ".."]
    ];
    function handleFanSpeed(speed) {
        if (status) setSpeed(speed);
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='min-h-screen flex flex-col m-2'>
            <View className='flex flex-row justify-between'>
                <View className="mx -2">
                    <TouchableOpacity onPress={() => { router.back() }}>
                        <IconSymbol name="back" />
                    </TouchableOpacity>
                </View>
                <Text className='text-xl font-bold'>QUẠT {+id}</Text>
                <View>
                </View>
            </View>
            <DeviceNav current={1} id={+id} type={"fan"} />

            <View className="flex flex-row mt-10">
                <View className='w-1/2'>
                    <SpinningFan speed={speed} />
                    <View className="flex flex-row items-center justify-center ">
                        <TouchableOpacity onPress={() => handleFanSpeed(150)} className={`w-6 h-6 mx-1 rounded-full ${speed == 150 ? "bg-yellow" : "bg-gray-500"}  flex items-center justify-center`}>
                            <Text className="text-white">1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleFanSpeed(100)} className={`w-6 h-6 mx-1 rounded-full ${speed == 100 ? "bg-yellow" : "bg-gray-500"}  flex items-center justify-center`}>
                            <Text className="text-white">2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleFanSpeed(25)} className={`w-6 h-6 mx-1 rounded-full ${speed == 25 ? "bg-yellow" : "bg-gray-500"}  flex items-center justify-center`}>
                            <Text className="text-white">3</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className='w-1/2 flex flex-col items-end px-4 '>
                    <View className=' flex flex-row'>
                        {status ? <Text className="px-2 w-20 font-semibold">Bật</Text> : <Text className="px-2 w-20 font-semibold">Tắt</Text>}
                        <TouchableOpacity onPress={() => { if (status) { setSatus(!status); setSpeed(0) } else { setSatus(!status) } }}>
                            <Image source={status ? images.auto_on : images.auto_off} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>



            <View className='mx-2 mt-4'>
                <View className="flex flex-row">
                    <View className='w-40'>
                        <Text className="px-2 w-40 font-semibold">Tự động:     </Text>
                    </View>
                    <TouchableOpacity onPress={() => setSatusAuto(!statusAuto)}>
                        <Image source={statusAuto ? images.auto_on : images.auto_off} />
                    </TouchableOpacity>
                </View>

                <View>
                    <View className='flex flex-row justify-between'>
                        <Text className='font-semibold mt-4'>Hẹn giờ</Text>
                        <TouchableOpacity onPress={() => alert("Thêm hẹn giờ")}>
                            <View className='bg-black rounded-full'>
                                <IconSymbol name="add" color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View className='mt-2'>
                        <View style={{ borderWidth: 1, borderColor: "black", borderRadius: 10, overflow: "hidden" }}>
                            <Table borderStyle={{ borderWidth: 0 }}>
                                {/* Header */}
                                <Row
                                    data={tableHead}
                                    style={{
                                        height: 40,
                                        backgroundColor: "#FFD700",
                                        borderBottomWidth: 1,
                                        borderColor: "black",
                                    }}
                                    textStyle={{ textAlign: "center", fontWeight: "bold" }}
                                />
                                {/* Body */}
                                {tableData.map((rowData, rowIndex) => (
                                    <Row
                                        key={rowIndex}
                                        data={rowData.map((cell, cellIndex) => renderCell(cell, cellIndex))}
                                        style={{ height: 30 }}
                                        textStyle={{ textAlign: "center" }}
                                    />
                                ))}
                            </Table>
                        </View>
                    </View>
                </View>

                <View className='h-10'></View>
            </View>


            <View className="flex-grow"></View>
            <View className="h-32">
                <View className=" bottom-8 w-full">
                    <Navigation current={2} />
                </View>
            </View>
        </ScrollView>
    )
}

