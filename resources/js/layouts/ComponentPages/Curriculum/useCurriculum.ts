import { useAxios } from '@/hooks/useAxios';
import { useState } from 'react';
import { CurriculumType } from './Column';
import Curriculum from '@/pages/Curriculum/Curriculum';

export const useCurriculum = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<CurriculumType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [Prodi, setProdi] = useState<any>([]);
    const [TahunKurikulum, setTahunKurikulum] =  useState<CurriculumType[]>([]);
    const [searchTahunKurikulum, setSearchTahunKurikulum] = useState <string>('');


    const fetchData = async (currentPage = 1) => {
        try {
            setIsLoading(true);
            const res: any = await get(`/curriculum?page=${currentPage}&limit=10`);
            setData(res.data.data);
            setPage(res.data.current_page);
            setTotalPages(res.data.last_page);
        } catch (err) {
            setToast({ message: 'Failed to get curriculum', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    // const fecthsearch = async () => {
    //     try {
    //         const response = await get(``)
    //     } catch (error) {
            
    //     }
    // }

    const fecthRelasi = async () => {
        try {
            const resProdi: any = await get('/study-program');
            setProdi(resProdi.data );
        } catch (err) {
            console.error('Error fetching:', err);
        }
    };
    const handleSubmit = async (data: Omit<CurriculumType, 'id'>, id?: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            if (id) {
                const res: any = await put(`/curriculum/${id}`, data);
                setData((prev) => prev.map((p: any) => (p.id === id ? res.data : p)));
                await fetchData();
                onSuccess?.();
                setToast({ message: 'curriculum updated successfully', type: 'success' });
                return res;
            } else {
                const res: any = await post('/curriculum', data);
                setData((prev) => [...prev, res.data]);
                await fetchData();
                onSuccess?.();
                setToast({ message: 'curriculum created successfully', type: 'success' });
                return res;
            }
        } catch (error: any) {
            if (error.response.status === 500) {
                setToast({ message: 'Failed to submit curriculum', type: 'error' });
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
            await del(`/curriculum/${id}`);
            setData((prev) => prev.filter((item) => item.id !== id));
            setToast({ message: 'curriculum deleted successfully', type: 'success' });
            window.location.reload();
        } catch (err) {
            setToast({ message: 'Failed to delete curriculum', type: 'error' });
        } finally {
            setIsLoading(false);
            onSuccess?.();
        }
    };
    return {
        data,
        isLoading,
        toast,
        page,
        totalPages,
        Prodi,
        TahunKurikulum,
        searchTahunKurikulum,
        setSearchTahunKurikulum,
        setTahunKurikulum,
        setPage,
        fetchData,
        handleSubmit,
        handleDelete,
        setToast,
        
        fecthRelasi,
    };
};
