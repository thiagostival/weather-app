import { render, screen } from '@testing-library/react';

import { SectionRight } from '.';

const details = [
  { title: 'Weather', value: 'Cloudy' },
  { title: 'Clouds', value: '0', unity: '%' },
];

describe('Section Right Component', () => {
  it('should render the detail properties', () => {
    const { rerender } = render(<SectionRight details={details} />);

    expect(screen.getByText('Weather')).toBeInTheDocument();
    expect(screen.getByText('Cloudy')).toBeInTheDocument();
    expect(screen.getByText('Clouds')).toBeInTheDocument();
    expect(screen.getByText('0 %')).toBeInTheDocument();

    rerender(
      <SectionRight
        details={[
          { title: 'Relative Humidity', value: '92', unity: '%' },
          { title: 'Visibility', value: '10', unity: 'km/h' },
        ]}
      />
    );

    expect(screen.getByText('Relative Humidity')).toBeInTheDocument();
    expect(screen.getByText('92 %')).toBeInTheDocument();
    expect(screen.getByText('Visibility')).toBeInTheDocument();
    expect(screen.getByText('10 km/h')).toBeInTheDocument();
  });

  it('should render the location button with error', () => {
    render(<SectionRight error="User denied geolocation" details={details} />);

    expect(screen.getByText('current location')).toHaveStyle(
      `background: '#f4b8b9'`
    );
  });

  it('should check if the location button has been disabled', async () => {
    render(<SectionRight isCurrentLocation details={details} />);

    expect(screen.getByText('current location')).toBeDisabled();
  });
});
