import { useCallback, useEffect, useRef, useState } from 'react';
import axios, { AxiosResponse, CancelTokenSource } from 'axios';

// TYPES
import {
  IAPI3HResponse,
  IAPICurrentResponse,
  IWeatherData,
} from '../@types/types';

// UTILS
import { getFormattedDate } from '../utils';

// SERVICES
import { getCurrentWeather, getWeather3H } from '../services';

// COMPONENTS
import { SectionLeft } from '../components/sections/SectionLeft';
import { SectionRight } from '../components/sections/SectionRight';

// STYLES
import { Wrapper } from './styles';

export function Home() {
  const [data, setData] = useState<IWeatherData>({
    cityName: '--',
    main: '--',
    icon: '01d',
    description: '--',
    temp: '--',
    temp_max: '--',
    temp_min: '--',
    feels_like: '--',

    details: [],
    list: [],
  });
  const [location, setLocation] = useState({
    latitude: -22.9068,
    longitude: -43.1729,
    isCurrentLocation: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dateRefresh, setDateRefresh] = useState('');

  const getWeatherSource = useRef<CancelTokenSource>();
  const getCurrentWeatherSource = useRef<CancelTokenSource>();

  function handleGetCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          isCurrentLocation: true,
        });
        setError('');
      },
      (err) => {
        setError(err.message);
      },
      { enableHighAccuracy: true }
    );
  }

  const handleGetWeather = useCallback(async () => {
    try {
      setLoading(true);

      getWeatherSource.current?.cancel?.('Request Canceled');
      getCurrentWeatherSource.current?.cancel?.('Request Canceled');

      const { source, apiCall } = getCurrentWeather();
      getCurrentWeatherSource.current = source;
      const { source: source3H, apiCall: apiCall3H } = getWeather3H();
      getWeatherSource.current = source3H;

      const responses = await axios.all([
        apiCall(location),
        apiCall3H(location),
      ]);

      const [{ data: dataCurrent }, { data: data3H }] =
        responses as unknown as [
          AxiosResponse<IAPICurrentResponse>,
          AxiosResponse<IAPI3HResponse>
        ];

      const formattedObj: IWeatherData = {
        cityName: dataCurrent?.name || '--',

        main: dataCurrent?.weather?.[0]?.main || '--',
        icon: dataCurrent?.weather?.[0]?.icon || '01d',
        description: dataCurrent?.weather?.[0]?.description || '--',
        temp: dataCurrent?.main?.temp?.toFixed?.(0) ?? '--',
        temp_max: dataCurrent?.main?.temp_max?.toFixed?.(0) ?? '--',
        temp_min: dataCurrent?.main?.temp_min?.toFixed?.(0) ?? '--',
        feels_like: dataCurrent?.main?.feels_like?.toFixed?.(0) ?? '--',

        details: [
          {
            title: 'Weather',
            value:
              dataCurrent?.weather?.[0]?.description?.toUpperCase() || '--',
          },
          {
            title: 'Relative Humidity',
            value: dataCurrent?.main?.humidity?.toFixed?.(0) ?? '--',
            unity: '%',
          },
          {
            title: 'Wind speed',
            value: ((dataCurrent?.wind?.speed || 0) * 3.6).toFixed(0) ?? '--',
            unity: 'km/h',
          },
          {
            title: 'Visibility',
            value:
              ((dataCurrent?.visibility || 0) / 1000)?.toFixed?.(0) ?? '--',
            unity: 'km',
          },
          {
            title: 'Pressure',
            value: dataCurrent?.main?.pressure?.toFixed?.(0) ?? '--',
            unity: 'hPa',
          },
          {
            title: 'Clouds',
            value: dataCurrent?.clouds?.all ?? '--',
            unity: '%',
          },
        ],
        list: data3H?.list?.map((item) => {
          let hour: string | number = '--';

          if (item?.dt_txt) {
            hour = new Date(item.dt_txt).getHours();
            hour = hour > 9 ? `${hour}h` : `0${hour}h`;
          }

          return {
            hour,
            icon: item?.weather?.[0]?.icon || '01d',
            temp: item?.main?.temp?.toFixed?.(0) ?? '--',
          };
        }),
      };

      setData(formattedObj);

      setDateRefresh(getFormattedDate());

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    handleGetWeather();

    return () => {
      getWeatherSource.current?.cancel?.('Request Canceled');
      getCurrentWeatherSource.current?.cancel?.('Request Canceled');
    };
  }, [handleGetWeather]);

  return (
    <Wrapper>
      <SectionLeft weatherData={data} dateRefresh={dateRefresh} />

      <SectionRight
        error={error}
        loading={loading}
        details={data.details}
        isCurrentLocation={location.isCurrentLocation}
        handleRefresh={handleGetWeather}
        handleGetCurrentLocation={handleGetCurrentLocation}
      />
    </Wrapper>
  );
}
