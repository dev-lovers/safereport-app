import { useAuthContext, useNotificationsContext } from '@context';
import { HomeStackParamList, RootTabParamList } from '@navigation/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { spacing } from '@theme/spacing';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Button, Card, Text, useTheme } from 'react-native-paper';

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'HomeScreen'>,
  BottomTabScreenProps<RootTabParamList>
>;

export default function HomeScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { user } = useAuthContext();
  const { notificationsEnabled } = useNotificationsContext();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header mode="center-aligned" style={{ backgroundColor: colors.primary }}>
        <Appbar.Content
          title="SafeReport"
          titleStyle={{ textAlign: 'center', color: colors.onPrimary }}
        />
      </Appbar.Header>
      <View style={styles.content}>
        <Card mode="contained" style={styles.card}>
          <Card.Title
            title={`Olá, ${user?.name || 'visitante'} 👋`}
            subtitle="Bem-vindo ao SafeReport"
            left={() => <Avatar.Icon icon="shield-check" size={40} />}
          />
          <Card.Content>
            <Text variant="bodyMedium" style={{ marginBottom: spacing.sm }}>
              Este aplicativo foi criado para facilitar o envio de denúncias anônimas com
              geolocalização. Sua colaboração pode tornar a cidade mais segura.
            </Text>
            <Button
              mode="contained"
              onPress={() =>
                navigation.navigate('ReportStack', {
                  screen: 'ReportScreen',
                })
              }
              style={{ marginBottom: spacing.sm }}
            >
              Registrar denúncia
            </Button>
            {!notificationsEnabled && (
              <Text variant="labelSmall" style={{ color: colors.error }}>
                ⚠️ As notificações estão desativadas.
              </Text>
            )}
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  card: {
    padding: spacing.md,
  },
});
