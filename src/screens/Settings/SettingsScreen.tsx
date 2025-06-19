import { useNotificationsContext, usePreferencesContext } from '@context';
import { ProfileStackScreenProps } from '@navigation/tabs/ProfileStack';
import { spacing } from '@theme/spacing';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Divider, List, Switch, useTheme } from 'react-native-paper';

type Props = ProfileStackScreenProps<'SettingsScreen'>;

export default function SettingsScreen({ navigation }: Props) {
  const { theme, toggleTheme } = usePreferencesContext();
  const { notificationsEnabled, toggleNotifications } = useNotificationsContext();
  const { colors } = useTheme();

  const handleToggleNotifications = async () => {
    try {
      await toggleNotifications();
    } catch (error) {
      console.warn('Erro ao alternar notificações:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header mode="center-aligned" style={{ backgroundColor: colors.primary }}>
        <Appbar.BackAction color={colors.onPrimary} onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Configurações"
          titleStyle={{ textAlign: 'center', color: colors.onPrimary }}
        />
      </Appbar.Header>
      <View style={styles.content}>
        <List.Item
          title="Tema escuro"
          titleStyle={{ color: colors.onBackground }}
          left={() => <List.Icon icon="theme-light-dark" color={colors.primary} />}
          right={() => (
            <Switch value={theme === 'dark'} onValueChange={toggleTheme} color={colors.primary} />
          )}
        />
        <List.Item
          title="Notificações"
          titleStyle={{ color: colors.onBackground }}
          left={() => <List.Icon icon="bell-outline" color={colors.primary} />}
          right={() => (
            <Switch
              value={notificationsEnabled}
              onValueChange={handleToggleNotifications}
              color={colors.primary}
            />
          )}
        />
        <Divider style={styles.divider} />
        <List.Item
          title="Privacidade"
          titleStyle={{ color: colors.onBackground }}
          left={() => <List.Icon icon="shield-lock-outline" color={colors.primary} />}
          right={() => <List.Icon icon="chevron-right" color={colors.onBackground} />}
          onPress={() => {}}
        />
        <List.Item
          title="Sobre o app"
          titleStyle={{ color: colors.onBackground }}
          left={() => <List.Icon icon="information-outline" color={colors.primary} />}
          right={() => <List.Icon icon="chevron-right" color={colors.onBackground} />}
          onPress={() => {}}
        />
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
  divider: {
    marginVertical: spacing.md,
  },
});
