import { useAuthContext } from '@context';
import { ProfileStackParamList, RootStackParamList, RootTabParamList } from '@navigation/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { spacing } from '@theme/spacing';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Button, List, Text, useTheme } from 'react-native-paper';

type Props = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'ProfileScreen'>,
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

export default function ProfileScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { user } = useAuthContext();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header mode="center-aligned" style={{ backgroundColor: colors.primary }}>
        <Appbar.Content
          title="Meu Perfil"
          titleStyle={{ textAlign: 'center', color: colors.onPrimary }}
        />
        <Appbar.Action
          icon="cog"
          color={colors.onPrimary}
          onPress={() => navigation.navigate('SettingsScreen')}
        />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scroll}>
        {user ? (
          <>
            <View style={styles.avatarContainer}>
              <Avatar.Icon size={96} icon="account" style={{ backgroundColor: colors.primary }} />
              <Text
                variant="titleMedium"
                style={[styles.name, { textAlign: 'center', color: colors.onBackground }]}
              >
                {user.name}
              </Text>
              <Text
                variant="bodySmall"
                style={[styles.email, { textAlign: 'center', color: colors.outline }]}
              >
                {user.email}
              </Text>
            </View>
            <View style={styles.section}>
              <List.Subheader style={{ color: colors.primary }}>Minha Conta</List.Subheader>
              <List.Item
                title="Nome"
                description={user.name}
                left={() => <List.Icon icon="account" />}
              />
              <List.Item
                title="E-mail"
                description={user.email}
                left={() => <List.Icon icon="email" />}
              />
            </View>
          </>
        ) : (
          <View style={styles.guestContainer}>
            <Avatar.Icon
              size={72}
              icon="account-circle-outline"
              style={{ backgroundColor: colors.surfaceVariant, marginBottom: spacing.md }}
            />
            <Text
              variant="titleMedium"
              style={{ textAlign: 'center', color: colors.onBackground, marginBottom: spacing.sm }}
            >
              Você ainda não está logado
            </Text>
            <Text
              variant="bodyMedium"
              style={{ textAlign: 'center', color: colors.outline, marginBottom: spacing.lg }}
            >
              Crie uma conta gratuita ou entre com uma conta existente para aproveitar todos os
              recursos.
            </Text>
            <Button
              mode="contained"
              onPress={() => navigation.replace('AuthScreen')}
              style={{ width: '100%' }}
            >
              Entrar ou Criar Conta
            </Button>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: spacing.lg,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  name: {
    marginTop: spacing.sm,
  },
  email: {
    marginTop: 2,
  },
  section: {
    marginBottom: spacing.xl,
  },
  guestContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
});
