import { spacing } from '@theme/spacing';
import { Incident, Victim } from '@types';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const MAX_HEIGHT = Dimensions.get('window').height * 0.75;

function translateSituation(situation: string): string {
  const map: Record<string, string> = {
    Dead: 'Morto',
    Wounded: 'Ferido',
  };
  return map[situation] ?? situation;
}

function cleanValue(value?: string | null): string {
  return value && value !== 'Não se aplica' && value !== 'Não identificado' ? value : '—';
}

function translate(value?: string | null): string {
  const map: Record<string, string> = {
    Child: 'Criança',
    Teen: 'Adolescente',
    Adult: 'Adulto',
    Elderly: 'Idoso',
    Male: 'Masculino',
    Female: 'Feminino',
    Other: 'Outro',
    Civilian: 'Civil',
    Police: 'Policial',
    Military: 'Militar',
    Unknown: 'Desconhecido',
    'On Duty': 'Em serviço',
    'Off Duty': 'Fora de serviço',
    Student: 'Estudante',
    Unemployed: 'Desempregado',
    Retired: 'Aposentado',
    Candidate: 'Candidato',
    'Elected Official': 'Cargo Eletivo',
    Running: 'Em campanha',
    Elected: 'Eleito',
    'Not Running': 'Não candidato',
    'Military Police': 'Polícia Militar',
    'Civil Police': 'Polícia Civil',
    'Federal Police': 'Polícia Federal',
    Active: 'Ativo',
    Inactive: 'Inativo',
  };
  return value && map[value] ? map[value] : cleanValue(value);
}

export function IncidentModal({ incident }: { incident: Incident }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.md }}>
        <Text variant="titleMedium" style={{ color: colors.onBackground, textAlign: 'center' }}>
          {incident.contextInfo.mainReason.name}
        </Text>
        <Text variant="bodyMedium" style={{ color: colors.onBackground, textAlign: 'center' }}>
          {incident.address}
        </Text>
        <Text variant="bodyMedium" style={{ color: colors.onBackground, textAlign: 'center' }}>
          Data: {new Date(incident.date).toLocaleDateString('pt-BR')}
        </Text>
        {incident.victims.length > 0 ? (
          incident.victims.map((victim: Victim, index: number) => (
            <View key={victim.id} style={{ marginTop: index > 0 ? spacing.md : spacing.sm }}>
              <Text variant="titleSmall" style={{ color: colors.onBackground }}>
                🧍 Vítima {index + 1}:
              </Text>
              <Text variant="bodyMedium" style={{ color: colors.onBackground }}>
                • Situação: {translateSituation(victim.situation)}
              </Text>
              <Text variant="bodyMedium" style={{ color: colors.onBackground }}>
                • Idade: {victim.age ?? 'Não informada'} ({translate(victim.ageGroup?.name)})
              </Text>
              <Text variant="bodyMedium" style={{ color: colors.onBackground }}>
                • Gênero: {translate(victim.genre?.name)}
              </Text>
              <Text variant="bodyMedium" style={{ color: colors.onBackground }}>
                • Raça: {translate(victim.race)}
              </Text>
              <Text variant="bodyMedium" style={{ color: colors.onBackground }}>
                • Tipo: {translate(victim.personType)}
              </Text>
              <Text variant="bodyMedium" style={{ color: colors.onBackground }}>
                • Local do ocorrido: {translate(victim.place?.name)}
              </Text>
              <Text variant="bodyMedium" style={{ color: colors.onBackground }}>
                • Status de serviço: {translate(victim.serviceStatus?.name)}
              </Text>
              <Text variant="bodyMedium" style={{ color: colors.onBackground }}>
                • Qualificação: {translate(victim.qualifications[0]?.name)}
              </Text>
              <Text variant="bodyMedium" style={{ color: colors.onBackground }}>
                • Cargo político: {translate(victim.politicalPosition?.name)}
              </Text>
              <Text variant="bodyMedium" style={{ color: colors.onBackground }}>
                • Situação política: {translate(victim.politicalStatus?.name)}
              </Text>
              <Text variant="bodyMedium" style={{ color: colors.onBackground }}>
                • Cargo de agente: {translate(victim.agentPosition?.name)}
              </Text>
              <Text variant="bodyMedium" style={{ color: colors.onBackground }}>
                • Situação do agente: {translate(victim.agentStatus?.name)}
              </Text>
              {victim.deathDate && (
                <Text variant="bodyMedium" style={{ color: colors.onBackground }}>
                  • Data da morte: {new Date(victim.deathDate).toLocaleDateString('pt-BR')}
                </Text>
              )}
            </View>
          ))
        ) : (
          <Text variant="bodyMedium" style={{ color: colors.onBackground }}>
            Vítimas: Não
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    padding: spacing.md,
    borderRadius: 12,
    width: '90%',
    maxHeight: MAX_HEIGHT,
    elevation: 6,
  },
});
