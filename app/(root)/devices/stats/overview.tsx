import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BarChartAnimated } from '@/components/chart/BarChartAnimated';


const barData : any[] =  [
    {value: 250, label: '1/1'},
    {value: 500, label: '2/1'},
    {value: 745, label: '3/1'},
    {value: 320, label: 'T'},
    {value: 600, label: 'F'},
    {value: 256, label: 'S'},
    {value: 300, label: 'S'},
  ];
export default function Overview(deviceData: any) {
    return (
        <View>
            <BarChartAnimated setRoom={() => { }} setType={() => { }} barData={ barData} />
        </View>
    );
}

const styles = StyleSheet.create({})

