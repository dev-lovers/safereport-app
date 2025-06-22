import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import ReportScreen from '@screens/Report/ReportScreen';
import React from 'react';

import { ReportStackParamList } from '../types';

export type ReportStackScreenProps<T extends keyof ReportStackParamList> = NativeStackScreenProps<
  ReportStackParamList,
  T
>;

const Stack = createNativeStackNavigator<ReportStackParamList>();

export default function ReportStack() {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="ReportScreen"
          component={ReportScreen}
          options={{ title: 'Denúncia' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
