import { useAxios } from '@/hooks/useAxios';
import { useState } from 'react';
import { AccreditionProdiType } from './Column';

export const useProdiAccreditation = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<AccreditionProdiType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [agencies, setAgencies] = useState<any>([]);

    const fetchData = async (currentPage = 1) => {
        try {
            setIsLoading(true);
            const res: any = await get(`/study-program-accreditations?page=${currentPage}&limit=5`);
            setData(res.data.data);

            setPage(res.data.current_page);
            setTotalPages(res.data.last_page);
        } catch (err) {
            setToast({ message: 'Failed to fetch data', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAgency = async () => {
        try {
            const agencyResponse: any = await get('/accreditation-agency');
            setAgencies(agencyResponse.data);
        } catch (error) {
            throw error;
        }
    };

    const handleSubmit = async (data: Omit<AccreditionProdiType, 'id'>, id?: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            if (id) {
                const res: any = await put(`/study-program-accreditations/${id}`, data);
                setData((prev) => prev.map((p) => (p.id === id ? res.data : p)));
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Prodi Accreditation updated successfully', type: 'success' });
                return res;
            } else {
                const res: any = await post('/study-program-accreditations', data);
                setData((prev) => [...prev, res.data]);
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Prodi Accreditation created successfully', type: 'success' });
                return res;
            }
        } catch (error: any) {
            if (error?.response?.status === 500) {
                setToast({ message: 'Failed to submit Prodi Accreditation', type: 'error' });
            }
            throw error.response.data;
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            await del(`/study-program-accreditations/${id}`);
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

    return { data, isLoading, toast, fetchData, handleSubmit, handleDelete, setToast, page, totalPages, setPage, agencies, fetchAgency };
};
