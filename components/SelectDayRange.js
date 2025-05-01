import { View, Text } from 'react-native';
import { useState } from 'react';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

export function SelectDayRange() {
    const defaultStyles = useDefaultStyles();
    const [selectedDates, setSelectedDates] = useState({
        startDate: dayjs(),
        endDate: dayjs().add(2, 'day'),
    });


    return (
        <View>
            <View>
                <Text>Chọn ngày</Text>
            </View>
            <View className='border rounded-lg my-4 shadow-black'>
                <DateTimePicker
                    mode="range"
                    startDate={selectedDates.startDate}
                    endDate={selectedDates.endDate}
                    onChange={({ startDate, endDate }) => {
                        setSelectedDates({ startDate, endDate });
                        console.log('Selected range:', startDate, '-', endDate);
                    }}
                    locale='vi'
                    timeZone="Asia/Ho_Chi_Minh"
                    styles={{
                        day: {
                            textAlign: 'center',
                            color: '#1c1c1e',
                        },
                        day_cell: {
                            padding: 2,
                            borderRadius: 8,
                            //   backgroundColor: 'yellow',
                        },
                        'selected_month': { backgroundColor: '#B7D5EE', borderRadius: 0 },
                        'month': { fontWeight: 'bold', fontSize: 20 },
                        'month_selector_label': { fontWeight: 'bold', color: 'black', fontSize: 18 },
                        'year_selector_label': { fontWeight: 'bold', color: 'black', fontSize: 18 },
                        'header': { fontFamily: 'Arial', fontSize: 16, color: '#1c1c1e' },
                        'weekday_label': { fontWeight: 'bold', color: 'black' },
                        'range_start': { backgroundColor: '#007AFF', borderRadius: 0 },
                        'range_start_label': { color: '#fff', fontWeight: 'bold' },
                        'range_middle': { backgroundColor: '#E0F0FF', borderRadius: 0 },
                        'range_middle_label': { color: '#007AFF', fontWeight: 'bold' },
                        'range_end': { backgroundColor: '#007AFF', borderRadius: 0 },
                        'range_end_label': { color: '#fff', fontWeight: 'bold' },
                    }}

                />
            </View>
        </View>


    );
}