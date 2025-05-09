import { useAxios } from '@/hooks/useAxios';
import { useState } from 'react';
import { MatkulPilihan } from './Column';

export const useMatkulPilihan = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<MatkulPilihan[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [Prodi, setProdi] = useState<any>([]);

    const fetchData = async (currentPage = 1) => {
        try {
            setIsLoading(true);
            const res: any = await get(`/elective-course-groups?page=${currentPage}&limit=10`);
            setData(res.data.data);
            setPage(res.data.current_page);
            setTotalPages(res.data.last_page);
        } catch (err) {
            setToast({ message: 'Failed to get Matkul Pilihan', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };
    const fecthRelasi = async () => {
        try {
            const resProdi: any = await get('/study-program');
            setProdi(resProdi.data.data);
        } catch (err) {
            console.error('Error fetching:', err);
        }
    };

    const handleSubmit = async (data: Omit<MatkulPilihan, 'id'>, id?: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            if (id) {
                const res: any = await put(`/elective-course-groups/${id}`, data);
                setData((prev) => prev.map((p: any) => (p.id === id ? res.data : p)));
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Matkul Pilihan updated successfully', type: 'success' });
                return res;
            } else {
                const res: any = await post('/elective-course-groups', data);
                setData((prev) => [...prev, res.data]);
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Matkul Pilihan created successfully', type: 'success' });
                return res;
            }
        } catch (error: any) {
            if (error.response.status === 500) {
                setToast({ message: 'Failed to submit Matkul Pilihan', type: 'error' });
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
            await del(`/elective-course-groups/${id}`);
            setData((prev) => prev.filter((item) => item.id !== id));
            setToast({ message: 'Matkul Pilihan deleted successfully', type: 'success' });
            window.location.reload();
        } catch (err) {
            setToast({ message: 'Failed to delete Matkul Pilihan', type: 'error' });
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
        Prodi,
        fecthRelasi,
    };
};
