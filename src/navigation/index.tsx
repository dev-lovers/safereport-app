import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeStack from './tabs/HomeStack';
import ProfileStack from './tabs/ProfileStack';
import ReportStack from './tabs/ReportStack';
import { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'HomeStack':
              iconName = 'home';
              break;
            case 'ReportStack':
              iconName = 'report';
              break;
            case 'ProfileStack':
              iconName = 'person';
              break;
            default:
              iconName = 'help-outline';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: 'Início' }} />
      <Tab.Screen name="ReportStack" component={ReportStack} options={{ title: 'Denúncia' }} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}
