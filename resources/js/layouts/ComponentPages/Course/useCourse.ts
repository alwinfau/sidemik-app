import { useAxios } from '@/hooks/useAxios';
import { useState } from 'react';
import { CourseType } from './Column';

export const useCourse = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<CourseType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const [courseTypes, setCourseTypes] = useState<any>([]);
    const [courseGroups, setCourseGroups] = useState<any>([]);
    const [curriculum, setCurriculum] = useState<any>([]);
    const [MatkulPil, setMatkulPil] = useState<any>([]);

    const fetchData = async (currentPage = 1) => {
        try {
            setIsLoading(true);
            const res: any = await get(`/course?page=${currentPage}&limit=10`);
            setData(res.data.data);
            setPage(res.data.current_page);
            setTotalPages(res.data.last_page);
        } catch (err) {
            setToast({ message: 'Failed to get Course', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const fectRelasi = async () => {
        try {
            const resTypes: any = await get('/course-type');
            setCourseTypes(resTypes.data);

            const resGroups: any = await get('/course-group');
            setCourseGroups(resGroups.data);

            const resCuriculum: any = await get('/curriculum');
            setCurriculum(resCuriculum.data);

            const resMatkulPil: any = await get('/elective-course-groups');
            setMatkulPil(resMatkulPil.data);
        } catch (err) {
            console.error('Error fetching:', err);
        }
    };

    const handleSubmit = async (data: Omit<CourseType, 'id'>, id?: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            if (id) {
                const res: any = await put(`/course/${id}`, data);
                setData((prev) => prev.map((p) => (p.id === id ? res.data : p)));
                setToast({ message: 'Mata Kuliah updated successfully', type: 'success' });
                await fetchData();
                onSuccess?.();
                return res;
            } else {
                const res: any = await post('/course', data);
                setData((prev) => [...prev, res.data]);
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Mata Kuliah created successfully', type: 'success' });
                return res;
            }
        } catch (error: any) {
            if (error?.response?.status === 500) {
                setToast({ message: 'Failed to submit course', type: 'error' });
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
            await del(`/course/${id}`);
            setData((prev) => prev.filter((item) => item.id !== id));
            setToast({ message: 'Course deleted successfully', type: 'success' });
            await fetchData();
            onSuccess?.();
        } catch (err) {
            setToast({ message: 'Failed to delete Course', type: 'error' });
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
        courseTypes,
        courseGroups,
        curriculum,
        MatkulPil,
        fectRelasi,
    };
};
