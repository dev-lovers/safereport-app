import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeStack from './tabs/HomeStack';
import ProfileStack from './tabs/ProfileStack';
import ReportStack from './tabs/ReportStack';
import { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: 'Início' }} />
      <Tab.Screen name="ReportStack" component={ReportStack} options={{ title: 'Denúncia' }} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}
