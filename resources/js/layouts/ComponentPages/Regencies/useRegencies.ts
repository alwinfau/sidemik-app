import { useAxios } from '@/hooks/useAxios';
import { useState } from 'react';
import { RegenciesType } from './Column';

export const useRegencies = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<RegenciesType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [province, setProvince] = useState<any>([]);

    const fetchData = async (currentPage = 1) => {
        try {
            setIsLoading(true);
            const res: any = await get(`/regency?page=${currentPage}&limit=10`);
            setData(res.data.data);

            setPage(res.data.current_page);
            setTotalPages(res.data.last_page);
        } catch (err) {
            setToast({ message: 'Failed to fetch data', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProvince = async () => {
        try {
            const res: any = await get('/province');
            setProvince(res.data.data);
        } catch (error) {
            throw error;
        }
    };

    const handleSubmit = async (data: Omit<RegenciesType, 'id'>, id?: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            if (id) {
                const res: any = await put(`/regency/${id}`, data);
                setData((prev) => prev.map((p) => (p.id === id ? res.data : p)));
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Regency updated successfully', type: 'success' });
                return res;
            } else {
                const res: any = await post('/regency', data);
                setData((prev) => [...prev, res.data]);
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Regency created successfully', type: 'success' });
                return res;
            }
        } catch (error: any) {
            if (error?.response?.status === 500) {
                setToast({ message: 'Failed to submit Regency', type: 'error' });
            }
            throw error.response.data;
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            await del(`/regency/${id}`);
            setData((prev) => prev.filter((item) => item.id !== id));
            await fetchData();
            onSuccess?.();
            setToast({ message: 'Deleted successfully', type: 'success' });
        } catch (err) {
            setToast({ message: 'Delete failed', type: 'error' });
        } finally {
            setIsLoading(false);
            onSuccess?.();
        }
    };

    return { data, isLoading, toast, fetchData, handleSubmit, handleDelete, setToast, page, totalPages, setPage, province, fetchProvince };
};
