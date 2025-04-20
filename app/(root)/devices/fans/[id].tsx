import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, View, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';

import DeviceHeader from '@/components/device/DeviceHeader';
import Navigation from '@/components/Navigation';
import SpinningFan from '@/components/SpinningFan';
import DeviceTimerTable from '@/components/device/DeviceTimerTable';

import images from '@/constants/images';
import { getDeviceData, controlDevice } from '@/services/deviceService';
import { getSchedule, setSchedule } from '@/services/scheduleService';
import { deviceStatusObject } from '@/types/device.type';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { useLoading } from '@/contexts/LoadingContext';


const formatTime = (date: Date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const hourString = hours.toString().padStart(2, '0');

  return `${hourString}:${minutes} ${ampm}`;
};

export default function Fan() {
  const feedId = useLocalSearchParams().id;
  const [speed, setSpeed] = useState(0);
  const [status, setStatus] = useState(false);
  const [statusAuto, setSatusAuto] = useState(false);
  const [deviceData, setDeviceData] = useState<deviceStatusObject | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [timer, setTimer] = useState(0);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [modal, setModal] = useState(false);
  const [scheduleTime, setScheduleTime] = useState(new Date());
  const [scheduleLevel, setScheduleLevel] = useState(0);
  const [scheduleDays, setScheduleDays] = useState([2]);
  const [tableData, setTableData] = useState([])
  const { setLoading } = useLoading();

  useEffect(() => {
    const fetchCurrentStatus = async () => {
      setLoading(true);
      try {
        const response = await getDeviceData(feedId as string);
        setDeviceData(response);
        const level = response?.value;
        const levelSpeedMap = [0, 150, 100, 25];
        setSpeed(levelSpeedMap[+level] || 0);
        setStatus(+level > 0);
      } catch (error) {
        console.error("Error fetching device data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentStatus();
  }, [feedId]);

  useEffect(() => {
    const fetchSchedule = async () => {
        const response = await getSchedule(feedId as string);
        const schedules = response;
        const newSchedules = schedules.map((item : any) => {
            let formatedDays = item.repeatDays.split(',').map((day : string) => {
                if (day == "Mon") return "T2"
                if (day == "Tue") return "T3"
                if (day == "Wed") return "T4"
                if (day == "Thu") return "T5"
                if (day == "Fri") return "T6"
                if (day == "Sat") return "T7"
                if (day == "Sun") return "CN"
            })
            return [
                item.scheduledTime, 
                item.action, 
                formatedDays.join(", "),
            ];
        });
        setTableData(newSchedules); 
    }
    fetchSchedule();
  }, [showPicker, modal]);

  async function handleFanSpeed(level: number) {
    if (!status && level === 0) return;
    try {
      await controlDevice(feedId as string, level.toString());
      const levelSpeedMap = [0, 150, 100, 25];
      setSpeed(levelSpeedMap[level]);
      setStatus(!!level);
    } catch (e) {
      console.log('Error: ', e);
    }
  }
  const onChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowPicker(false);
  
    if (selectedTime) {
      if (timer == 0) {
        setStartTime(selectedTime);
      } else {
        setEndTime(selectedTime);
      }
    }
  };
  
  function handleScheduleDays(day: number){
      let temp = [2,3,4,5,6,7,8]
      if (!temp.includes(day)) return 
      if(scheduleDays.includes(day)){
          setScheduleDays(scheduleDays.filter(item => item !== day));
      } else {
          setScheduleDays([...scheduleDays, day]);
      }
  }
  async function handleSetSchedule() {     
      let time = formatTime(scheduleTime);
      time = time.split(" ")[0] + ":00";
      let days = [];
      days = scheduleDays.map((item) => {
          if (item == 2) return "Mon"
          if (item == 3) return "Tue"
          if (item == 4) return "Wed"
          if (item == 5) return "Thu" 
          if (item == 6) return "Fri"
          if (item == 7) return "Sat"
          if (item == 8) return "Sun"
      })
      let Sdays = ""
      for(let x of days){ Sdays += x +','}
      Sdays = Sdays.substring(0, Sdays.length - 1)
      
      const payload = {
          deviceId: +feedId,
          action: scheduleLevel.toString(),
          scheduledTime: time,
          repeatDays: Sdays   
      }
      console.log("check repeat days: ", payload)    
      const response = await setSchedule(payload);
      if (response.status == 200) {
          alert("Thêm lịch thành công")
          setModal(false);
      }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="min-h-screen flex flex-col m-2">
      <DeviceHeader feedId={+feedId} title={deviceData ? `${deviceData.type} ${deviceData.title}` : null} />

      <View className="flex flex-row mt-10">
        <View className="w-1/2">
          <SpinningFan speed={speed} />
          <View className="flex flex-row items-center justify-center">
            {[1, 2, 3].map((lvl, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleFanSpeed(lvl)}
                className={`w-6 h-6 mx-1 rounded-full ${speed === [150, 100, 25][i] ? 'bg-yellow' : 'bg-gray-500'} flex items-center justify-center`}
              >
                <Text className="text-white">{lvl}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="w-1/2 flex flex-col items-end px-4">
          <View className="flex flex-row">
            <Text className="px-2 w-20 font-semibold">{status ? 'Bật' : 'Tắt'}</Text>
            <TouchableOpacity onPress={() => handleFanSpeed(status ? 0 : 1)}>
              <Image source={status ? images.auto_on : images.auto_off} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="mx-2 mt-4">
        <View className="flex flex-row">
          <View className="w-40">
            <Text className="px-2 w-40 font-semibold">Tự động: </Text>
          </View>
          <TouchableOpacity onPress={() => setSatusAuto(!statusAuto)}>
            <Image source={statusAuto ? images.auto_on : images.auto_off} />
          </TouchableOpacity>
        </View>
        <DeviceTimerTable setModal={setModal}/>
      </View>

      <View className="flex-grow" />
      <View className="h-32">
        <View className="bottom-8 w-full">
          <Navigation current={2} />
        </View>
      </View>
      {modal && <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
            setModal(false);
        }}
        className='bg-green-50 z-20'
    >
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, justifyContent: 'flex-end' }}
        >
          <View className="bg-gray-400 h-54 w-full bottom-0 z-20 rounded-3xl my-auto p-2">
            <View className='w-full flex flex-row justify-between items-center'>
              <Text className='text-2xl font-bold m-2 text-gray-50'>Hẹn giờ</Text>
              <View className='flex flex-row'>
                <TouchableOpacity onPress={() => handleSetSchedule()}>
                  <Text className='text-black font-bold bg-white p-2 mx-4'>Lưu</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModal(false)}>
                  <IconSymbol name="close" color="white" className="absolute right-0 top-2" />
                </TouchableOpacity>
              </View>                    
            </View>

            <View className='flex flex-row items-center justify-center w-full mx-auto mt-6'>
                <View>
                    <TouchableOpacity onPress={() => { setTimer(0); setShowPicker(true) }} className="bg-white p-3 rounded-lg shadow">
                        <Text className='font-bold text-3xl'>{formatTime(startTime)}</Text>
                    </TouchableOpacity>
                </View>
                {/* <Text className='font-bold text-3xl'>  -  </Text>
                <View>
                    <TouchableOpacity onPress={() => { setTimer(1); setShowPicker(true) }} className="bg-white p-3 rounded-lg shadow">
                        <Text className='font-bold text-3xl'>{formatTime(endTime)}</Text>
                    </TouchableOpacity>
                </View> */}
                {showPicker && (
                    <DateTimePicker
                        value={timer == 0 ? startTime : endTime}
                        mode="time"
                        is24Hour={false}
                        display="spinner"
                        onChange={onChange}
                    />
                )}
            </View>
            <View className='w-full flex flex-row mt-2'>
                <Text className='text-lg font-bold text-white text-left'>Mức độ:</Text>
                {[1, 2, 3].map((level) => (
                    <TouchableOpacity key={level} onPress={() => setScheduleLevel(level)}>
                        <Text className={`rounded-full mx-2 h-8 w-8 items-center text-center font-bold ${scheduleLevel === level ? 'bg-yellow' : 'bg-white'}`}>
                            {level}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View className='w-full flex flex-row mt-2'>
              <Text className='text-lg font-bold text-white text-left'>Ngày lặp lại:</Text>
              {[2, 3, 4, 5, 6, 7, 8].map((day, index) => (
                <TouchableOpacity key={day} onPress={() => handleScheduleDays(day)}>
                    <Text className={`rounded-full mx-2 h-8 w-8 items-center text-center font-bold ${(scheduleDays.includes(day)) ? 'bg-yellow' : 'bg-white'}`}>
                        {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'][index]}
                    </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </KeyboardAvoidingView>
    </Modal>
    }
    </ScrollView>
  );
}
