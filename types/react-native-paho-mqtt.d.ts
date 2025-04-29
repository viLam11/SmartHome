declare module 'react-native-paho-mqtt' {
    export class Client {
      constructor(options: any);
      on(event: string, callback: (data: any) => void): void;
      connect(options?: any): Promise<void>;
      subscribe(topic: string, options?: any): Promise<void>;
      send(message: Message): void;
      disconnect(): Promise<void>;
    }
  
    export class Message {
      payloadString: string;
      destinationName: string;
      constructor(payload: string);
    }
  }
  