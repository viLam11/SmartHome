import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Property = () => {
    const {id} = useLocalSearchParams();
    return (
        <View>
            <Text>Property {id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Property;
