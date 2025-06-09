import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { AppTheme, PreferencesContextData } from '../types';

const PreferencesContext = createContext<PreferencesContextData>({} as PreferencesContextData);

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<AppTheme>('light');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    const loadPreferences = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      const storedNotifications = await AsyncStorage.getItem('notificationsEnabled');

      if (storedTheme === 'dark' || storedTheme === 'light') {
        setTheme(storedTheme);
      }
      if (storedNotifications !== null) {
        setNotificationsEnabled(storedNotifications === 'true');
      }
    };
    loadPreferences();
  }, []);

  const toggleTheme = async () => {
    const newTheme: AppTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  const toggleNotifications = async () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    await AsyncStorage.setItem('notificationsEnabled', String(newValue));
  };

  return (
    <PreferencesContext.Provider
      value={{ theme, toggleTheme, notificationsEnabled, toggleNotifications }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferencesContext = () => useContext(PreferencesContext);
