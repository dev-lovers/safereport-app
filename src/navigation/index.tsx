import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeStack from './tabs/HomeStack';
import ProfileStack from './tabs/ProfileStack';
import ReportStack from './tabs/ReportStack';
import { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.outline,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.outlineVariant ?? colors.outline,
          borderTopWidth: 0.5,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 6,
          paddingTop: 4,
        },
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
      <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: 'Home' }} />
      <Tab.Screen name="ReportStack" component={ReportStack} options={{ title: 'Denúncia' }} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}
