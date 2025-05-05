import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import * as Notifications from "expo-notifications";
import { Subscription } from "expo-modules-core";
import { registerForPushNotificationsAsync } from "@/utils/registerForPushNotificationsAsync";
import { useRouter } from "expo-router";
import { getAuthHeaders, postDevicIP } from "@/services/authService";
interface NotificationContextType {
  expoPushToken: string | null;
  notification: Notifications.Notification | null;
  error: Error | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const router = useRouter();
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [token, setToken] = useState<string | null>(null);  

  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  const router = useRouter();
  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) =>{
        setExpoPushToken(token);
        console.log("Expo Push Token: ", token);
      },
      (error) => setError(error)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("🔔 Notification Received: ", notification);
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(
          "🔔 Notification Response: ",
          JSON.stringify(response, null, 2),
          JSON.stringify(response.notification.request.content.data, null, 2)
        );
        // Handle the notification response here
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  useEffect(() => {
    const getHeader = async () => {
      const response = await getAuthHeaders();
      console.log("Header: ", response.headers.Authorization);
      setToken(response.headers.Authorization);
    }
    getHeader();  
  }, [])

  useEffect(() => {
    if (expoPushToken) {
      const postToken = async () => {
        try {
          await getAuthHeaders();
          const response = await postDevicIP(expoPushToken);
          console.log('hello: ', expoPushToken);
          console.log('Response:', response);
        } catch (error) {
          console.error('Error posting token:', error);
        }
      };
  
      postToken();
    }
  }, [expoPushToken]);

  return (
    <NotificationContext.Provider
      value={{ expoPushToken, notification, error }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
