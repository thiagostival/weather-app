import { SVGProps } from 'react';

// ASSETS
import {
  ReactDay,
  ReactNight,
  ReactRainy,
  ReactRainySun,
  ReactThunder,
  ReactSnowy,
  ReactCloudy,
  ReactCloudyDay,
  ReactCloudyNight,
} from '../../assets';

// TYPES
import { IWeatherCodes } from '../../@types/types';
interface IIconProps extends SVGProps<SVGSVGElement> {
  code?: keyof IWeatherCodes;
}

export function Icon({ code = '01d', ...rest }: IIconProps) {
  const codeMapping = {
    '01d': ReactDay,
    '01n': ReactNight,
    '02d': ReactCloudyDay,
    '02n': ReactCloudyNight,
    '03d': ReactCloudy,
    '03n': ReactCloudy,
    '04d': ReactCloudy,
    '04n': ReactCloudy,
    '09d': ReactRainy,
    '09n': ReactRainy,
    '10d': ReactRainySun,
    '10n': ReactRainy,
    '11d': ReactThunder,
    '11n': ReactThunder,
    '13d': ReactSnowy,
    '13n': ReactSnowy,
    '50d': ReactCloudy,
    '50n': ReactCloudy,
  };

  const ReactIcon = codeMapping[code];

  return <ReactIcon height="80" width="80" {...rest} />;
}
