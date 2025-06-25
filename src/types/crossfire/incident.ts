export interface Incident {
  id: string;
  documentNumber: number;
  address: string;
  state: NamedEntity;
  region: Region;
  city: NamedEntity;
  neighborhood: NamedEntity | null;
  subNeighborhood: NamedEntity | null;
  locality: NamedEntity | null;
  latitude: string;
  longitude: string;
  date: string;
  policeAction: boolean;
  agentPresence: boolean;
  relatedRecord: string | null;
  contextInfo: ContextInfo;
  transports: Transport[];
  victims: Victim[];
  animalVictims: AnimalVictim[];
}

export interface NamedEntity {
  id: string;
  name: string;
}

export interface Region {
  id: string;
  region: string;
  state: string;
  enabled: boolean;
}

export interface ContextInfo {
  mainReason: NamedEntity;
  complementaryReasons: NamedEntity[];
  clippings: NamedEntity[];
  massacre: boolean;
  policeUnit: string;
}

export interface Victim {
  id: string;
  occurrenceId: string;
  type: string;
  situation: string;
  circumstances: VictimStatus[];
  deathDate: string | null;
  personType: string;
  age: number | null;
  ageGroup: NamedEntity;
  genre: NamedEntity | null;
  race: string | null;
  place: NamedEntity;
  serviceStatus: VictimStatus;
  qualifications: NamedEntity[];
  politicalPosition: VictimStatus;
  politicalStatus: VictimStatus;
  partie: string | null;
  coorporation: NamedEntity;
  agentPosition: VictimStatus;
  agentStatus: VictimStatus;
  unit: string | null;
}

export interface VictimStatus {
  id: string;
  name: string;
  type: string;
}

export interface Transport {}

export interface AnimalVictim {}
