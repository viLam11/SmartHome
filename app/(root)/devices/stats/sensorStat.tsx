import { LineChart, BarChart } from "react-native-gifted-charts"
import React from "react"
import { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native"

export default function App() {
    
    const dumpData = [
        { value: 0, dataPointText: '0', label: "12/1" },
        { value: 10, dataPointText: '10' },
        { value: 8, dataPointText: '8' },
        { value: 58, dataPointText: '58' },
        { value: 56, dataPointText: '56' },
        { value: 78, dataPointText: '78' },
        { value: 74, dataPointText: '74' },
        { value: 98, dataPointText: '98' },
    ];

    const [lineData, setLineData] = useState(dumpData);


    return (
        <View className="w-11/12 mx-auto">
            <View className="mt-4">
                <Text className="text-center text-lg font-bold ">Biểu đồ nhiệt độ</Text>
            </View>
            <ScrollView horizontal={true}>
                <LineChart
                    data={lineData}
                    height={250}
                    showVerticalLines
                    spacing={40}
                    initialSpacing={10}
                    color1="orange"
                    textColor1="black"
                    dataPointsHeight={6}
                    dataPointsWidth={6}
                    dataPointsColor1="red"
                    textShiftY={0}
                    textShiftX={0}
                    textFontSize={13}
                />
            </ScrollView>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                    <View style={{ width: 10, height: 10, backgroundColor: 'red', marginRight: 5 }} />
                    <Text>Nhiệt độ</Text>
                </View> */}

                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 10, height: 10, backgroundColor: 'blue', marginRight: 5 }} />
                    <Text>Độ ẩm</Text>
                </View> */}
            </View>
        </View>


    );
};