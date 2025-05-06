import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';


const tableHead = ['Hoạt động', 'Thời gian']
const  widthArr =  [56, 44]

export default function TableHistory({ tableData }) {
    return (
          <View className='h-full overflow-hidden' style={{ borderRadius: 8, overflow: 'hidden', margin: 10 }}>
            <Table className="w-10/12 mx-auto text-xl text-black rounded-md" style={styles.header} borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              <Row data={tableHead}  className="h-10 align-middle text-center " flexArr={widthArr} textStyle={styles.textHead} />
            </Table>
            <ScrollView  className="" >
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9', radius: 40}} style={styles.dataWrapper}>
                {
                  tableData.map((rowData, index) => (
                    <TableWrapper key={index} style={{ flexDirection: 'row' }}>
                    <Cell
                      data={rowData[0]}
                      flex={widthArr[0]}
                      style={styles.row}
                      textStyle={styles.textLeft}
                    />
                    <Cell
                      data={rowData[1]}
                      flex={widthArr[1]}
                      style={styles.row}
                      textStyle={styles.textCenter}
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
  header: { height: 40, backgroundColor: '#FFD700'},
  textHead: { textAlign: 'center', fontWeight: '600', fontSize: 14},
  textLeft: { textAlign: 'left', fontSize: 14, paddingLeft: 8 },
  textCenter: { textAlign: 'center', fontSize: 14 },
  dataWrapper: { marginTop: -1 },
  row: { height: 40}
});