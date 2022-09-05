import { useCallback } from 'react';
import { useTheme } from 'styled-components';

import {
  MdMyLocation,
  MdOutlineLocationDisabled,
  MdOutlineLocationSearching,
} from 'react-icons/md';

// TYPES
import { IWeatherData } from '../../../@types/types';
interface ISectionRightProps {
  /**
   * @description Variable responsible for telling if the user denied access to the location
   * @example "User denied Geolocation"
   */
  error?: string;

  /**
   * @description
   * - Variable responsible for telling if an API call is currently in progress
   */
  loading?: boolean;

  /**
   * @description Variable with the API data treated to component default
   * @example [{ title: 'Weather', value: 'Cloudy' }, { title: 'Pressure', value: 10, unity: 'hPa' }]
   */
  details?: IWeatherData['details'];

  /**
   * @description Responsible for telling whether the user is using the current location or not
   */
  isCurrentLocation?: boolean;

  /** @description Function executed by pressing the refresh button */
  handleRefresh?: () => void;

  /** @description Function executed by pressing the current location button */
  handleGetCurrentLocation?: () => void;
}

// COMPONENTS
import { Btn } from '../../Btn';
import { Spinner } from '../../Spinner';
import { Tooltip } from '../../Tooltip';

// STYLES
import {
  ContentTooltip,
  SectionRightBottom,
  SectionRightTop,
  WeatherDetails,
  WrapperSectionRight,
} from './styles';

export function SectionRight({
  error,
  details = [],
  loading = false,
  isCurrentLocation = false,
  handleRefresh = () => {},
  handleGetCurrentLocation = () => {},
}: ISectionRightProps) {
  const theme = useTheme();

  const RenderContentTooltip = useCallback(() => {
    return error ? (
      <ContentTooltip isError>
        <p data-testid="error-title">{error}</p>
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
        {!isCurrentLocation ? (
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
  }, [error, isCurrentLocation, theme]);

  return (
    <WrapperSectionRight>
      <SectionRightTop>
        <span>Weather Details</span>

        {details.map((detail) => (
          <WeatherDetails key={`${detail.title}-${detail.value}`}>
            <span className="title-detail">{detail.title}</span>
            <span className="value">
              {detail.value} {detail?.unity}
            </span>
          </WeatherDetails>
        ))}
      </SectionRightTop>

      <SectionRightBottom>
        <Tooltip content={<RenderContentTooltip />}>
          <Btn
            type="button"
            isError={!!error}
            disabled={loading || isCurrentLocation}
            onClick={handleGetCurrentLocation}
          >
            {error ? (
              <MdOutlineLocationDisabled />
            ) : (
              <>
                {!isCurrentLocation && <MdOutlineLocationSearching />}

                {isCurrentLocation && <MdMyLocation />}
              </>
            )}
            current location
          </Btn>
        </Tooltip>

        <Btn
          type="button"
          className="refresh"
          disabled={loading}
          onClick={handleRefresh}
        >
          <Spinner loading={loading} />
          refresh
        </Btn>
      </SectionRightBottom>
    </WrapperSectionRight>
  );
}
