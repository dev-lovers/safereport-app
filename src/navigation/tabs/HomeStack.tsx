import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screens/Home/HomeScreen';
import React from 'react';

import { HomeStackParamList } from '../types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
