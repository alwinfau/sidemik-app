// src/api/axiosInstance.ts
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig  } from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://demoapisidemik-main-i8jv1d.laravel.cloud/api/resources/v1/sidemik', 
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
        // Handle token kadaluarsa / unauthorized
        localStorage.removeItem('token');
        window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;