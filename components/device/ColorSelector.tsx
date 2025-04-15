import React from 'react';
import { View, TouchableOpacity } from 'react-native';

type Props = {
  color: string;
  onChange: (color: string) => void;
};

const colors = ["blue", "white", "yellow"];

export default function ColorSelector({ color, onChange }: Props) {
  return (
    <View className='mt-4 flex flex-row justify-center items-center'>
        <TouchableOpacity onPress={() => onChange(colors[0])}>
          <View className={`rounded-full mx-2 bg-${colors[0]}-500 ${color === colors[0] ? "w-8 h-8" : "w-4 h-4"}`} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onChange(colors[1])}>
          <View className={`rounded-full mx-2 bg-${colors[1]} ${color === colors[1] ? "w-8 h-8" : "w-4 h-4"}`} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onChange(colors[2])}>
          <View className={`rounded-full mx-2 bg-${colors[2]} ${color === colors[2] ? "w-8 h-8" : "w-4 h-4"}`} />
        </TouchableOpacity>
    </View>
  );
}
