import React from "react"
import {View, Text} from 'react-native'
import { IconSymbol } from "@/components/ui/IconSymbol";    

export default function NotiCard({time,  message }) {    
    return(
        <View className="my-2">
            <Text className="text-gray-400">{time}</Text>
            <View className="p-2 bg-gray-100 rounded-lg">
                <Text className="text-lg">{message}</Text>
            </View>
        </View>
    )

}