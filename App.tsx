import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppProvider, AuthProvider, PreferencesProvider, ReportProvider } from '@context';

import RootNavigator from '@navigation/RootNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <AuthProvider>
          <PreferencesProvider>
            <ReportProvider>
              <PaperProvider>
                <SafeAreaProvider>
                  <StatusBar style="dark" />
                  <RootNavigator />
                </SafeAreaProvider>
              </PaperProvider>
            </ReportProvider>
          </PreferencesProvider>
        </AuthProvider>
      </AppProvider>
    </GestureHandlerRootView>
  );
}
