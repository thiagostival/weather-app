import '@testing-library/jest-dom';

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
};

// @ts-ignore
global.navigator.geolocation = mockGeolocation;
