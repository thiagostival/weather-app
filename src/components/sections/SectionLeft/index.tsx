import { FiClock } from 'react-icons/fi';

// TYPES
import { IWeatherData } from '../../../@types/types';
interface ISectionLeftProps {
  weatherData: IWeatherData;
  dateRefresh: string;
}

// COMPONENTS
import { Icon } from '../../Icon';

// STYLES
import {
  City,
  ForecastItem,
  SectionLeftBottom,
  SectionLeftMiddle,
  SectionLeftTop,
  WrapperSectionLeft,
} from './styles';

export function SectionLeft({ weatherData, dateRefresh }: ISectionLeftProps) {
  return (
    <WrapperSectionLeft>
      <City>
        <span className="city">{weatherData.cityName}</span>
        <span className="date" data-testid="date">
          {dateRefresh}
        </span>
      </City>

      <SectionLeftTop>
        <span data-testid="temp">{weatherData.temp}°</span>

        <div className="more-infos">
          <span>Max: {weatherData.temp_max}°</span>
          <span>Min: {weatherData.temp_min}°</span>
          <span>Feels Like: {weatherData.feels_like}°</span>
        </div>

        <div className="content-icon">
          <Icon code={weatherData.icon} height="100" width="100" />
          <span>{weatherData.main}</span>
        </div>
      </SectionLeftTop>

      <SectionLeftMiddle>
        <FiClock />
        Hourly forecast
      </SectionLeftMiddle>

      <SectionLeftBottom>
        <ForecastItem>
          <span>Now</span>
          <Icon code={weatherData.icon} />
          <span>{weatherData.temp}°</span>
        </ForecastItem>

        {weatherData.list.map((item, idx) => (
          <ForecastItem key={`${item.hour}-${idx}`}>
            <span>{item.hour}</span>
            <Icon code={item.icon} />
            <span>{item.temp}°</span>
          </ForecastItem>
        ))}
      </SectionLeftBottom>
    </WrapperSectionLeft>
  );
}
