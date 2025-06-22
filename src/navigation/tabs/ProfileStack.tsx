import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import ProfileScreen from '@screens/Profile/ProfileScreen';
import SettingsScreen from '@screens/Settings/SettingsScreen';
import React from 'react';

import { ProfileStackParamList } from '../types';

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> = NativeStackScreenProps<
  ProfileStackParamList,
  T
>;

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ title: 'Perfil' }}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{ title: 'Configurações' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
