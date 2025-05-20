import { useAxios } from '@/hooks/useAxios';
import { useState } from 'react';
import { Stambuk } from './Column';

export const useStambuk = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<Stambuk[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [Curriculum, setCurriculum] = useState<any[]>([]);
    const [Prodi, setProdi] = useState<any[]>([]);
    const fetchData = async (currentPage = 1) => {
        try {
            setIsLoading(true);
            const res: any = await get(`/batch?page=${currentPage}&limit=10`);
            setData(res.data.data);
            setPage(res.data.current_page);
            setTotalPages(res.data.last_page);
        } catch (err) {
            setToast({ message: 'Failed to get Stambuk', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const fectRelasi = async () => {
        try {
            const resAcademic: any = await get('/curriculum');
            setCurriculum(resAcademic.data);

            const resProdi: any = await get('/study-program');
            setProdi(resProdi.data);
        } catch (err) {
            console.error('Error fetching academic periods:', err);
        }
    };

    const handleSubmit = async (data: Omit<Stambuk, 'id'>, id?: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            if (id) {
                const res: any = await put(`/batch/${id}`, data);
                setData((prev) => prev.map((p: any) => (p.id === id ? res.data : p)));
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Stambuk updated successfully', type: 'success' });
                return res;
            } else {
                const res: any = await post('/batch', data);
                setData((prev) => [...prev, res.data]);
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Stambuk created successfully', type: 'success' });
                return res;
            }
        } catch (error: any) {
            if (error.response.status === 500) {
                setToast({ message: 'Failed to submit Stambuk', type: 'error' });
            }
            console.log(error);
            throw error.response.data;
        } finally {
            setIsLoading(false);
        }
    };
    const handleDelete = async (id: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            await del(`/batch/${id}`);
            setData((prev) => prev.filter((item) => item.id !== id));
            await fetchData();
            setToast({ message: 'Stambuk deleted successfully', type: 'success' });
            window.location.reload();
        } catch (err) {
            setToast({ message: 'Failed to delete Stambuk', type: 'error' });
        } finally {
            setIsLoading(false);
            onSuccess?.();
        }
    };
    return { data, isLoading, toast, fetchData, handleSubmit, handleDelete, setToast, page, totalPages, setPage, Curriculum, Prodi, fectRelasi };
};
