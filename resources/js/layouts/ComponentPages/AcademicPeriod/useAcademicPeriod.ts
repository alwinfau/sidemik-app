import { useAxios } from '@/hooks/useAxios';
import { useState } from 'react';
import { PeriodeAcademicType } from './Column';

export const useAcademicPriod = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<PeriodeAcademicType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [AcademicYears, setAcademicYears] = useState<any>([]);

    const fetchData = async (currentPage = 1) => {
        try {
            setIsLoading(true);
            const res: any = await get(`/academic-period?page=${currentPage}&limit=10`);
            setData(res.data.data);
            setPage(res.data.current_page);
            setTotalPages(res.data.last_page);
        } catch (err) {
            setToast({ message: 'Failed to fetch data', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const fecthAcademicYears = async () => {
        try {
            const res: any = await get('/academic-year');
            setAcademicYears(res.data.data);
        } catch (err) {
            throw err;
        }
    };
    const handleSubmit = async (data: Omit<PeriodeAcademicType, 'id'>, id?: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            if (id) {
                const res: any = await put(`/academic-period/${id}`, data);
                setData((prev) => prev.map((p: any) => (p.id === id ? res.data : p)));
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Academic Period updated successfully', type: 'success' });
                return res;
            } else {
                const res: any = await post('/academic-period', data);
                setData((prev) => [...prev, res.data]);
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Academic Period created successfully', type: 'success' });
                return res;
            }
        } catch (error: any) {
            if (error.response.status === 500) {
                setToast({ message: 'Failed to submit Academic Period', type: 'error' });
            }
            throw error.response.data;
        } finally {
            setIsLoading(false);
        }
    };
    const handleDelete = async (id: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            await del(`/academic-period/${id}`);
            setData((prev) => prev.filter((item: any) => item.id !== id));
            onSuccess?.();
            setToast({ message: 'Academic Period deleted successfully', type: 'success' });
        } catch (err) {
            console.error(err);
            setToast({ message: 'Failed to delete Academic Period', type: 'error' });
        } finally {
            onSuccess?.();
            setIsLoading(false);
        }
    };
    return { data, isLoading, toast, fetchData, handleSubmit, handleDelete, setToast, page, totalPages, setPage, AcademicYears, fecthAcademicYears };
};
