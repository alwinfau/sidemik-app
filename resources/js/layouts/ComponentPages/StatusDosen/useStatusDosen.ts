import { ApiResponse, PaginatedApiResponse } from '@/types';
import { useState } from 'react';
import { useAxios } from '../../../hooks/useAxios';
import { StatusDosen } from './Column';

export const useStatusDosen = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<StatusDosen[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchData = async (currentPage = 1) => {
        try {
            setIsLoading(true);
            const res: PaginatedApiResponse<StatusDosen> = await get(`/lecture-status?page=${currentPage}&limit=10`);
            setData(res.data.data);

            setPage(res.data.current_page);
            setTotalPages(res.data.last_page ?? 1);
        } catch (err) {
            setToast({ message: 'Failed to fetch data', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };
    const handleSubmit = async (data: Omit<any, 'id'>, id?: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            const res: ApiResponse<StatusDosen> = id ? await put(`/lecture-status/${id}`, data) : await post('/lecture-status', data);
            await fetchData();
            onSuccess?.(); // close modal
            setToast({ message: `Lecture Status ${id ? 'updated' : 'created'} successfully`, type: 'success' });
            return res;
        } catch (error: any) {
            setToast({ message: 'Failed to submit lecture data', type: 'error' });
            throw error.response?.data;
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            await del(`/lecture-status/${id}`);
            await fetchData();
            onSuccess?.(); // close modal
            setToast({ message: 'Deleted successfully', type: 'success' });
        } catch (err) {
            setToast({ message: 'Delete failed', type: 'error' });
        } finally {
            setIsLoading(false);
            onSuccess?.();
        }
    };

    return { data, isLoading, toast, fetchData, handleSubmit, handleDelete, setToast, page, totalPages, setPage };
};
