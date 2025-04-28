// src/hooks/useAxios.ts
import axiosInstance from '@/API/AxiosIsntance';
import { useCallback } from 'react';

export const useAxios = () => {
    const get = useCallback(async <T>(url: string): Promise<T> => {
        const response = await axiosInstance.get<T>(url);
        return response.data;
    }, []);

    const post = useCallback(async <T, D>(url: string, data: D): Promise<T> => {
        const response = await axiosInstance.post<T>(url, data);
        return response.data;
    }, []);

    const put = useCallback(async <T, D>(url: string, data: D): Promise<T> => {
        const response = await axiosInstance.put<T>(url, data);
        return response.data;
    }, []);

    const del = useCallback(async <T>(url: string): Promise<T> => {
        const response = await axiosInstance.delete<T>(url);
        return response.data;
    }, []);

    return { get, post, put, del };
};
