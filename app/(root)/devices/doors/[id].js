import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import images from '@/constants/images';
import { useState, useEffect } from 'react';
import DeviceNav from '@/components/DeviceNav';
import Navigation from '@/components/Navigation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

const base_url = 'https://nearby-colleen-quanghia-3bfec3a0.koyeb.app/api/v1';

const tableData = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['OK', 0, 'Del']];

export default function Door() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [doorData, setDoorData] = useState(null);
    const [status, setStatus] = useState(false);
    const [token, setToken] = useState(null);

    const [visible, setVisible] = useState(false);
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchToken = async () => {
            let t = await AsyncStorage.getItem("authToken")
            setToken(t)
        }
        fetchToken()
    }, [])

    useEffect(() =>{
        if (!token) return  
        const fetchDoorData = async () => {
            try {
                const response = await axios.get(`${base_url}/devices/${id}`, {
                    headers: {
                        Authorization: token
                    }
                })
                console.log("### RESPONSE : ", response.data);
                setDoorData(response.data);
                setStatus(response.data.value == 0 ? false : true) 
            } catch (error) {
                console.log(error)
            }
        }
        fetchDoorData()
    }, [token])
 
    async function hanldeOpenDoor() {
        if (!token) return
        console.log("check pass: ", password)
        if (password.length == 0) {
            alert("Vui lòng nhập mật khẩu")
            return
        }
        try {
            const response = await axios.post(`${base_url}/devices/${id}/checkpwd`, {
                pwd: password
            }, {
                headers: {
                    Authorization: token
                }
            })
            if (response.status == 401) {
                alert("Mật khẩu không đúng")
            } else {
                setPassword('')
                alert("Mở cửa thành công")
                setStatus(true)
                await axios.post(`${base_url}/devices/${id}`, {
                    value: 1
                }, {
                    headers: {
                        Authorization: token
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }

    }

    async function handleCloseDoor() {
        if (!token) return
        try {
            const response = await axios.post(`${base_url}/devices/${id}`, {
                value: "0"
            }, {
                headers: {
                    Authorization: token
                }
            })
            setPassword('')
            alert("Khóa cửa thành công")
            setStatus(false)
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='min-h-screen flex-1 m-2'>
            <View className="flex-1">
                <View className='flex flex-row justify-between'>
                    <View className="mx -2">
                        <TouchableOpacity onPress={() => { router.back() }}>
                            <IconSymbol name="back" color="black" />
                        </TouchableOpacity>
                    </View>
                    <Text className='text-xl font-bold'>Cửa {+id}</Text>
                    <View>
                    </View>
                </View>
                <DeviceNav current={1} id={+id} type={"fan"} />
                <View className="mt-6">
                    <View className="flex flex-row mt-6">
                        <View className='w-2/5 h-60 '>
                            <Image source={images.smart_door} style={{ height: 200 }} />
                        </View>
                        <View className='w-3/5 h-60 items-center'>
                            <View className="flex flex-row h-1/3 justify-center items-center">
                                <View className='w-20'>
                                    <Text className="px-2 w-40 font-semibold"> {status ? "Mở" : "Khóa"}     </Text>
                                </View>
                                <TouchableOpacity onPress={() => { if(status == true) { handleCloseDoor() } else {hanldeOpenDoor()} }}>
                                    <Image source={status ? images.auto_on : images.auto_off} />
                                </TouchableOpacity>
                            </View>

                            <View className=" h-2/3 justify-center items-center flex flex-row">
                                {Array.from(password).map((char, index) => (
                                    <Text key={index} className="text-3xl font-bold underline mx-1 text-blue-600 min-w-2">  {char === ' ' ? ' ' : (visible ? char : '*')} </Text>
                                ))
                                }
                                <View className="ml-2">
                                    { password.length > 0 && <TouchableOpacity onPress={() => { setVisible(!visible) }}>
                                        <IconSymbol name={visible ? "eye" : "eye.slash"} />
                                    </TouchableOpacity> }
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className=""></View>
                    {/* keyboard */}
                    <View className="mt-20 bg-green-200">
                        <Table>
                            {
                                tableData.map((rowData, index) => (
                                    <Row data={rowData.map((cellData, index) => (
                                        <Cell 
                                            data={
                                               <View>
                                                    <TouchableOpacity onPress={() => { (cellData == "Del") ? setPassword(password.substring(0, password.length - 1)) : (cellData == "OK" ? hanldeOpenDoor() : setPassword(password + cellData)) }}>
                                                        <Text className="text-2xl font-bold text-center">  {cellData} </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            } 
                                            style={styles.row} 
                                            textStyle={styles.textRow}>
                                        </Cell>
                                    ))}></Row>
                                ))
                            }
                        </Table>
                    </View>
                </View>
            </View>

            <View className="h-24">
                <Navigation current={2} />
            </View>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: { margin: 10 },
    row: { height: 60, backgroundColor: '#fff', borderColor: '#C1C0B9' },
    textRow: { textAlign: 'center', fontSize: 20, fontWeight: '600', color: '#000' },
})