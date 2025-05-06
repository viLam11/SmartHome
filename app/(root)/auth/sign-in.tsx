import AuthForm from '@/components/AuthForm';
import React from 'react';
import { useEffect } from 'react';
import { useNotification } from '@/contexts/NotificationContext';
import { postDevicIP } from '@/services/authService';
export default function SignIn() {
    const { expoPushToken } = useNotification();    
    useEffect(() => {
        if (expoPushToken) {
            const postIP = async () => {
                const response = await postDevicIP(expoPushToken);
            }
            postIP();
        }
    }, [])

    return <AuthForm type="sign-in" />;
}
