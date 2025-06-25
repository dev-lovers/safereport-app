import { ReportStackParamList, RootTabParamList } from '@navigation/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { spacing } from '@theme/spacing';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button, Text, TextInput, useTheme } from 'react-native-paper';

type Props = CompositeScreenProps<
  NativeStackScreenProps<ReportStackParamList, 'ReportScreen'>,
  BottomTabScreenProps<RootTabParamList>
>;

export default function ReportScreen({ navigation }: Props) {
  const { colors } = useTheme();

  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!description.trim()) return;
    console.log('📤 Denúncia enviada:', description);
    setDescription('');
    navigation.navigate('HomeStack', {
      screen: 'HomeScreen',
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header mode="center-aligned" style={{ backgroundColor: colors.primary }}>
        <Appbar.Content
          title="Nova Denúncia"
          titleStyle={{ textAlign: 'center', color: colors.onPrimary }}
        />
      </Appbar.Header>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
        keyboardVerticalOffset={90}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text variant="titleMedium" style={[styles.label, { color: colors.onBackground }]}>
            Descreva o ocorrido:
          </Text>
          <TextInput
            mode="outlined"
            placeholder="Digite detalhes sobre a situação observada..."
            multiline
            numberOfLines={6}
            value={description}
            onChangeText={setDescription}
            style={[styles.textArea, { textAlignVertical: 'top' }]}
          />
          <Button
            mode="contained"
            onPress={handleSubmit}
            disabled={!description.trim()}
            style={styles.button}
          >
            Enviar denúncia
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    padding: spacing.lg,
  },
  label: {
    marginBottom: spacing.sm,
  },
  textArea: {
    marginBottom: spacing.lg,
  },
  button: {
    marginTop: spacing.md,
  },
});
