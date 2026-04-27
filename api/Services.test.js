/**
 * @format
 */

import axios from 'axios';
import {Alert} from 'react-native';

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    defaults: {},
    interceptors: {
      request: {use: jest.fn(), eject: jest.fn(), clear: jest.fn()},
      response: {use: jest.fn(), eject: jest.fn(), clear: jest.fn()},
    },
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
}));

// Mock Alert
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Alert: {
      alert: jest.fn(),
    },
  };
});

describe('HttpClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create axios client with correct base URL', () => {
    const HttpClient = require('./HttpClient').default;
    expect(axios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: 'https://api.github.com/',
      }),
    );
  });

  test('should have correct timeout configuration', () => {
    const HttpClient = require('./HttpClient').default;
    expect(axios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        timeout: 1000 * 10,
      }),
    );
  });

  test('should have correct headers', () => {
    const HttpClient = require('./HttpClient').default;
    expect(axios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }),
    );
  });

  test('should add request interceptor', () => {
    const mockAxios = axios.create();
    expect(mockAxios.interceptors.request.use).toHaveBeenCalled();
  });

  test('should add response interceptor', () => {
    const mockAxios = axios.create();
    expect(mockAxios.interceptors.response.use).toHaveBeenCalled();
  });
});
