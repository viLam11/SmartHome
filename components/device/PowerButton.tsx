import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import images from '@/constants/images';

type Props = {
  onPress: () => void;
};

export default function PowerButton({ onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={images.power} />
    </TouchableOpacity>
  );
}
