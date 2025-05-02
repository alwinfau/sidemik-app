import { useAxios } from '@/hooks/useAxios';
import { useState } from 'react';
import { AccreditationagencyType } from './Column';

export const useAccreditationAgency = () => {

    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<AccreditationagencyType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);


    const fetchData = async (currentPage = 1) => {
        try {
                setIsLoading(true);
                const res: any = await get(`accreditation-agency?page=${currentPage}&limit=5`);
                setData(res.data.data);
                setPage(res.data.current_page);
                setTotalPages(res.data.last_page);
                console.log(res.data);
        } catch (err) {
            setToast({ message: 'failed to get Accreditation', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };


    const handleSubmit = async (data: Omit<AccreditationagencyType, 'id'>, id?: number, onSuccess?: () =>void ) => {
        try {
            setIsLoading(true);
            if (id) {
                const res: any = await put(`/accreditation-agency/${id}`, data);
                setData((prev) => prev.map((p: any) => (p.id === id ? res.data : p)));
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Accreditation Agency updated successfully', type: 'success' });
                return res;
            } else {
                const res: any = await post('/accreditation-agency', data);
                setData((prev) => [...prev, res.data]);
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Accreditation Agency created successfully', type: 'success' });
                return res;
            }
        } catch (error: any) {
            if (error.response.status === 500) {
                setToast({ message: 'Failed to submit Accreditation Agency', type: 'error' });
            }
            throw error.response.data;
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            await del(`/accreditation-agency/${id}`);
            setData((prev) => prev.filter((item: any) => item.id !== id));
            window.location.reload();
            onSuccess?.();
            setToast({ message: 'Accreditation Agency deleted successfully', type: 'success' });
        } catch (err) {
            console.error(err);
            setToast({ message: 'Failed to deleteAccreditation Agency', type: 'error' });
        } finally {
            onSuccess?.();
            setIsLoading(false);
        }
    };
    return { data, isLoading, toast, fetchData, handleSubmit, handleDelete, setToast, page, totalPages, setPage };
}