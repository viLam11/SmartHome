// import React from "react"
// import {View, Text} from 'react-native'
// import { IconSymbol } from "@/components/ui/IconSymbol";    

// export default function NotiCard({time,  message }) {    
//     return(
//         <View className="my-2 ">
//             <Text className="text-gray-400">{time}</Text>
//             <View className="p-2 bg-gray-100 rounded-lg flex flex-row">
//                 <IconSymbol name="warning" color="red"/>
//                 <Text className="text-lg font-bold"> Vượt ngưỡng {message}</Text>
//             </View>
//         </View>
//     )

// }
import { View, Text, TouchableOpacity } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function NotiCard({ time, message }) {
  return (
    <TouchableOpacity
      className="flex flex-row items-start p-4 bg-white border-black  rounded-xl shadow-lg mb-3 active:opacity-80"
    >
      <View className="p-2 bg-red-100 rounded-full mr-3">
        <IconSymbol name="warning" color="#E53935" size={24} />
      </View>
      <View className="flex-1">
        <Text className="text-lg font-semibold mb-1">{message}</Text>
        <Text className="text-md text-gray-400">{time}</Text>
      </View>
    </TouchableOpacity>
  );
}
