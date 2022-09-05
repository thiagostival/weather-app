import { render, screen, waitFor } from '@testing-library/react';

// COMPONENTS
import { Home } from './Home';

jest.mock('../components/Icon');
jest.mock('../services', () => ({
  getCurrentWeather: () => {
    return {
      source: {
        cancel: () => {},
      },
      apiCall: () => ({
        data: {
          name: 'City of the test',
          main: {
            temp: 30,
            pressure: 10,
          },
        },
      }),
    };
  },
  getWeather3H: () => {
    return {
      source: {
        cancel: () => {},
      },
      apiCall: () => ({
        data: {
          list: [
            {
              dt_txt: '2022-09-05 00:00:00',
              weather: [
                {
                  icon: '01d',
                },
              ],
              main: {
                temp: 20,
              },
            },
          ],
        },
      }),
    };
  },
}));
jest.mock('../utils', () => ({
  getEnvs: (key: string) => {
    switch (key) {
      case 'VITE_API_KEY':
        return '72ce82bb863281ba414f17a0530a3224';

      case 'VITE_API_URL':
        return 'https://api.openweathermap.org';

      default:
        return '';
    }
  },
}));

describe('Section Right Component', () => {
  it('should check if the data has loaded', async () => {
    const { baseElement } = render(<Home />);

    const spanCity = baseElement.getElementsByClassName('city')[0];
    expect(spanCity).toHaveTextContent('--');

    await waitFor(() => expect(spanCity).not.toHaveTextContent('--'));

    expect(screen.getByTestId('temp')).toHaveTextContent('30°');
    expect(screen.getByText('10 hPa')).toBeInTheDocument();
    expect(screen.getByText('00h')).toBeInTheDocument();
    expect(screen.getByText('20°')).toBeInTheDocument();
  });
});
