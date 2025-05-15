// src/api/axiosInstance.ts
import config from '@/config';
import axios, { InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: config.api_url,
    headers: {
        Accept: 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = Cookies.get('token');
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle token kadaluarsa / unauthorized
            Cookies.remove('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
