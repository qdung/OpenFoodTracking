import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from 'context/AuthContext';
import { t } from 'i18next';
import { useCallback, useState } from 'react';
import { MessageAuthenticate } from 'types';
import axiosClient from 'utils/axios';

export const useAuthentication = () => {
  const { setUser, loading, setLoading } = useAuth();
  const [error, setError] = useState('');

  const loginWithEmailPassword = async (
    email: string,
    password: string,
    deviceToken: string,
  ) => {
    setLoading(true);
    try {
      const res = await axiosClient.post('/login', {
        email,
        password,
        device_token: deviceToken,
      });
      if (res.data.message === MessageAuthenticate.LoginSuccess) {
        AsyncStorage.setItem('token', res.data.data.token).then(() => {
          setUser(res.data.data.user);
        });
      }
    } catch (e) {
      setError(t('Username or password is not correct!'));
    } finally {
      setLoading(false);
    }
  };

  const checkValidToken = async (token: string) => {
    try {
      const res = await axiosClient.post('/checkValidToken', {
        token,
      });
      if (res.data.message === MessageAuthenticate.TokenValid) {
        return res.data;
      }
    } catch (e) {}
  };

  const logOut = () => {
    axiosClient.post('/logout').then(() =>
      AsyncStorage.removeItem('token')
        .then(() => {
          setUser(null);
        })
        .catch((e) => console.log(e)),
    );
  };

  return {
    loading,
    error,
    loginWithEmailPassword,
    checkValidToken,
    logOut,
    setError,
  };
};
