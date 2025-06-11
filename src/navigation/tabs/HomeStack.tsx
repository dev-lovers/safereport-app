import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screens/Home/HomeScreen';
import React from 'react';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false, title: 'Home' }}
      />
    </Stack.Navigator>
  );
}
