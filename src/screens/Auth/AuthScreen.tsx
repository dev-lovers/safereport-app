import { RootStackParamList } from '@navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { spacing } from '@theme/spacing';
import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Appbar, Button, Text, TextInput, useTheme } from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParamList, 'AuthScreen'>;

export default function AuthScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = () => {
    if (!email.trim() || !password.trim()) return;
    console.log(`${isLogin ? 'Login' : 'Cadastro'} realizado com:`, { email, password });
    setEmail('');
    setPassword('');
    navigation.replace('Root', { screen: 'HomeStack', params: { screen: 'HomeScreen' } });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header mode="center-aligned" style={{ backgroundColor: colors.primary }}>
        <Appbar.Content
          title={isLogin ? 'Bem-vindo' : 'Crie sua conta'}
          titleStyle={{ textAlign: 'center', color: colors.onPrimary }}
        />
      </Appbar.Header>
      <View style={styles.content}>
        <Image
          source={require('@assets/logos/logo.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text variant="titleMedium" style={styles.title}>
          {isLogin ? 'Acesse sua conta' : 'Cadastre-se para começar'}
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          {isLogin
            ? 'Faça login para registrar e acompanhar suas denúncias.'
            : 'Preencha os campos abaixo para criar sua conta.'}
        </Text>
        <TextInput
          mode="outlined"
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button mode="contained" onPress={handleAuth} style={styles.button}>
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </Button>
        <Button mode="text" onPress={() => setIsLogin(!isLogin)} style={styles.toggleButton}>
          {isLogin ? 'Criar uma conta' : 'Já tenho uma conta'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  image: {
    height: 160,
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  input: {
    marginBottom: spacing.md,
  },
  button: {
    marginTop: spacing.sm,
  },
  toggleButton: {
    marginTop: spacing.sm,
    alignSelf: 'center',
  },
});
