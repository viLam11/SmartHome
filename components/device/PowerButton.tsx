import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import images from '@/constants/images';

type Props = {
  status: boolean;
  powerLight: (value: string) => void;
};

export default function PowerButton({ status, powerLight }: Props) {
  return (
    <TouchableOpacity onPress={() => { if (status) { powerLight("#000000") } else { powerLight("#F2F2F2") } }}>
        <Image source={status ? images.auto_on : images.auto_off} />
    </TouchableOpacity>
  );
}

