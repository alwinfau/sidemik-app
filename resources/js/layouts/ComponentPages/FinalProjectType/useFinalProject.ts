import { useAxios } from '@/hooks/useAxios';
import { useState } from 'react';
import { FinalProjectType } from './Column';

export const useFinalProject = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<FinalProjectType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchData = async (currentPage = 1) => {
        try {
            setIsLoading(true);
            const res: any = await get(`/final-project-type?page=${currentPage}&limit=5`);
            setData(res.data.data);
            setPage(res.data.current_page);
            setTotalPages(res.data.last_page);
            return res;
        } catch (err) {
            console.error('Error fetching:', err);
        } finally {
            setIsLoading(false);
        }
    };
    const handleSubmit = async (data: Omit<FinalProjectType, 'id'>, id?: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            if (id) {
                const res: any = await put(`/final-project-type/${id}`, data);
                setData((prev) => prev.map((p: any) => (p.id === id ? res.data : p)));
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Final Project Type updated successfully', type: 'success' });
                return res;
            } else {
                const res: any = await post('/final-project-type', data);
                setData((prev) => [...prev, res.data]);
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Final Project Type created successfully', type: 'success' });
                return res;
            }
        } catch (error: any) {
            if (error.response.status === 500) {
                setToast({ message: 'Failed to submit Final Project Type', type: 'error' });
            }
            console.log('Error submitting data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            await del(`/final-project-type/${id}`);
            setData((prev) => prev.filter((item: any) => item.id !== id));
            await fetchData();
            setToast({ message: 'Final Project Type deleted successfully', type: 'success' });
            window.location.reload();
        } catch (err) {
            console.error(err);
            setToast({ message: 'Failed to delete Final Project Type', type: 'error' });
        } finally {
            onSuccess?.();
            setIsLoading(false);
        }
    };
    return {
        data,
        isLoading,
        toast,
        fetchData,
        handleSubmit,
        handleDelete,
        setToast,
        page,
        totalPages,
        setPage,
    };
};
