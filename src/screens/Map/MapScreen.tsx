import { IncidentMarker } from '@components/IncidentMarker/IncidentMarker';
import { IncidentModal } from '@components/IncidentModal/IncidentModal';
import { useAppContext } from '@context';
import { getRecentIncidentsByCoordinates } from '@services';
import { Incident } from '@types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Appbar, IconButton, Modal, Portal, useTheme } from 'react-native-paper';

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

export default function MapScreen() {
  const { colors, dark } = useTheme();
  const { userLocation } = useAppContext();

  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [mapReady, setMapReady] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const mapRef = useRef<MapView>(null);

  const showMap = !!userLocation && !loading;

  const region: Region = useMemo(
    () => ({
      latitude: userLocation?.latitude ?? 0,
      longitude: userLocation?.longitude ?? 0,
      latitudeDelta: 0.08,
      longitudeDelta: 0.08,
    }),
    [userLocation],
  );

  const fetchIncidents = useCallback(async () => {
    if (!userLocation) {
      Alert.alert('Erro', 'Localização do usuário não disponível.');
      return;
    }

    try {
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
  }, [userLocation]);

  useEffect(() => {
    fetchIncidents();
  }, [fetchIncidents]);

  useEffect(() => {
    if (mapRef.current && userLocation) {
      mapRef.current.animateToRegion(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        },
        1000,
      );
    }
  }, [userLocation]);

  const handleZoom = (delta: number) => {
    mapRef.current?.getCamera().then(camera => {
      if (camera.zoom !== undefined) {
        mapRef.current?.animateCamera({ ...camera, zoom: camera.zoom + delta });
      }
    });
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
      {!showMap ? (
        <View style={[styles.center, { backgroundColor: colors.background }]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
          {!mapReady && (
            <View style={[styles.overlay, { backgroundColor: colors.background }]}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          )}
          <MapView
            customMapStyle={dark ? mapDarkStyle : []}
            initialRegion={region}
            ref={mapRef}
            followsUserLocation
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            showsMyLocationButton={false}
            style={styles.map}
            toolbarEnabled={false}
            zoomControlEnabled={false}
            zoomEnabled
            onMapReady={() => setMapReady(true)}
          >
            {incidents.map(incident => (
              <IncidentMarker
                key={incident.id}
                incident={incident}
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
              onPress={() => handleZoom(1)}
            />
            <IconButton
              icon="minus"
              mode="contained"
              size={28}
              containerColor={colors.primary}
              iconColor={colors.onPrimary}
              onPress={() => handleZoom(-1)}
            />
          </View>
          <Portal>
            <Modal
              visible={!!selectedIncident}
              onDismiss={hideModal}
              contentContainerStyle={styles.modal}
            >
              {selectedIncident && <IncidentModal incident={selectedIncident} />}
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
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
});
