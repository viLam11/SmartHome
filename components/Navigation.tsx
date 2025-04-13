import images from '@/constants/images';
import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const styles = StyleSheet.create({});

const tabs = [
  { index: 1, label: 'Dashboard', icon: images.dashboard, route: '/dashboard' },
  { index: 2, label: 'Rooms', icon: images.door, route: '/rooms/home' },
  { index: 3, label: 'Profile', icon: images.user, route: null },
];

export default function Navigation({ current }) {
  const [currentTab, setCurrentTab] = useState(current);
  const router = useRouter();

  const handleClick = (index, route) => {
    setCurrentTab(index);
    if (route) {
      router.navigate(route);
    }
  };

  const renderTab = (tab) => (
    <View
      key={tab.index}
      className={tab.index === currentTab ? 'w-1/2 items-center justify-center' : 'w-1/4 bg-black'}
    >
      <TouchableOpacity
        onPress={() => handleClick(tab.index, tab.route)}
        className='h-full flex flex-row items-center justify-center'
      >
        <Image
          source={tab.icon}
          style={{ width: tab.index === currentTab ? '30%' : '60%', height: 40 }}
          resizeMode='contain'
        />
        {tab.index === currentTab && (
          <Text className='text-white font-bold text-lg'>{tab.label}</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <View className='h-14 mx-2 rounded-2xl overflow-hidden'>
      <View className='h-full bg-black w-full flex flex-row'>
        {tabs.map(renderTab)}
      </View>
    </View>
  );
}
