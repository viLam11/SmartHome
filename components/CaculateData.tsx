import { useState } from "react";
import { deviceActiveWColorType, runningTimeDeviceType, summaryStatisticType } from "@/types/statistic.type";
import { deviceListObject, DEVICE_FORMAT, deviceStatusObject } from "@/types/device.type";
import { de } from "react-native-paper-dates";

const DEVICE_COLORS: Record<string, string> = {
  light: "bg-yellow",
  fan: "bg-green-400",
  door: "bg-orange-400",
  // sensor: "#000000",
};

export const calculateActiveDevice = (
    deviceList: deviceListObject
  ): deviceActiveWColorType[] => {
    const result: deviceActiveWColorType[] = [];

  Object.entries(deviceList).forEach(([key, devices]) => {
    const config = DEVICE_FORMAT[key];
    if (!config) return;
    let active = 0;
    let inactive = 0;

    devices.forEach((device: deviceStatusObject) => {
      if (key === "lightList") {
        device.value !== "#000000" ? active++ : inactive++;
      } else if (key === "doorList" || key === "fanList") {
        device.value !== "0" ? active++ : inactive++;
      } else if (key === "sensorList") {
        active++;
      }
    });

    result.push({
      type: config.type,
      displayTitle: config.displayTittle,
      active,
      inactive,
      color: DEVICE_COLORS[config.type] || "bg-gray-400",
    });
  });
  return result;
};

const tranferFulltimeToDayMonth = (runningTime: runningTimeDeviceType) => {
  const formattedData: { [key: string]: { [date: string]: number } } = {};

  Object.entries(runningTime).forEach(([key, dates]) => {
    formattedData[key] = {};
    Object.entries(dates).forEach(([date, value]) => {
      const [, month, day] = date.split("-");
      const formattedDate = `${day}/${month}`;
      formattedData[key][formattedDate] = value;
    });
  });

  return formattedData;
};

export const DTOBarData = (OriginData: runningTimeDeviceType) => { // Origindata: light:{ "2025-04-25": 7.615, ...}
  const formattedData = tranferFulltimeToDayMonth(OriginData); // formattedData: light:{ "25/04": 7.615, ...}    

  return Object.entries(formattedData).flatMap(([key, dates]) =>
    Object.entries(dates).map(([date, value]) => ({
      date,
      value,
    }))
  );
};

const reorderDTOData: (DTOData: { date: string; value: number }[]) => { date: string; value: number }[] = (DTOData) => {
  if (DTOData.length <= 1) {
    return [...DTOData];
  }

  const generateCustomIndices = (length: number): number[] => {
    const indices: number[] = [];
    const half = Math.floor(length / 2);
    for (let i = 0; i < half; i++) {
      indices.push(i);
      indices.push(i + half);
    }
    if (length % 2 !== 0) {
      indices.push(half);
    }
    return indices;
  };

  const customIndices = generateCustomIndices(DTOData.length);
  return customIndices.map((index) => DTOData[index]);
};

export const formatBarData = (OriginData: runningTimeDeviceType) => {
  const DTOData = DTOBarData(OriginData); //DTOData: [{date: "25/04", value: 7.615}, ...]
  const keys = Object.keys(OriginData);
  if (keys.length === 1) {
    return DTOData.map((bar) => {
      const numericValue = Number(bar.value);
      const opacity = Math.min(1, Math.max(0.1, numericValue / 10));
      const frontColor = keys[0] === "light" 
        ? `rgba(255, 80, 80, ${opacity})` 
        : `rgba(0, 102, 204, ${opacity})`;

      return {
        value: numericValue,
        frontColor,
        spacing: 24,
        barBorderRadius: 12,
        barWidth: 12,
        label: bar.date,
        labelWidth: 28,
        labelTextStyle: {
          fontSize: 12,
          fontFamily: 'FiraCode-Regular',
          color: 'white',
        },
      };
    });
  }
  const reorderedDTOData = reorderDTOData(DTOData);
  
  return reorderedDTOData.map((bar, index) => {
    const isEven = index % 2 === 0;
    const numericValue = Number(bar.value);
    const opacity = 1;
    const color = isEven
      ? `rgba(255, 80, 80, ${opacity})`
      : `rgba(0, 102, 204, ${opacity})`;
    return {
      value: numericValue,
      frontColor: color,
      spacing: isEven ? 0 : 16,
      barBorderRadius: 12,
      barWidth: 8,
      ...(isEven && {
        label: bar.date,
        labelWidth: 28,
        labelTextStyle: {
          fontSize: 12,
          fontFamily: 'FiraCode-Regular',
          color: 'white',
        },
      }),
    };
  });
};


export const formatPieData = (data: summaryStatisticType) => {
  const total = Object.values(data).reduce((sum, value) => sum + value, 0);
  if (total === 0) return [];

  const formattedData: [string, number][] = Object.entries(data)
    .map(([key, value]) => [key, parseFloat((value / total).toFixed(2))] as [string, number])
    .sort((a, b) => {
      return b[1] - a[1];
    });

  return formattedData;
};

export const caculateMostAndLeastActiveDevice = (deviceData: {[date: string]: number}) => {
  if (!deviceData) return { mostActiveDevice: 'None', leastActiveDevice: 'None' };

  let mostActive: { device: string; value: number } = { device: '', value: 0 };
  let leastActive: { device: string; value: number } = { device: '', value: Infinity };

  for (const [device, value] of Object.entries(deviceData)) {
    if (value > mostActive.value) {
      mostActive = { device, value };
    }
    if (value < leastActive.value) {
      leastActive = { device, value };
    }
  }

  return { mostActiveDevice: mostActive.device, leastActiveDevice: leastActive.device };
}