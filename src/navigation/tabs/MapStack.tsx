import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from '@screens/Map/MapScreen';
import React from 'react';

import { MapStackParamList } from '../types';

const Stack = createNativeStackNavigator<MapStackParamList>();

export default function MapStack() {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ title: 'Mapa' }} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
