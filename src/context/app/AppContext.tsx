import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AppContextData, UserLocation } from './types';

const AppContext = createContext<AppContextData>({} as AppContextData);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  const fetchUserLocation = async () => {
    setIsLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') throw new Error('Permissão de localização negada');

      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setUserLocation(coords);
      await AsyncStorage.setItem('userLocation', JSON.stringify(coords));
    } catch (error) {
      console.error('Erro ao obter localização:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPersistedLocation = async () => {
    const stored = await AsyncStorage.getItem('userLocation');
    if (stored) setUserLocation(JSON.parse(stored));
  };

  useEffect(() => {
    loadPersistedLocation();
    fetchUserLocation();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        userLocation,
        setUserLocation,
        fetchUserLocation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
