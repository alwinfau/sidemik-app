import { useAxios } from '@/hooks/useAxios';
import { ApiResponse, PaginatedApiResponse } from '@/types';
import { useState } from 'react';
import { DevisiTendik } from '../DevisiTendik/Column';
import { JabatanFungsional } from '../JabFung/Column';
import { JabatanStruktural } from '../JabStruk/Column';
import { Proditype } from '../Prodi/Column';
import { StatusDosen } from '../StatusDosen/Column';
import { StatusTendik } from '../StatusTendik/Column';
import { EmployeesType } from './Column';
import { SchemaEmployee } from './Modal';

export const useEmployees = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<EmployeesType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [lecturestatus, setLectureStatus] = useState<StatusDosen[]>([]);
    const [staffstatus, setStaffStatus] = useState<StatusTendik[]>([]);
    const [studyprogram, setStudyProgram] = useState<Proditype[]>([]);
    const [functionalposition, setFunctionalPosition] = useState<JabatanFungsional[]>([]);
    const [strukturalposition, setStructuralPosition] = useState<JabatanStruktural[]>([]);
    const [staffdivision, setStaffDivision] = useState<DevisiTendik[]>([]);

    const fetchData = async (currentPage = 1) => {
        try {
            setIsLoading(true);
            const res: PaginatedApiResponse<EmployeesType> = await get(`/employees?page=${currentPage}&limit=10`);
            setData(res.data.data);
            setPage(res.data.current_page);
            setTotalPages(res.data.last_page ?? 1);
        } catch (err) {
            setToast({ message: `Failed to fetch data ${err}`, type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const fecthRelasi = async () => {
        try {
            const resLectureStatus: ApiResponse<StatusDosen[]> = await get('/lecture-status');
            setLectureStatus(resLectureStatus.data);

            const resStaffStatus: ApiResponse<StatusTendik[]> = await get('/staff-status');
            setStaffStatus(resStaffStatus.data);

            const resStudyProgram: ApiResponse<Proditype[]> = await get('/study-program');
            setStudyProgram(resStudyProgram.data);

            const resFunctionalPosition: ApiResponse<JabatanFungsional[]> = await get('/functional-position');
            setFunctionalPosition(resFunctionalPosition.data);

            const resStructuralPosition: ApiResponse<JabatanStruktural[]> = await get('/structural-position');
            setStructuralPosition(resStructuralPosition.data);

            const resStaffDivision: ApiResponse<DevisiTendik[]> = await get('/staff-division');
            setStaffDivision(resStaffDivision.data);
        } catch (err) {
            console.error('Error fetching:', err);
        }
    };
    const handleSubmit = async (data: Omit<SchemaEmployee, 'id'>, id?: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            if (id) {
                const res: ApiResponse<EmployeesType> = await put(`/employees/${id}`, data);
                setData((prev) => prev.map((p) => (p.id === id ? res.data : p)));
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Employees updated successfully', type: 'success' });
                return res;
            } else {
                const res: ApiResponse<EmployeesType> = await post('/employees', data);
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
