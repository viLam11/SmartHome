import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import images from '@/constants/images';

type Props = {
  status: boolean;
  setStatusAuto: (status: boolean) => void;
};

export default function AutoToggle({ status, setStatusAuto }: Props) {
  return (
    <View className="flex flex-row">
      <View className='w-40'>
        <Text className="px-2 w-40 font-semibold">Tự động:     </Text>
      </View>
      <TouchableOpacity onPress={() => setStatusAuto(!status)}>
        <Image source={status ? images.auto_on : images.auto_off} />
      </TouchableOpacity>
    </View>
  );
}

