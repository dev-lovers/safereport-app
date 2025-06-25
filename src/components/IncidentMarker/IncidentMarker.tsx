import { Incident, Victim } from '@types';
import React from 'react';
import { Marker } from 'react-native-maps';

function getPinColor(incident: Incident): string {
  if (incident.victims.length === 0) return 'green';
  return incident.victims.some((v: Victim) => v.situation === 'Dead') ? 'red' : 'orange';
}

export function IncidentMarker({ incident, onPress }: { incident: Incident; onPress: () => void }) {
  return (
    <Marker
      coordinate={{
        latitude: Number(incident.latitude),
        longitude: Number(incident.longitude),
      }}
      pinColor={getPinColor(incident)}
      onPress={onPress}
    />
  );
}
