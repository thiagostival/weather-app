import { api, CancelToken } from './api';

// UTILS
import { getEnvs } from '../utils';

interface IGetWeatherParams {
  latitude: number;
  longitude: number;
}

/**
 * @description
 * - Abstraction functions of the api calls, where the sourceToken is returned,
 * to cancel the calls, and the api call itself, where only the necessary parameters
 * for the call are passed
 */

/**
 * @description
 * - Function responsible for making the api call to get the current weather data
 *
 * @example
 * const { source, apiCall } = getCurrentWeather();
 * apiCall({ latitude: -22.9068, longitude: -43.1729})
 * source.cancel()
 * source.token
 */
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

/**
 * @description
 * - Function responsible for bringing future climate data, with a 3h/3h interval
 *
 * @example
 * const { source, apiCall } = getCurrentWeather();
 * apiCall({ latitude: -22.9068, longitude: -43.1729})
 * source.cancel()
 * source.token
 */
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
