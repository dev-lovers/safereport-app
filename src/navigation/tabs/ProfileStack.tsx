import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Perfil do Usuário</Text>
    </View>
  );
}

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Stack.Navigator>
  );
}
