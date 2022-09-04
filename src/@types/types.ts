interface IWeatherCodes {
  '01d': string;
  '01n': string;
  '02d': string;
  '02n': string;
  '03d': string;
  '03n': string;
  '04d': string;
  '04n': string;
  '09d': string;
  '09n': string;
  '10d': string;
  '10n': string;
  '11d': string;
  '11n': string;
  '13d': string;
  '13n': string;
  '50d': string;
  '50n': string;
}

interface IAPI3HResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    };
    weather: {
      icon: keyof IWeatherCodes;
    }[];
  }[];
}

interface IAPICurrentResponse {
  dt: number;
  name: string;
  visibility: number;
  clouds: {
    all: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  wind: {
    speed: number;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    icon: keyof IWeatherCodes;
    main: string;
    description: string;
  }[];
}

interface IWeatherData {
  cityName: string;

  main: string;
  icon: keyof IWeatherCodes;
  description: string;
  temp: number | string;
  temp_max: number | string;
  temp_min: number | string;
  feels_like: number | string;

  details: Array<{
    title: string;
    value: string | number;
    unity?: string;
  }>;

  list: Array<{
    hour: string;
    icon: keyof IWeatherCodes;
    temp: string | number;
  }>;
}

export type {
  IAPI3HResponse,
  IAPICurrentResponse,
  IWeatherCodes,
  IWeatherData,
};
