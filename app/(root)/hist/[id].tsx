import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Table, Row } from "react-native-table-component";
import Navigation from '@/components/Navigation';
import DeviceNav from '@/components/DeviceNav';

const renderCell = (data, index) => {
    if (index === 3) {
        return (
            <TouchableOpacity onPress={() => alert("Xóa hàng này")}>
                <Text style={{ color: "red", textAlign: "center" }}>Xóa</Text>
            </TouchableOpacity>
        );
    }
    return <Text>{data}</Text>;
};

export default function History({}) {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const tableHead = ["Hoạt động", "Thời gian", "Người thực hiện"];
    const tableData = [
        ["17:00", "16:00", "nhẹ"],
        ["20:00", "21:00", "nhẹ"],
        ["17:00", "16:00", "nhẹ"]
    ];

    return (
        <View className="flex-1">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='mt-1 flex-grow mx-2 min-h-screen'>
                <View>
                    <View className='flex flex-row justify-between'>
                        <View className="mx -2">
                            <TouchableOpacity onPress={() => { router.back() }}>
                                <IconSymbol name="back" />
                            </TouchableOpacity>
                        </View>
                        <Text className='text-xl font-bold'>Đèn {+id}</Text>
                        <View>
                        </View>
                    </View>

                    <DeviceNav current={2} id={+id} type="light" />
                    

                    <View className='my-10'>
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
            </ScrollView>
            <View className="absolute bottom-2 w-full">
                <Navigation current={2} />
            </View>
        </View>

    )
}