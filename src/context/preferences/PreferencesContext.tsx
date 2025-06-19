import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { AppTheme, PreferencesContextData } from '../types';

const PreferencesContext = createContext<PreferencesContextData>({} as PreferencesContextData);

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<AppTheme>('light');

  useEffect(() => {
    const loadPreferences = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme === 'dark' || storedTheme === 'light') {
        setTheme(storedTheme);
      }
    };
    loadPreferences();
  }, []);

  const toggleTheme = async () => {
    const newTheme: AppTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  return (
    <PreferencesContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferencesContext = () => useContext(PreferencesContext);
