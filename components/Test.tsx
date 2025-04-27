import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';   
const Test = () => {
    const [startDate, setStartDate] = useState(new Date());
    console.log(startDate)
    return (
        <View>
            <Text>Test</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Test;
