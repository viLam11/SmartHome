import { View, Text, TouchableOpacity, Button } from 'react-native';
import { useState } from 'react';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { IconSymbol } from './ui/IconSymbol';

export function SelectDayRange({ selectedDates, setSelectedDates, onCancel, onConfirm }) {
    const [isVisible, setIsVisible] = useState(false);
    const defaultStyles = useDefaultStyles();

    return (
        <View>
            <View className='flex flex-row w-11/12 mx-auto border rounded-lg items-center max-h-12'>
                <View className=" w-4/5 rounded-lg p-3 flex flex-row  mx-autoitems-center justify-center">
                    <View className="text-center ">
                        <Text className="text-center">{selectedDates.startDate.format('DD MMM, YYYY')}</Text>
                    </View>
                    <View>
                        <Text className='mx-2'>-</Text>
                    </View>
                    <View>
                        <Text>{selectedDates.endDate.format('DD MMM, YYYY')}</Text>
                    </View>
                </View>
                <View className="mx-auto w-1/5 h-full jusitfy-center items-center rounded-lg">
                    <TouchableOpacity onPress={() => {
                        // setSelectedDates({
                        //     startDate: dayjs(new Date()),
                        //     endDate: dayjs(new Date()),
                        // })
                        setIsVisible(!isVisible);
                    }}>
                        <View className='w-full h-full mx-auto justify-center items-center'>
                            <IconSymbol name="calendar" color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {isVisible && (
                <View className='border rounded-lg my-4 shadow-black'>
                    <DateTimePicker
                        mode="range"
                        startDate={selectedDates.startDate}
                        endDate={selectedDates.endDate}
                        onChange={({ startDate, endDate }) => {
                            const finalEndDate = endDate ?? startDate;
                            setSelectedDates({
                                startDate: dayjs(startDate),
                                endDate: dayjs(endDate),
                            });
                            console.log('Selected range:', startDate, '-', endDate);
                        }}
                        onConfirm={() => setIsVisible(false)}
                        locale='vi'
                        timeZone="Asia/Ho_Chi_Minh"
                        styles={{
                            day: {
                                textAlign: 'center',
                                color: '#1c1c1e',
                                fontSize: 12,
                            },
                            day_cell: {
                                padding: 2,
                                borderRadius: 8,
                            },
                            'selected_month': { backgroundColor: '#B7D5EE', borderRadius: 0 },
                            'months': { textTransform: 'capitalize' },
                            'month_label': { textTransform: 'capitalize' },
                            'month': { fontWeight: 'bold', fontSize: 16, textTransform: 'uppercase' },
                            'month_selector_label': { fontWeight: 'bold', color: 'black', fontSize: 14, textTransform: 'uppercase' },
                            'year_selector_label': { fontWeight: 'bold', color: 'black', fontSize: 14 },
                            'header': { fontFamily: 'Arial', fontSize: 16, color: '#1c1c1e', textTransform: 'uppercase' },
                            'weekday_label': { fontWeight: 'bold', color: 'black' },
                            'range_start': { backgroundColor: '#007AFF', borderRadius: 0 },
                            'range_start_label': { color: '#fff', fontWeight: 'bold' },
                            'range_middle': { backgroundColor: '#E0F0FF', borderRadius: 0 },
                            'range_middle_label': { color: '#007AFF', fontWeight: 'bold' },
                            'range_end': { backgroundColor: '#007AFF', borderRadius: 0 },
                            'range_end_label': { color: '#fff', fontWeight: 'bold' },
                            'start_date': {
                                backgroundColor: '#007AFF',
                                borderRadius: 0,
                            },
                            'start_date_label': {
                                color: '#fff',
                                fontWeight: 'bold',
                            },
                        }}
                    />
                    <View className="flex flex-row items-center justify-center w-11/12 mx-auto mb-2 mt-safe-or-2">
                        <View className=" bg-gray-50 p-2 mr-2 w-20 items-center border">
                            <TouchableOpacity onPress={onCancel}>
                                <Text className='font-bold uppercase'>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                        <View className=" bg-blue-500 p-2 ml-2 w-20 items-center ">
                            <TouchableOpacity onPress={onConfirm}>
                                <Text className='text-white font-bold text-md uppercase'>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}

        </View>


    );
}