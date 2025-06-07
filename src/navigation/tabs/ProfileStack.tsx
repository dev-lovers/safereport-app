import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '@screens/Profile/ProfileScreen';
import React from 'react';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false, title: 'Perfil' }}
      />
    </Stack.Navigator>
  );
}
