<<<<<<< HEAD

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Sensor() {
    return (
        <View>
            <Text>Sensor</Text>
        </View>
    )
}
=======
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import images from '@/constants/images';
import { useState, useEffect } from 'react';
import { Table, Row } from "react-native-table-component";
import DeviceNav from '@/components/DeviceNav';
import Navigation from '@/components/Navigation';
import axios from 'axios';

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

<<<<<<<< HEAD:app/(root)/devices/lights/[id].tsx
// data: {
//     "feedId": "3023667",
//     "feedKey": "fan",
//     "value": "0",
//     "type": "fan",
//     "title": "quat tran",
//     "created_at": "2025-03-24T07:13:51Z"
// }

export default function Light() {
========
export default function Sensor() {
>>>>>>>> fe2:app/(root)/devices/sensors/[id].tsx
    const router = useRouter();
    const base_url = 'https://nearby-colleen-quanghia-3bfec3a0.koyeb.app/api/v1';
    const { id } = useLocalSearchParams();

    const [color, setColor] = useState("white");
    const [statusAuto, setSatusAuto] = useState(true);
    const [status, setStatus] = useState(false);
    const [lightData, setLightData] = useState(null);

    const tableHead = ["Start", "End", "Brightness", "Edit"];
    const tableData = [
        ["17:00", "16:00", "nhẹ", ".."],
        ["20:00", "21:00", "nhẹ", ".."]
    ];

    async function powerLight(value) {
        try {
            const response = await axios.post(`${base_url}/devices/${id}`, { value: value }, {
                headers: {
                    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVkQXQiOjE3NDM0ODI5OTQsInVzZXJJRCI6IjEifQ.9Gt8rqLKmePlnbc2MpkCofnGSK_gmf0WqoXlNuv75EE"
                }
            })
            if (value === "#000000") {
                setColor("#F2F2F2")
            } else {
                setColor("white")
            }
            console.log(response.data)
            setStatus(!status)
        } catch (error) {
            console.log(error)
        }

    }

    async function controlLight(value) {
        try {
            const response = await axios.post(`${base_url}/devices/${id}`, { value: value }, {
                headers: {
                    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVkQXQiOjE3NDM0ODE5NDksInVzZXJJRCI6IjEifQ.7p08PVx626gl4dmeRDWa8KO9K_RDm8sN66AQQMvs4DQ"
                }
            })
            console.log(response)
            setColor(value)
            // setStatus(value === 1 ? true : false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log("Light ID:", id);
        const fetchCurrentStatus = async () => {
            try {
                axios.get(`${base_url}/devices/${id}`)
                    .then((response) => {
                        const data = response.data;
                        setLightData(data);
                        console.log("Light data: ", data)
                        setStatus(data.value === "#000000" ? false : true)
                        if (data.value === "#000000") {
                            setColor("#F2F2F2")
                        } else {
                            setColor(data.value)
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (error) {
                console.log(error)
            }
        }
        fetchCurrentStatus();
        const interval = setInterval(fetchCurrentStatus, 5000);
        return () => clearInterval(interval);
        
    }, [])

    return (
        <View className='flex-1'>
            <ScrollView className='mt-1 mx-2'>
                <View className='flex flex-row'>
                    <View className='w-1/6'>
                        <TouchableOpacity onPress={() => { router.back() }}>
                            <IconSymbol name="back" />
                        </TouchableOpacity>
                    </View>
<<<<<<<< HEAD:app/(root)/devices/lights/[id].tsx
                    <Text className='text-xl font-bold'>Đèn  {lightData && lightData.title}</Text>
                    <View>
========
                    <View className='w-4/6 items-center'>
                        <Text className='text-xl font-bold'>Cảm biến nhiệt {+id + 1}</Text>
>>>>>>>> fe2:app/(root)/devices/sensors/[id].tsx
                    </View>
                </View>

                <DeviceNav current={1} id={+id} type={"sensor"} />


                <View className='flex flex-row mt-4'>
                    <View className='w-1/2 '>
                        <View className='w-full flex items-center'>
                            <Image source={images.lamp} style={{ width: "70%", height: 200 }} />
                            <Image source={images.light} style={{ width: "50%", height: 100, tintColor: `${color}` }}></Image>
                        </View>

                    </View>
                    <View className='w-1/2 flex flex-col items-end justify-center'>
                        <View className='w-40'>
                            <Text className="px-2 w-40 font-semibold"> {status ? "Bật" : "Tắt"}     </Text>
                        </View>
                        <TouchableOpacity onPress={() => { if (status) { powerLight("#000000") } else { powerLight("#FFFFFF") } }} >
                            <Image source={status ? images.auto_on : images.auto_off} />
                        </TouchableOpacity>
                        <View >
                            <View className='mt-4 flex flex-row justify-center items-center'>
                                <TouchableOpacity onPress={() => controlLight("#3C82F6")}>
                                    <View className={`rounded-full mx-2 bg-blue-500  ${color === "#3C82F6" ? "w-8 h-8" : "w-4 h-4"}`}></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => controlLight("white")}>
                                    <View className={`rounded-full mx-2 bg-white  ${color === "white" ? "w-8 h-8" : "w-4 h-4"}`}></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => controlLight("#FFD700")}>
                                    <View className={`rounded-full mx-2 bg-yellow  ${color === "#FFD700" ? "w-8 h-8" : "w-4 h-4"}`}></View>
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
>>>>>>> fe2
