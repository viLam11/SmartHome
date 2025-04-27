import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';    
import { useState, useEffect } from 'react';

export default function ConfirmDelete({ isOpen, onClose, onConfirm, deviceName, deleteDeviceId }: any) {

    return (
        <View className='rounded-md bg-white max-w-1/3 mx-auto'>
            <Text>Bạn có chắc chắn muốn xóa thiết bị {deviceName} ?</Text>
            <View className='flex'>
                <Button title="Có" onPress={() => onConfirm(deleteDeviceId)} />
                <Button title="Không" onPress={onClose} />
            </View>
        </View>
    )

}