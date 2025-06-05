import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <PaperProvider>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <Text style={styles.title}>SafeReport</Text>
            <Text style={styles.subtitle}>
              Aplicativo de denúncias seguras e anônimas
            </Text>
            <StatusBar style="dark" />
          </View>
        </SafeAreaView>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
