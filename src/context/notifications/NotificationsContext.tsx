import '../notifications/notificationHandler';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';

import { NotificationContextData } from '../types';

const NotificationContext = createContext<NotificationContextData>({} as NotificationContextData);

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [lastNotification, setLastNotification] = useState<Notifications.Notification | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const notificationListener = useRef<ReturnType<
    typeof Notifications.addNotificationReceivedListener
  > | null>(null);
  const responseListener = useRef<ReturnType<
    typeof Notifications.addNotificationResponseReceivedListener
  > | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('notificationsEnabled').then(value => {
      if (value !== null) setNotificationsEnabled(value === 'true');
    });
  }, []);

  useEffect(() => {
    if (notificationsEnabled) {
      registerForPushNotificationsAsync().then(token => {
        if (token) setExpoPushToken(token);
      });

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setLastNotification(notification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        const data = response.notification.request.content.data;
        console.log('Interação com notificação:', data);
      });
    }

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, [notificationsEnabled]);

  async function requestPermission(): Promise<boolean> {
    if (expoPushToken) return true;

    const token = await registerForPushNotificationsAsync();
    const granted = !!token;
    if (granted) setExpoPushToken(token);
    return granted;
  }

  async function scheduleNotification(title: string, body: string, data: Record<string, any> = {}) {
    if (!title || !body) {
      console.warn('[Notificação] Título e corpo são obrigatórios.');
      return;
    }

    if (!notificationsEnabled) return;

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5,
        repeats: false,
      },
    });
  }

  const toggleNotifications = async (): Promise<void> => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(newValue));

    if (!newValue) {
      setExpoPushToken(null);
    }
  };

  async function registerForPushNotificationsAsync(): Promise<string | null> {
    if (expoPushToken) return expoPushToken;

    if (!Device.isDevice) {
      Alert.alert('Notificações', 'As notificações funcionam apenas em dispositivos físicos.');
      return null;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Permissão negada', 'Você não permitiu o uso de notificações.');
      return null;
    }

    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) throw new Error('Project ID não encontrado.');

      const tokenData = await Notifications.getExpoPushTokenAsync({ projectId });
      console.log('[ExpoPushToken]', tokenData.data);
      return tokenData.data;
    } catch (error) {
      console.error('Erro ao obter token de push:', error);
      return null;
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        expoPushToken,
        requestPermission,
        scheduleNotification,
        lastNotification,
        notificationsEnabled,
        toggleNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationsContext = () => useContext(NotificationContext);
