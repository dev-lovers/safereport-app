import { usePreferencesContext } from '@context';
import GlobalProvider from '@context/GlobalProvider';
import RootNavigator from '@navigation/RootNavigator';
import { getTheme } from '@theme';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GlobalProvider>
        <ThemedApp />
      </GlobalProvider>
    </GestureHandlerRootView>
  );
}

function ThemedApp() {
  const { theme } = usePreferencesContext();
  const currentTheme = getTheme(theme === 'dark');

  return (
    <PaperProvider theme={currentTheme}>
      <SafeAreaProvider>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        <RootNavigator />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
