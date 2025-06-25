import { useAppContext } from '@context';
import { getRecentIncidentsByCoordinates } from '@services';
import { Incident, Victim } from '@types';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Appbar, IconButton, Modal, Portal, Text, useTheme } from 'react-native-paper';

const mapDarkStyle = [
  { elementType: 'geometry', stylers: [{ color: '#212121' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'on' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#757575' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#2c2c2c' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#383838' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#000000' }] },
];

function getPinColor(incident: Incident): string {
  if (incident.victims.length === 0) return 'green';
  return incident.victims.some((v: Victim) => v.situation === 'Dead') ? 'red' : 'orange';
}

function traduzirSituacao(situation: string): string {
  const mapa: Record<string, string> = {
    Dead: 'Morto',
    Wounded: 'Ferido',
  };
  return mapa[situation] ?? situation;
}

function limparValor(valor?: string | null): string {
  return valor && valor !== 'Não se aplica' && valor !== 'Não identificado' ? valor : '—';
}

export default function MapScreen() {
  const { colors, dark } = useTheme();
  const { userLocation } = useAppContext();

  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      try {
        if (!userLocation) {
          Alert.alert('Erro', 'Localização do usuário não disponível.');
          return;
        }

        const results = await getRecentIncidentsByCoordinates(
          userLocation.latitude,
          userLocation.longitude,
          90,
        );

        setIncidents(results);
      } catch (error) {
        console.error('Erro ao buscar ocorrências:', error);
        Alert.alert('Erro', 'Não foi possível carregar as ocorrências.');
      } finally {
        setLoading(false);
      }
    })();
  }, [userLocation]);

  const region: Region = {
    latitude: userLocation?.latitude ?? 0,
    longitude: userLocation?.longitude ?? 0,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08,
  };

  const hideModal = () => setSelectedIncident(null);

  return (
    <View style={styles.container}>
      <Appbar.Header mode="center-aligned" style={{ backgroundColor: colors.primary }}>
        <Appbar.Content
          title="Mapa de Ocorrências"
          titleStyle={{ textAlign: 'center', color: colors.onPrimary }}
        />
      </Appbar.Header>
      {!userLocation || loading ? (
        <View style={[styles.center, { backgroundColor: colors.background }]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
          <MapView
            customMapStyle={dark ? mapDarkStyle : []}
            initialRegion={region}
            followsUserLocation
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
            showsUserLocation
            showsMyLocationButton={false}
            style={styles.map}
            toolbarEnabled={false}
            zoomControlEnabled={false}
            zoomEnabled
          >
            {incidents.map(incident => (
              <Marker
                key={incident.id}
                coordinate={{
                  latitude: Number(incident.latitude),
                  longitude: Number(incident.longitude),
                }}
                pinColor={getPinColor(incident)}
                onPress={() => setSelectedIncident(incident)}
              />
            ))}
          </MapView>
          <View style={styles.controls}>
            <IconButton
              icon="crosshairs-gps"
              mode="contained"
              size={28}
              containerColor={colors.primary}
              iconColor={colors.onPrimary}
              onPress={() => mapRef.current?.animateToRegion(region, 1000)}
            />
            <IconButton
              icon="plus"
              mode="contained"
              size={28}
              containerColor={colors.primary}
              iconColor={colors.onPrimary}
              onPress={() =>
                mapRef.current?.getCamera().then(camera => {
                  if (camera.zoom !== undefined) {
                    mapRef.current?.animateCamera({ ...camera, zoom: camera.zoom + 1 });
                  }
                })
              }
            />
            <IconButton
              icon="minus"
              mode="contained"
              size={28}
              containerColor={colors.primary}
              iconColor={colors.onPrimary}
              onPress={() =>
                mapRef.current?.getCamera().then(camera => {
                  if (camera.zoom !== undefined) {
                    mapRef.current?.animateCamera({ ...camera, zoom: camera.zoom - 1 });
                  }
                })
              }
            />
          </View>
          <Portal>
            <Modal
              visible={!!selectedIncident}
              onDismiss={hideModal}
              contentContainerStyle={styles.modal}
            >
              {selectedIncident && (
                <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
                  <Text
                    variant="titleMedium"
                    style={{ fontWeight: 'bold', color: colors.onBackground, textAlign: 'center' }}
                  >
                    {selectedIncident.contextInfo.mainReason.name}
                  </Text>
                  <Text style={{ color: colors.onBackground, textAlign: 'center' }}>
                    {selectedIncident.address}
                  </Text>
                  <Text style={{ color: colors.onBackground, textAlign: 'center' }}>
                    Data: {new Date(selectedIncident.date).toLocaleDateString('pt-BR')}
                  </Text>

                  {selectedIncident.victims.length > 0 ? (
                    selectedIncident.victims.map((victim: Victim, index: number) => (
                      <View key={victim.id} style={{ marginTop: index > 0 ? 16 : 8 }}>
                        <Text style={{ fontWeight: 'bold', color: colors.onBackground }}>
                          🧍 Vítima {index + 1}:
                        </Text>
                        <Text style={{ color: colors.onBackground }}>
                          • Situação: {traduzirSituacao(victim.situation)}
                        </Text>
                        <Text style={{ color: colors.onBackground }}>
                          • Idade: {victim.age ?? 'Não informada'} ({victim.ageGroup.name})
                        </Text>
                        <Text style={{ color: colors.onBackground }}>
                          • Gênero: {limparValor(victim.genre?.name)}
                        </Text>
                        <Text style={{ color: colors.onBackground }}>
                          • Raça: {limparValor(victim.race)}
                        </Text>
                        <Text style={{ color: colors.onBackground }}>
                          • Tipo: {limparValor(victim.personType)}
                        </Text>
                        <Text style={{ color: colors.onBackground }}>
                          • Local do ocorrido: {limparValor(victim.place.name)}
                        </Text>
                        <Text style={{ color: colors.onBackground }}>
                          • Status de serviço: {limparValor(victim.serviceStatus.name)}
                        </Text>
                        <Text style={{ color: colors.onBackground }}>
                          • Qualificação: {limparValor(victim.qualifications[0]?.name)}
                        </Text>
                        <Text style={{ color: colors.onBackground }}>
                          • Cargo político: {limparValor(victim.politicalPosition.name)}
                        </Text>
                        <Text style={{ color: colors.onBackground }}>
                          • Situação política: {limparValor(victim.politicalStatus.name)}
                        </Text>
                        <Text style={{ color: colors.onBackground }}>
                          • Cargo de agente: {limparValor(victim.agentPosition.name)}
                        </Text>
                        <Text style={{ color: colors.onBackground }}>
                          • Situação do agente: {limparValor(victim.agentStatus.name)}
                        </Text>
                        {victim.deathDate && (
                          <Text style={{ color: colors.onBackground }}>
                            • Data da morte:{' '}
                            {new Date(victim.deathDate).toLocaleDateString('pt-BR')}
                          </Text>
                        )}
                      </View>
                    ))
                  ) : (
                    <Text style={{ color: colors.onBackground }}>Vítimas: Não</Text>
                  )}
                </View>
              )}
            </Modal>
          </Portal>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    position: 'absolute',
    bottom: 25,
    right: 20,
    gap: 10,
  },
  modal: {
    backgroundColor: 'transparent',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: 16,
    borderRadius: 12,
    width: '90%',
    elevation: 6,
  },
});
