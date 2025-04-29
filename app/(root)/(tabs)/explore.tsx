import React, { useEffect } from 'react';
import { connectAndSend } from '@/services/mqttService';


export default function App() {
  useEffect(() => {
    connectAndSend();
  }, []);

  return null;
}
