import { View, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { timeADayObject } from '@/types/statistic.type';

export default function BarChartAnimated({ barData }: { barData: timeADayObject[]}) {
  const maxHeight = 160;

  const data = barData.map((bar) => {
    const opacity = Math.max(0.2, bar.value/24);
    const color = `rgba(128, 0, 128, ${opacity})`;

    return {
      value: bar.value,
      label: bar.date,
      frontColor: color,
      spacing: 12,
      barBorderRadius: 12,
      labelTextStyle: {
        fontSize: 12,
        fontFamily: 'FiraCode-Regular',
        color: 'black',
      },
    };
  });

  return (
    <View className="justify-center items-center bg-white rounded-2xl p-4 pl-1">
      <Text className="text-lg font-bold mb-2">Running Time</Text>
      <BarChart
        data={data}
        height={maxHeight}
        barWidth={22}
        noOfSections={6}
        maxValue={24}
        isAnimated
        animationDuration={500}
        yAxisTextStyle={{
          fontSize: 12,
        }}
        barBorderRadius={10}
        initialSpacing={10}
        yAxisThickness={0}
        xAxisThickness={0}
      />
    </View>
  );
}
