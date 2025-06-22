import { ProfileStackParamList, RootTabParamList } from '@navigation/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { spacing } from '@theme/spacing';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Avatar, List, Text, useTheme } from 'react-native-paper';

type Props = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'ProfileScreen'>,
  BottomTabScreenProps<RootTabParamList>
>;

export default function ProfileScreen({ navigation }: Props) {
  const { colors } = useTheme();

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
        <View style={styles.avatarContainer}>
          <Avatar.Icon size={96} icon="account" style={{ backgroundColor: colors.primary }} />
          <Text
            variant="titleMedium"
            style={[styles.name, { textAlign: 'center', color: colors.onBackground }]}
          >
            User
          </Text>
          <Text
            variant="bodySmall"
            style={[styles.email, { textAlign: 'center', color: colors.outline }]}
          >
            user@gmail.com
          </Text>
        </View>
        <View style={styles.section}>
          <List.Subheader style={{ color: colors.primary }}>Minha Conta</List.Subheader>
          <List.Item title="Nome" description="User" left={() => <List.Icon icon="account" />} />
          <List.Item
            title="E-mail"
            description="user@gmail.com"
            left={() => <List.Icon icon="email" />}
          />
        </View>
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
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: spacing.sm,
  },
  email: {
    fontSize: 14,
    marginTop: 2,
  },
  section: {
    marginBottom: spacing.xl,
  },
});
