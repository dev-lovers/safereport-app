import Constants from 'expo-constants';
import opencage from 'opencage-api-client';

const OPENCAGE_API_KEY = Constants.expoConfig?.extra?.OPENCAGE_API_KEY;

export async function getCityAndStateFromCoordinates(
  latitude: number,
  longitude: number,
): Promise<{ city: string; state: string }> {
  try {
    const query = `${latitude},${longitude}`;
    const response = await opencage.geocode({ key: OPENCAGE_API_KEY, q: query });

    if (!response || !response.results || response.results.length === 0) {
      throw new Error('Nenhum resultado encontrado para as coordenadas.');
    }

    const components = response.results[0].components;
    const city = components.city || components.town || components.village;
    const state = components.state;

    if (!city || !state) {
      throw new Error('Cidade ou estado não encontrados nos resultados.');
    }

    return { city: city.toUpperCase(), state: state.toUpperCase() };
  } catch (error) {
    console.error('Erro ao converter coordenadas em cidade e estado:', error);
    throw error;
  }
}
