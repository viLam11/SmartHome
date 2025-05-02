import init from 'react_native_mqtt';
import { Client, Message } from 'react-native-paho-mqtt';



// Tạo bộ nhớ tạm thay cho localStorage
const myStorage: {
    [key: string]: any;
    setItem: (key: string, item: any) => void;
    getItem: (key: string) => any;
    removeItem: (key: string) => void;
  } = {
    setItem: (key, item) => { myStorage[key] = item; },
    getItem: (key) => myStorage[key],
    removeItem: (key) => { delete myStorage[key]; },
  };

// 👇 Phải gọi cái này trước khi tạo Client
init({
  size: 10000,
  storageBackend: {
    setItem: (key, item) => { myStorage[key] = item; },
    getItem: (key) => myStorage[key],
    removeItem: (key) => { delete myStorage[key]; },
  },
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
});



// Tạo client
const client = new Client({
  uri: 'wss://io.adafruit.com:443/mqtt',
  clientId: 'client-' + Math.random().toString(16).substr(2, 8),
  storage: myStorage,
});

// Lắng nghe sự kiện
client.on('connectionLost', (responseObject) => {
  if (responseObject.errorCode !== 0) {
    console.log('Connection Lost:', responseObject.errorMessage);
  }
});

client.on('messageReceived', (message) => {
  console.log('Message received:', message.payloadString);
});

// Hàm khởi tạo kết nối
export const connectAndSend = async () => {
  try {
    await client.connect({
      userName: process.env.ADAFRUIT_USERNAME,
      password: process.env.ADAFRUIT_PASSWORD,
      useSSL: true,
    });

    console.log('✅ Connected to Adafruit IO');

    // Đăng ký topic
    await client.subscribe('olivia0307/feeds/bbc-led');
    console.log('✅ Subscribed to bbc-led');

    // Gửi thử 1 message
    const message = new Message('1');
    message.destinationName = 'olivia0307/feeds/bbc-led';
    client.send(message);g
    console.log('📤 Message sent');
  } catch (err) {
    console.log('❌ Connection or subscription error:', err);
  }
};
