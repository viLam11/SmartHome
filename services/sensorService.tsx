import axios from "axios"

const base_url = process.env.EXPO_PUBLIC_API_URL;   
const ADA_USER = process.env.ADAFRUIT_USERNAME;
export const fetchSensorDataByTime = async ({ startTime, endTime, feedKey }: { startTime: string, endTime: string, feedKey: string }) => {
    try {
        console.log("Start time: ", startTime);
        console.log("End time: ", endTime);
        console.log("Feed key: ", feedKey); 
        console.log("ADA USER: ", ADA_USER);    
        console.log("API: ", `https://io.adafruit.com/api/v2/ThuanTrinh7845/feeds/${feedKey}/data/chart`);
        console.log("payload: ", {
            params: {
                start_time: startTime,
                end_time: endTime,
                resolution: 1
            }
        })
        const response = await axios.get(`https://io.adafruit.com/api/v2/${ADA_USER}/feeds/${feedKey}/data/chart`, {
            params: {
                start_time: startTime,
                end_time: endTime,
                resolution: 1
            }
        })
        console.log(response.data.data)
        let sensorData = response.data.data.map((item: [string, string]) => {
            const value = parseFloat(item[1]);
            const utcDate = new Date(item[0]);
            const vnTime = utcDate.toLocaleString("vi-VN", {
                timeZone: "Asia/Ho_Chi_Minh",
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            });

            console.log("DATA BY TIME: ", sensorData    )

            return {
                value: value,
                dataPointText: value.toString(),
                label: vnTime,
                hidden: value == 0.0 ? true : false
            };
        });
        console.log("SENSOR DATA: ", sensorData);
        return sensorData   
    } catch (error) {
        return [];
    }
}

export const fetchSensorDataByDay = async ({ startTime, endTime, feedId }: { startTime: string, endTime: string, feedId: number }) => {
    try {
        console.log("START: ", startTime); 
        console.log("END: ", endTime);
        console.log("Feed id: ", feedId);
        console.log("payload: ", {
            "start": startTime,
            "end": endTime
        })
        const response = await axios.post(`${base_url}/statistic/sensor/${feedId}`, {
            "start": startTime,
            "end": endTime
        })
        console.log("RESPONSE: ", response.data);   
        const data : Record<string, number> = response.data;
        const result = Object.entries(data).slice(1).map(([key, value]) => {
            const [year, month, day] = key.split("-");
            return {
                label: `${day}/${month}`, 
                value: parseFloat(value.toFixed(2)), 
                dataPointText: parseFloat(value.toFixed(2)).toString(), 
                dataPointTextColor: "black", 
                hidden: parseFloat(value.toFixed(2)) == 0.0 ? true : false
            };
        });
        console.log("RESULT: ", result);
        return result;   
    } catch (error) {
        return {
        status: 400,
        data: error,  
        }
    }
}

export const fetchCurrentSensorData = async (feedId: number) => {
    try {
        const response = await axios.get(`${base_url}/sensors/${feedId}`)
        return response.data;   
    } catch (error) {
        return {
            status: 400,
            data: error,  
        }
    }

}

// 3014285, brightness 3017352, humidity 3017353 
export const getAllSensorSat = async (startDate: string, endDate: string) => { 
    try {
        const [data1, data2, data3] = await Promise.all([
            fetchSensorDataByDay({ startTime: startDate, endTime: endDate, feedId: 3014285 }),
            fetchSensorDataByDay({ startTime: startDate, endTime: endDate, feedId: 3017352 }),
            fetchSensorDataByDay({ startTime: startDate, endTime: endDate, feedId: 3017353 })
        ])
        const result = {
            temperature: data1,
            brightness: data2,
            humidity: data3
        }
        console.log("RESULT: ", result);
        return result;
        
    } catch (error) {
        return error;
    }
}