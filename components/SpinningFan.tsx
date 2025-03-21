import images from '@/constants/images';
import React from 'react';
import { useRef, useEffect } from 'react';
import { View, Image, Animated } from 'react-native';

const SpinningFan = ({speed}) => {
  const spinValue = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    console.log("##@", speed);
    spinValue.setValue(0); // Reset animation value
    const animation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: + speed, // Duration is controlled by `speed`
        useNativeDriver: true,
      })
    );

    animation.start();
    return () => animation.stop(); // Stop animation when component unmounts or speed changes
  }, [speed]); // Re-run effect when `speed` changes


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

