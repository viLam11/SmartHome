import axios from "axios"

const base_url = process.env.EXPO_PUBLIC_API_URL;   
const ADA_USER = process.env.ADAFRUIT_USERNAME;
export const fetchSensorDataByTime = async ({ startTime, endTime, feedKey }: { startTime: string, endTime: string, feedKey: string }) => {
    try {
        console.log("Start time: ", startTime);
        console.log("End time: ", endTime);
        console.log("Feed key: ", feedKey); 
        console.log("ADA USER: ", ADA_USER);    
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

            return {
                value: value,
                dataPointText: value.toString(),
                label: vnTime
            };
        });
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
        const response = await axios.post(`${base_url}/statistic/sensor/3014285`, {
            "start": startTime,
            "end": endTime
        })
        const data : Record<string, number> = response.data;
        const result = Object.entries(data).map(([key, value]) => {
            const [year, month, day] = key.split("-");
            return {
                label: `${day}/${month}`, // Định dạng dd/MM
                value: parseFloat(value.toFixed(2)), // Làm tròn còn 2 chữ số
                dataPointText: parseFloat(value.toFixed(2)).toString(), // Giá trị hiển thị trên điểm dữ liệu
                dataPointTextColor: "black", // Màu chữ hiển thị trên điểm dữ liệu
            };
        });
        return result;   
    } catch (error) {
        return {
        status: 400,
        data: error,  
        }
    }
}