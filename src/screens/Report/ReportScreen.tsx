import { spacing } from '@theme/spacing';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Text, useTheme } from 'react-native-paper';

export default function ReportScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header mode="center-aligned" style={{ backgroundColor: colors.primary }}>
        <Appbar.Content
          title="Nova Denúncia"
          titleStyle={{ textAlign: 'center', color: colors.onPrimary }}
        />
      </Appbar.Header>
      <View style={styles.content}>
        <Text style={{ textAlign: 'center', color: colors.onBackground, fontSize: 16 }}>
          Área para criar uma nova denúncia
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
});
