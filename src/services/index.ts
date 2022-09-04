import { api, CancelToken } from './api';

// UTILS
import { getEnvs } from '../utils';

interface IGetWeatherParams {
  latitude: number;
  longitude: number;
}

export function getCurrentWeather() {
  const source = CancelToken.source();

  function apiCall({ latitude, longitude }: IGetWeatherParams) {
    return api.get(
      `/data/2.5/weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=${getEnvs(
        'VITE_API_KEY'
      )}`,
      {
        cancelToken: source.token,
      }
    );
  }

  return { source, apiCall };
}

export function getWeather3H() {
  const source = CancelToken.source();

  function apiCall({ latitude, longitude }: IGetWeatherParams) {
    return api.get(
      `/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&cnt=9&APPID=${getEnvs(
        'VITE_API_KEY'
      )}`,
      {
        cancelToken: source.token,
      }
    );
  }

  return { source, apiCall };
}
