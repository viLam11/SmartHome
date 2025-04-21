import { LineChart, BarChart } from "react-native-gifted-charts"
import React from "react"
import { View, ScrollView, Text } from "react-native"

export default function App() {

    
const barData = [
    {value: 30, label: 'Mon'},
    {value: 45, label: 'Tue'},
    {value: 28, label: 'Wed'},
    {value: 80, label: 'Thu'},
    {value: 65, label: 'Fri'},
  ];
    const lineData = [
        { value: 0, dataPointText: '0' },
        { value: 10, dataPointText: '10' },
        { value: 8, dataPointText: '8' },
        { value: 58, dataPointText: '58' },
        { value: 56, dataPointText: '56' },
        { value: 78, dataPointText: '78' },
        { value: 74, dataPointText: '74' },
        { value: 98, dataPointText: '98' },
    ];

    const lineData2 = [
        { value: 0, dataPointText: '0' },
        { value: 20, dataPointText: '20' },
        { value: 18, dataPointText: '18' },
        { value: 40, dataPointText: '40' },
        { value: 36, dataPointText: '36' },
        { value: 60, dataPointText: '60' },
        { value: 54, dataPointText: '54' },
        { value: 85, dataPointText: '85' },
    ];
    return (
        <View className="w-11/12 mx-auto">
            <ScrollView horizontal={true}>
                <LineChart
                    data={lineData}
                    data2={lineData2}
                    height={250}
                    showVerticalLines
                    spacing={50}
                    initialSpacing={0}
                    color1="skyblue"
                    color2="orange"
                    textColor1="green"
                    dataPointsHeight={6}
                    dataPointsWidth={6}
                    dataPointsColor1="blue"
                    dataPointsColor2="red"
                    textShiftY={-2}
                    textShiftX={-5}
                    textFontSize={13}
                />
            </ScrollView>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                    <View style={{ width: 10, height: 10, backgroundColor: 'red', marginRight: 5 }} />
                    <Text>Temperature</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 10, height: 10, backgroundColor: 'blue', marginRight: 5 }} />
                    <Text>Humidity</Text>
                </View>
            </View>
        </View>


    );
};