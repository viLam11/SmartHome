import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Table, Row } from "react-native-table-component";
import Navigation from '@/components/Navigation';

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

export default function History() {
    const {id} = useLocalSearchParams();
    const router = useRouter();
    const tableHead = ["Hoạt động", "Thời gian", "Người thực hiện"];
    const tableData = [
      ["17:00", "16:00", "nhẹ", ".."],
      ["20:00", "21:00", "nhẹ", ".."]
    ];
  
    return(
    <ScrollView className='mt-1 mx-2 min-h-screen'>
        <View className='flex flex-row justify-between'>    
            <View className="mx -2">
                <TouchableOpacity onPress={() => {router.back()}}>
                        <IconSymbol name="back" />    
                </TouchableOpacity>
            </View>
                <Text className='text-xl font-bold'>Đèn {+id}</Text>
            <View>
            </View>
        </View>

        <View className='flex flex-row  justify-between mt-2 mx-6'>   
            <View className="w-1/4 bg-disale p-1 rounded-lg">
                <TouchableOpacity onPress={() => router.replace(`/lights/1`)}>
                    <Text className='text-center font-semibold color-slate-600'>Cài đặt</Text>
                </TouchableOpacity>
            </View>
            <View className="w-1/4 bg-enable p-1 rounded-lg">
                    <Text className='text-center font-semibold color-black'>Lịch sử</Text>
            </View>
            <View className="w-1/4 bg-disable p-1 rounded-lg">
                <Text className='text-center font-semibold color-slate-600'>Thống kê</Text>
            </View>
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
        
        <View className="flex-grow" >
            <Text></Text>
        </View>

        <Navigation current={2} />
    </ScrollView>
    )
}