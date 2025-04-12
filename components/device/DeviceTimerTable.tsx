import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Table, Row } from 'react-native-table-component';

const tableHead = ["Start", "End", "Brightness", "Edit"];
const tableData = [
  ["17:00", "16:00", "nhẹ", ".."],
  ["20:00", "21:00", "nhẹ", ".."]
];

const renderCell = (data, index ) => {
  if (index === 3) {
    return (
      <TouchableOpacity onPress={() => alert("Xóa hàng này")}> 
        <Text style={{ color: "red", textAlign: "center" }}>Xóa</Text>
      </TouchableOpacity>
    );
  }
  return <Text>{data}</Text>;
};

export default function DeviceTimerTable() {
  return (
    <View>
      <View className="flex flex-row justify-between">
        <Text className="font-semibold mt-4">Hẹn giờ</Text>
        <TouchableOpacity onPress={() => alert('Thêm hẹn giờ')}>
          <View className="bg-black rounded-full">
            <Text className="text-white text-lg px-2">+</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ borderWidth: 1, borderColor: "black", borderRadius: 10, overflow: "hidden" }}>
        <Table borderStyle={{ borderWidth: 0 }}>
          <Row
            data={tableHead}
            style={{ height: 40, backgroundColor: "#FFD700", borderBottomWidth: 1, borderColor: "black" }}
            textStyle={{ textAlign: "center", fontWeight: "bold" }}
          />
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
  );
}