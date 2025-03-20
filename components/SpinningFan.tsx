import images from '@/constants/images';
import React from 'react';
import { useRef, useEffect } from 'react';
import { View, Image, Animated } from 'react-native';

const SpinningFan = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 100, // Quay 1 vòng trong 1 giây
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View className='flex flex-col items-center'>
      <Animated.Image
        source={images.canh_quat}
        style={{ width: 120, height: 120, transform: [{ rotate: spin }] }}
      />
      <Image source={images.than_quat}  style={{ width: 160, height: 60}} resizeMode='contain' ></Image>
    </View>
  

  );
};

export default SpinningFan;

