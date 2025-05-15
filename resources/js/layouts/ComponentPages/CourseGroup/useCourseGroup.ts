import { useAxios } from '@/hooks/useAxios';
import { useState } from 'react';
import { CourseGroupType } from './Column';

export const useCourseGroup = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<CourseGroupType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [agencies, setAgencies] = useState<any>([]);

    const fetchData = async (currentPage = 1) => {
        try {
            setIsLoading(true);
            const res: any = await get(`/course-group?page=${currentPage}&limit=10  `);
            setData(res.data.data);
            setPage(res.data.current_page);
            setTotalPages(res.data.last_page);
        } catch (err) {
            console.error('Error fetching:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (data: Omit<CourseGroupType, 'id'>, id?: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            if (id) {
                const res: any = await put(`/course-group/${id}`, data);
                setData((prev) => prev.map((p: any) => (p.id === id ? res.data : p)));
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Group Course updated successfully', type: 'success' });
                return res;
            } else {
                const res: any = await post('/course-group', data);
                setData((prev) => [...prev, res.data]);
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Group Course created successfully', type: 'success' });
                return res;
            }
        } catch (error: any) {
            if (error.response.status === 500) {
                setToast({ message: 'Failed to submit Group Course', type: 'error' });
            }
            throw error.response.data;
        } finally {
            setIsLoading(false);
        }
    };
    const handleDelete = async (id: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            await del(`/course-group/${id}`);
            setData((prev) => prev.filter((item: any) => item.id !== id));
            onSuccess?.();
            setToast({ message: 'Group Course deleted successfully', type: 'success' });
        } catch (err) {
            console.error(err);
            setToast({ message: 'Failed to delete Group Course', type: 'error' });
        } finally {
            onSuccess?.();
            setIsLoading(false);
        }
    };
    return { data, isLoading, toast, fetchData, handleSubmit, handleDelete, setToast, page, totalPages, setPage };
};
