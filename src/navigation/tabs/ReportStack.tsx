import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReportScreen from '@screens/Report/ReportScreen';
import React from 'react';

const Stack = createNativeStackNavigator();

export default function ReportStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={{ headerShown: false, title: 'Denúncia' }}
      />
    </Stack.Navigator>
  );
}
