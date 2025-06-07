import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

function ReportScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Nova Denúncia</Text>
    </View>
  );
}

export default function ReportStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ReportScreen" component={ReportScreen} options={{ title: 'Denúncia' }} />
    </Stack.Navigator>
  );
}
