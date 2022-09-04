import axios from 'axios';

// UTILS
import { getEnvs } from '../utils';

export const api = axios.create({
  baseURL: getEnvs('VITE_API_URL'),
});

export const { CancelToken, isCancel, isAxiosError } = axios;
