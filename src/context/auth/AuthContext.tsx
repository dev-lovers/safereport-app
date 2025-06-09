import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { AuthContextData, User } from '../types';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoredAuth = async () => {
      const storedToken = await AsyncStorage.getItem('authToken');
      const storedUser = await AsyncStorage.getItem('user');
      if (storedToken && storedUser) {
        setAuthToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    loadStoredAuth();
  }, []);

  const signIn = async (token: string, userData: User) => {
    setAuthToken(token);
    setUser(userData);
    setIsAuthenticated(true);
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  const signOut = async () => {
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, authToken, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
