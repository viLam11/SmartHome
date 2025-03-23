import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import images from '@/constants/images';
import { useState, useEffect } from 'react';
import { Table, Row } from "react-native-table-component";
import DeviceNav from '@/components/DeviceNav';
import Navigation from '@/components/Navigation';
import { deviceObject, getDeviceData } from '@/services/deviceService';


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

export default function Light() {
    const router = useRouter();
    const { feedId } = useLocalSearchParams();
    const [color, setColor] = useState("white");
    const [statusAuto, setSatusAuto] = useState(true);
    const tableHead = ["Start", "End", "Brightness", "Edit"];
    const tableData = [
        ["17:00", "16:00", "nhẹ", ".."],
        ["20:00", "21:00", "nhẹ", ".."]
    ];
    const [deviceData, setDeviceData] = useState<deviceObject | null>(null);
        

    useEffect(() => {
        (async () => {
            const response = await getDeviceData(feedId as string);
            setDeviceData(response);
        })();
    }, []);

    return (
        <View className='flex-1'>
            <ScrollView className='mt-1 mx-2'>
                <View className='flex flex-row justify-between'>
                    <View className="mx -2">
                        <TouchableOpacity onPress={() => { router.back() }}>
                            <IconSymbol name="back" />
                        </TouchableOpacity>
                    </View>
                    <Text className='text-xl font-bold'>{deviceData?.name}</Text>
                    <View>
                    </View>
                </View>

                <DeviceNav current={1} id={+feedId} type={"light"} />


                <View className='flex flex-row mt-4'>
                    <View className='w-1/2 '>
                        <View className='w-full flex items-center'>
                            <Image source={images.lamp} style={{ width: "70%", height: 200 }} />
                            <Image source={images.light} style={{ width: "50%", height: 100, tintColor: `${color}` }}></Image>
                        </View>

                    </View>
                    <View className='w-1/2 flex flex-col items-end justify-center'>
                        <Image source={images.power} ></Image>
                        <View >
                            <View className='mt-4 flex flex-row justify-center items-center'>
                                <TouchableOpacity onPress={() => setColor("blue")}>
                                    <View className={`rounded-full mx-2 bg-blue-500  ${color === "blue" ? "w-8 h-8" : "w-4 h-4"}`}></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setColor("white")}>
                                    <View className={`rounded-full mx-2 bg-white  ${color === "white" ? "w-8 h-8" : "w-4 h-4"}`}></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setColor("yellow")}>
                                    <View className={`rounded-full mx-2 bg-yellow  ${color === "yellow" ? "w-8 h-8" : "w-4 h-4"}`}></View>
                                </TouchableOpacity>
                            </View>
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

            </ScrollView>
            <View className="absolute bottom-2 w-full">
                <Navigation current={2} />
            </View>
        </View>
    )
}