import { useAxios } from '@/hooks/useAxios';
import { useState } from 'react';
import { AcademicYearType } from './Column';

export const useAcademicYear = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<AcademicYearType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchData = async (currentPage = 1) => {
        try {
            setIsLoading(true);
            const res: any = await get(`academic-year?page=${currentPage}&limit=10`);
            setData(res.data.data);
            setPage(res.data.current_page);
            setTotalPages(res.data.last_page);
        } catch (err) {
            setToast({ message: 'Failed to get Academic Year', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (data: Omit<AcademicYearType, 'id'>, id?: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            if (id) {
                const res: any = await put(`/academic-year/${id}`, data);
                setData((prev) => prev.map((p: any) => (p.id === id ? res.data : p)));
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Academic Year updated successfully', type: 'success' });
                return res;
            } else {
                const res: any = await post('/academic-year', data);
                setData((prev) => [...prev, res.data]);
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Academic Year created successfully', type: 'success' });
                return res;
            }
        } catch (error: any) {
            if (error.response.status === 500) {
                setToast({ message: 'Failed to submit Academic Year', type: 'error' });
            }
            console.log(error);
            throw error.response.data;
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number, onSuccess?: () => void) => {
        if (!id) return;
        setIsLoading(true);
        try {
            await del(`/academic-year/${id}`);
            setData((prev) => prev.filter((item: any) => item.id !== id));
            onSuccess?.();
            setToast({ message: 'Academic Year deleted successfully', type: 'success' });
        } catch (err: any) {
            setIsLoading
            const errorMessage = err?.response?.data?.meta?.message || 'Failed to delete Academic Year';
            setToast({ message: errorMessage, type: 'error' });
            console.log(errorMessage);
        }finally {
            onSuccess?.();
            setIsLoading(false);
        }
    };
    return { data, isLoading, toast, fetchData, handleSubmit, handleDelete, setToast, page, totalPages, setPage };
};
