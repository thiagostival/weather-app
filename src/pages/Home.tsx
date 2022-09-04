import { useCallback, useEffect, useRef, useState } from 'react';
import axios, { AxiosResponse, CancelTokenSource } from 'axios';
import { useTheme } from 'styled-components';

import {
  MdOutlineLocationSearching,
  MdOutlineLocationDisabled,
  MdMyLocation,
} from 'react-icons/md';
import { FiClock } from 'react-icons/fi';

// SERVICES
import { getCurrentWeather, getWeather3H } from '../services';

// ASSETS
import { Icon } from '../components/Icon';

// STYLES
import {
  Wrapper,
  City,
  Section,
  SectionLeftTop,
  SectionLeftMiddle,
  SectionLeftBottom,
  WeatherDetails,
  SectionRightTop,
  SectionRightBottom,
  Btn,
  ContentTooltip,
  Spinner,
} from './styles';

// COMPONENTS
import { Tooltip } from '../components/Tooltip';

// TYPES
import {
  IAPI3HResponse,
  IAPICurrentResponse,
  IStateData,
} from '../@types/types';

export function Home() {
  const theme = useTheme();

  const [data, setData] = useState<IStateData>({
    cityName: '--',

    clouds: '--',
    description: '--',
    icon: '01d',
    main: '--',
    feels_like: '--',
    humidity: '--',
    pressure: '--',
    temp: '--',
    temp_max: '--',
    temp_min: '--',
    visibility: '--',
    windSpeed: '--',

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

  function getFormattedDate(value?: string | number) {
    const currentDate = value ? new Date(value) : new Date();
    const dayOfTheWeek = currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
    });
    const month = currentDate.toLocaleDateString('en-US', {
      month: 'short',
    });

    let date: string | number = currentDate.getDate();
    date = date > 9 ? date : `0${date}`;

    let hour: string | number = currentDate.getHours();
    hour = hour > 9 ? hour : `0${hour}`;

    let minutes: string | number = currentDate.getMinutes();
    minutes = minutes > 9 ? minutes : `0${minutes}`;

    const formattedDate = `${hour}:${minutes} - ${dayOfTheWeek}, ${date} ${month}`;

    return formattedDate;
  }

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

      getWeatherSource.current?.cancel('Request Canceled');
      getCurrentWeatherSource.current?.cancel('Request Canceled');

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

      const formattedObj: IStateData = {
        cityName: dataCurrent?.name || '--',

        main: dataCurrent?.weather?.[0]?.main || '--',
        icon: dataCurrent?.weather?.[0]?.icon || '01d',
        description: dataCurrent?.weather?.[0]?.description || '--',
        clouds: dataCurrent?.clouds?.all ?? '--',
        windSpeed: dataCurrent?.wind?.speed ?? '--',
        temp: dataCurrent?.main?.temp?.toFixed?.(0) ?? '--',
        visibility: (dataCurrent?.visibility?.toFixed?.(0) || 0 / 1000) ?? '--',
        humidity: dataCurrent?.main?.humidity?.toFixed?.(0) ?? '--',
        pressure: dataCurrent?.main?.pressure?.toFixed?.(0) ?? '--',
        temp_max: dataCurrent?.main?.temp_max?.toFixed?.(0) ?? '--',
        temp_min: dataCurrent?.main?.temp_min?.toFixed?.(0) ?? '--',
        feels_like: dataCurrent?.main?.feels_like.toFixed?.(0) ?? '--',

        list: data3H?.list?.map((item) => ({
          date: item?.dt_txt || '--',
          icon: item?.weather?.[0]?.icon || '01d',
          temp: item?.main?.temp?.toFixed?.(0) ?? '--',
        })),
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

  const RenderContentTooltip = useCallback(() => {
    return error ? (
      <ContentTooltip isError>
        <p>{error}</p>
        <span>Make sure you have given permission to access the location</span>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://support.google.com/chrome/answer/142065?hl=en&co=GENIE.Platform%3DDesktop&oco=0"
        >
          Help
        </a>
      </ContentTooltip>
    ) : (
      <>
        {!location.isCurrentLocation ? (
          <ContentTooltip>
            <p>Gets your current location</p>

            <span>
              Make sure you allow the site to get your location, by clicking
              allow in the pop-up that opens
            </span>
          </ContentTooltip>
        ) : (
          <ContentTooltip>
            <p style={{ color: theme['green-300'] }}>
              Climate of your location
            </p>
          </ContentTooltip>
        )}
      </>
    );
  }, [error, location.isCurrentLocation, theme]);

  function renderForecastItem(item: IStateData['list'][0]) {
    let hour: string | number = new Date(item.date).getHours();
    hour = hour > 9 ? hour : `0${hour}`;

    return (
      <div key={item.date} className="item">
        <span>{hour}</span>
        <Icon code={item.icon} />
        <span>{item.temp}°</span>
      </div>
    );
  }

  return (
    <Wrapper>
      <Section className="left">
        <City>
          <span className="city">{data.cityName}</span>
          <span className="date">{dateRefresh}</span>
        </City>

        <SectionLeftTop>
          <span>{data.temp}°</span>

          <div className="more-infos">
            <span>Max: {data.temp_max}°</span>
            <span>Min: {data.temp_min}°</span>
            <span>Feels Like: {data.feels_like}°</span>
          </div>

          <div className="content-icon">
            <Icon code={data.icon} height="100" width="100" />
            <span>{data.main}</span>
          </div>
        </SectionLeftTop>

        <SectionLeftMiddle>
          <FiClock />
          Hourly forecast
        </SectionLeftMiddle>

        <SectionLeftBottom>
          <div className="item">
            <span>Now</span>
            <Icon code={data.icon} />
            <span>{data.temp}°</span>
          </div>

          {data?.list.map((i) => renderForecastItem(i))}
        </SectionLeftBottom>
      </Section>

      <Section className="right">
        <SectionRightTop>
          <span>Weather Details</span>

          <WeatherDetails>
            <span className="title-detail">Weather</span>
            <span className="value" style={{ textTransform: 'capitalize' }}>
              {data.description}
            </span>
          </WeatherDetails>

          <WeatherDetails>
            <span className="title-detail">Relative Humidity</span>
            <span className="value">{data.humidity}%</span>
          </WeatherDetails>

          <WeatherDetails>
            <span className="title-detail">Wind speed</span>
            <span className="value">{data.windSpeed} m/s</span>
          </WeatherDetails>

          <WeatherDetails>
            <span className="title-detail">Visibility</span>
            <span className="value">{data.visibility} km</span>
          </WeatherDetails>

          <WeatherDetails>
            <span className="title-detail">Pressure</span>
            <span className="value">{data.pressure} hPa</span>
          </WeatherDetails>

          <WeatherDetails>
            <span className="title-detail">Clouds</span>
            <span className="value">{data.clouds}%</span>
          </WeatherDetails>
        </SectionRightTop>

        <SectionRightBottom>
          <Tooltip content={<RenderContentTooltip />}>
            <Btn
              type="button"
              isError={!!error}
              disabled={location.isCurrentLocation}
              onClick={handleGetCurrentLocation}
            >
              {error ? (
                <MdOutlineLocationDisabled />
              ) : (
                <>
                  {!location.isCurrentLocation && (
                    <MdOutlineLocationSearching />
                  )}

                  {location.isCurrentLocation && <MdMyLocation />}
                </>
              )}
              current location
            </Btn>
          </Tooltip>

          <Btn type="button" className="refresh" onClick={handleGetWeather}>
            <Spinner loading={loading ? 1 : 0} />
            refresh
          </Btn>
        </SectionRightBottom>
      </Section>
    </Wrapper>
  );
}
