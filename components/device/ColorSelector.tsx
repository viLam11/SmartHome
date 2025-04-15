import React from 'react';
import { View, TouchableOpacity } from 'react-native';

type Props = {
  color: string;
  controlLight: (color: string) => void;
};

const colors = ["#3C82F6", "white", "#FFD700"];

export default function ColorSelector({ color, controlLight }: Props) {
  return (
    <View className='mt-4 flex flex-row justify-center items-center'>
      <TouchableOpacity onPress={() => controlLight("#3C82F6")}>
        <View className={`rounded-full mx-2 bg-blue-500  ${color === "#3C82F6" ? "w-8 h-8" : "w-4 h-4"}`}></View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => controlLight("white")}>
        <View className={`rounded-full mx-2 bg-white  ${color === "white" ? "w-8 h-8" : "w-4 h-4"}`}></View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => controlLight("#FFD700")}>
        <View className={`rounded-full mx-2 bg-yellow  ${color === "#FFD700" ? "w-8 h-8" : "w-4 h-4"}`}></View>
      </TouchableOpacity>
    </View>
  );
}
