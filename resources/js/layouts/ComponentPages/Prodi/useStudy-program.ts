import { useAxios } from '@/hooks/useAxios';
import { useState } from 'react';
import { Proditype } from './Column';

export const useStudyProgram = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<Proditype[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [Facultas, setFakultas] = useState<any>([]);
    const [AcademicPeriod, setAcademicPeriod] = useState<any>([]);

    const fetchData = async (currentPage = 1) => {
        try {
            setIsLoading(true);
            const res: any = await get(`/study-program?page=${currentPage}&limit=10`);
            setData(res.data.data);
            setPage(res.data.current_page);
            setTotalPages(res.data.last_page);
        } catch (err) {
            setToast({ message: 'Failed to get study-program', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };
    const fecthRelasi = async () => {
        try {
            const resFacultas: any = await get('/faculty');
            setFakultas(resFacultas.data);

            const resAcademicPeriod: any = await get('/academic-period');
            setAcademicPeriod(resAcademicPeriod.data);
        } catch (err) {
            console.error('Error fetching:', err);
        }
    };

    const handleSubmit = async (data: Omit<Proditype, 'id'>, id?: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            if (id) {
                const res: any = await put(`/study-program/${id}`, data);
                setData((prev) => prev.map((p: any) => (p.id === id ? res.data : p)));
                await fetchData();
                onSuccess?.();
                setToast({ message: 'study-program updated successfully', type: 'success' });
                return res;
            } else {
                const res: any = await post('/study-program', data);
                setData((prev) => [...prev, res.data]);
                await fetchData();
                onSuccess?.();
                setToast({ message: 'study-program created successfully', type: 'success' });
                return res;
            }
        } catch (error: any) {
            if (error.response.status === 500) {
                setToast({ message: 'Failed to submit study-program', type: 'error' });
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
            await del(`/study-program/${id}`);
            setData((prev) => prev.filter((item) => item.id !== id));
            setToast({ message: 'study-program deleted successfully', type: 'success' });
            window.location.reload();
        } catch (err) {
            setToast({ message: 'Failed to delete study-program', type: 'error' });
        } finally {
            setIsLoading(false);
            onSuccess?.();
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
        Facultas,
        AcademicPeriod,

        fecthRelasi,
    };
};
