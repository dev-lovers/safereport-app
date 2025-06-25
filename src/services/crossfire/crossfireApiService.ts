import { Incident } from '@types';
import axios from 'axios';
import Constants from 'expo-constants';

import { getCityAndStateFromCoordinates } from '../opencage/opencageService';

const BASE_URL = 'https://api-service.fogocruzado.org.br/api/v2';
const LOGIN_ENDPOINT = '/auth/login';
const REFRESH_ENDPOINT = '/auth/refresh';
const STATES_ENDPOINT = '/states';
const CITIES_ENDPOINT = '/cities';
const OCCURRENCES_ENDPOINT = '/occurrences';

const EMAIL = Constants.expoConfig?.extra?.CROSSFIRE_API_EMAIL;
const PASSWORD = Constants.expoConfig?.extra?.CROSSFIRE_API_PASSWORD;

let accessToken: string | null = null;
let tokenExpiresAt: number | null = null;

async function authenticate(): Promise<void> {
  try {
    const response = await axios.post(`${BASE_URL}${LOGIN_ENDPOINT}`, {
      email: EMAIL,
      password: PASSWORD,
    });

    const { accessToken: token, expiresIn } = response.data?.data || {};
    if (!token || !expiresIn) throw new Error('Token inválido ou sem tempo de expiração.');

    accessToken = token;
    tokenExpiresAt = Date.now() + expiresIn * 1000;
  } catch (error) {
    console.error('Erro ao autenticar na API Fogo Cruzado:', error);
    throw error;
  }
}

async function refreshToken(): Promise<void> {
  if (!accessToken) return authenticate();

  try {
    const response = await axios.post(
      `${BASE_URL}${REFRESH_ENDPOINT}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const { accessToken: token, expiresIn } = response.data?.data || {};
    if (!token || !expiresIn) throw new Error('Token de refresh inválido.');

    accessToken = token;
    tokenExpiresAt = Date.now() + expiresIn * 1000;
  } catch (error) {
    console.error('Erro ao renovar o token:', error);
    await authenticate();
  }
}

function isTokenExpired(): boolean {
  return !tokenExpiresAt || Date.now() >= tokenExpiresAt;
}

async function getApiInstance() {
  if (!accessToken || isTokenExpired()) {
    await refreshToken();
  }

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });
}

export async function getRecentIncidentsByCoordinates(
  lat: number,
  lng: number,
  daysAgo: number = 90,
): Promise<Incident[]> {
  try {
    const api = await getApiInstance();

    const { city, state } = await getCityAndStateFromCoordinates(lat, lng);
    if (!city || !state) throw new Error('Cidade ou estado não encontrados.');

    const [statesRes, citiesRes] = await Promise.all([
      api.get(STATES_ENDPOINT),
      api.get(CITIES_ENDPOINT),
    ]);

    const stateId = statesRes.data.data.find(
      (s: any) => s.name.toLowerCase() === state.toLowerCase(),
    )?.id;

    const cityId = citiesRes.data.data.find(
      (c: any) => c.name.toLowerCase() === city.toLowerCase() && c.state?.id === stateId,
    )?.id;

    if (!cityId || !stateId) throw new Error('Cidade ou estado correspondente não encontrado.');

    const now = new Date();
    const past = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);

    const response = await api.get(OCCURRENCES_ENDPOINT, {
      params: {
        idState: stateId,
        idCities: [cityId],
        initialdate: past.toISOString().split('T')[0],
        finaldate: now.toISOString().split('T')[0],
      },
    });

    return response.data.data as Incident[];
  } catch (error) {
    console.error('Erro ao buscar ocorrências recentes:', error);
    throw error;
  }
}
