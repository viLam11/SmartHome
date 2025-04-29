import { getSchedule } from '@/services/scheduleService';
import React, { Component, useEffect, useState } from 'react';
import { Button, Text } from 'react-native';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { deleteSchedule } from '@/services/scheduleService';

const tableHead = ['Thời gian', 'Mức độ', 'Ngày lặp', 'Sửa']
const widthArr = [25, 20, 30, 25]

export default function ScheduleTable({ modal, feedId }) {
  const [tableData, setTableData] = useState([]); 
  async function handleDeleteSchedule(index) {
      cosnole.log("Delete schedule with id: ", index);  
      response = await deleteSchedule(index);
      if (response.status == 200) {
        console.log("Delete schedule successfully");
        const newSchedules = tableData.filter((item) => item[3] !== index);
        setTableData(newSchedules); 
      }
  }

  useEffect(() => {
    const fetchScheduleTable = async () => {
      const response = await getSchedule(+feedId);
      if (response.status == 200) {
        const newSchedules = response.data.map((item) => {
          let formatedDays = item.repeatDays.split(',').map((day) => {
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
            item.id
          ];
        });
        console.log(newSchedules);
        setTableData(newSchedules);
      }
    }
    fetchScheduleTable();
  }, [modal])

  return (
    <View className='h-full' style={{ borderRadius: 8, overflow: 'hidden', margin: 10 }}>
      <Table className="w-10/12 mx-auto text-xl text-black rounded-md" style={styles.header} borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
        <Row data={tableHead} className="h-10 align-middle text-center " flexArr={widthArr} textStyle={styles.textHead} />
      </Table>
      <ScrollView className="" >
        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9', radius: 40 }} style={styles.dataWrapper}>
          {
            tableData.map((rowData, index) => (
              <TableWrapper key={index} style={{ flexDirection: 'row' }}>
                <Cell
                  data={rowData[0]}
                  flex={widthArr[0]}
                  style={styles.row}
                  textStyle={styles.textCenter}
                />
                <Cell
                  data={rowData[1]}
                  flex={widthArr[1]}
                  style={styles.row}
                  textStyle={styles.textCenter}
                />
                <Cell
                  data={rowData[2]}
                  flex={widthArr[2]}
                  style={styles.row}
                  textStyle={styles.textCenter}
                />
                <Cell
                  flex={widthArr[3]}
                  style={[styles.row, { alignItems: 'center' }]}  // Center nội dung
                  textStyle={styles.textCenter}
                  data={
                    <TouchableOpacity onPress={() => handleDeleteSchedule(rowData[3])} >
                      <Text className="text-lg color-red-600 font-bold">Xóa</Text>
                    </TouchableOpacity>
                  }

                />


              </TableWrapper>
            ))
          }
        </Table>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 40, backgroundColor: '#FFD700' },
  textHead: { textAlign: 'center', fontWeight: '600', fontSize: 14 },
  textLeft: { textAlign: 'left', fontSize: 14, paddingLeft: 8 },
  textCenter: { textAlign: 'center', fontSize: 14 },
  dataWrapper: { marginTop: -1 },
  row: { height: 40 }
});