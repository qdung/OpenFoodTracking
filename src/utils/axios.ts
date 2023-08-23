import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOST } from 'utils/constants';
import Toast from 'react-native-toast-message';
import { t } from 'i18next';
/** define an axios instance config */
const config = {
  baseURL: HOST,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

/**
 * @description the interface of api response
 * @export
 * @interface APIResponse
 */
export interface APIResponse<T = any> {
  data: T;
  message: string;
  status: string;
}

/** create an axios client service with instance config */
axios.defaults.baseURL = HOST;
const axiosClient = axios.create(config);
axios.defaults.timeout = 10000;
/** handle intercept requests or responses before they are handled */
axiosClient.interceptors.request.use(
  async (req: any) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (err: any) => Promise.reject(err),
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error && error.response) {
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
