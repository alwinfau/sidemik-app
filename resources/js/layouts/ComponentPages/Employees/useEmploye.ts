import { useAxios } from '@/hooks/useAxios';
import { useState } from 'react';
import { EmployeesType } from './Column';

export const useEmployees = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<EmployeesType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [lecturestatus, setLectureStatus] = useState<any>([]);
    const [staffstatus, setStaffStatus] = useState<any>([]);
    const [studyprogram, setStudyProgram] = useState<any>([]);
    const [functionalposition, setFunctionalPosition] = useState<any>([]);
    const [strukturalposition, setStructuralPosition] = useState<any>([]);
    const [staffdivision, setStaffDivision] = useState<any>([]);
    const [preview, setPreview] = useState<any>([]);

    const fetchData = async (currentPage = 1) => {
        try {
            setIsLoading(true);
            const res: any = await get(`/employees?page=${currentPage}&limit=10`);
            setData(res.data.data);
            setPage(res.data.current_page);
            setTotalPages(res.data.last_page);
        } catch (err) {
            setToast({ message: 'Failed to fetch data', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const fecthRelasi = async () => {
        try {
            const resLectureStatus: any = await get('/lecture-status');
            setLectureStatus(resLectureStatus.data.data);

            const resStaffStatus: any = await get('/staff-status');
            setStaffStatus(resStaffStatus.data.data);

            const resStudyProgram: any = await get('/study-program');
            setStudyProgram(resStudyProgram.data.data);

            const resFunctionalPosition: any = await get('/functional-position');
            setFunctionalPosition(resFunctionalPosition.data.data);

            const resStructuralPosition: any = await get('/structural-position');
            setStructuralPosition(resStructuralPosition.data.data);

            const resStaffDivision: any = await get('/staff-division');
            setStaffDivision(resStaffDivision.data.data);
        } catch (err) {
            console.error('Error fetching:', err);
        }
    };
    const handleSubmit = async (data: Omit<EmployeesType, 'id'>, id?: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            if (id) {
                const res: any = await put(`/employees/${id}`, data);
                setData((prev) => prev.map((p: any) => (p.id === id ? res.data : p)));
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Employees updated successfully', type: 'success' });
                return res;
            } else {
                const res: any = await post('/employees', data);
                setData((prev) => [...prev, res.data]);
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Employees created successfully', type: 'success' });
                return res;
            }
        } catch (error: any) {
            if (error.response.status === 500) {
                setToast({ message: 'Failed to submit Employees', type: 'error' });
            }
            console.error(error);
            throw error.response.data;
        } finally {
            setIsLoading(false);
        }
    };
    const handleDelete = async (id: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            await del(`/employees/${id}`);
            setData((prev) => prev.filter((item: any) => item.id !== id));
            onSuccess?.();
            setToast({ message: 'Employees deleted successfully', type: 'success' });
        } catch (err) {
            console.error(err);
            setToast({ message: 'Failed to delete Employees', type: 'error' });
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
        lecturestatus,
        staffstatus,
        studyprogram,
        functionalposition,
        strukturalposition,
        staffdivision,
        fecthRelasi,
    };
};
