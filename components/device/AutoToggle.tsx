import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import images from '@/constants/images';

type Props = {
  enabled: boolean;
  onToggle: () => void;
};

export default function AutoToggle({ enabled, onToggle }: Props) {
  return (
    <View className="flex flex-row">
      <View className='w-40'>
        <Text className="px-2 w-40 font-semibold">Tự động:</Text>
      </View>
      <TouchableOpacity onPress={onToggle}>
        <Image source={enabled ? images.auto_on : images.auto_off} />
      </TouchableOpacity>
    </View>
  );
}
