import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/Components_1/DataTable';
import ConfirmDeleteDialog from '@/components/ui/Components_1/DeleteModal';
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import { useAxios } from '@/hooks/useAxios';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AcademicYearType, columns } from './Column';
import ModalForm from './Modal';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Academic Year',
        href: '/academic-year',
    },
];

const AcademicYearPage = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<AcademicYearType[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<AcademicYearType | undefined>();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchData = async (currentPage = 1) => {
        setIsLoading(true);
        try {
            const res: any = await get(`academic-year?page=${currentPage}&limit=2`);
            setData(res.data.data);
            setPage(res.data.current_page);
            setTotalPages(res.data.last_page);
        } catch (err) {
            setToast({ message: 'Failed to get Academic Year', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const handleSubmit = async (data: Omit<AcademicYearType, 'id'>, id?: number | undefined) => {
        try {
            setIsLoading(true);
            if (id) {
                const res: any = await put(`/academic-year/${id}`, data);
                setData((prev) => prev.map((p: any) => (p.id === id ? res.data : p)));
                await fetchData();
                setModalOpen(false);
                setToast({ message: 'Academic Year updated successfully', type: 'success' });
                return res;
            } else {
                const res: any = await post('/academic-year', data);
                setData((prev) => [...prev, res.data]);
                await fetchData();
                setModalOpen(false);
                setToast({ message: 'Academic Year created successfully', type: 'success' });
                return res;
            }
        } catch (error: any) {
            if (error.response.status === 500) {
                setToast({ message: 'Failed to submit Academic Year', type: 'error' });
            }
            throw error.response.data;
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsLoading(true);
        try {
            await del(`/academic-year/${deleteId}`);
            setData((prev) => prev.filter((item: any) => item.id !== deleteId));
            setDeleteId(null);
            setToast({ message: 'Academic Year deleted successfully', type: 'success' });
        } catch (err) {
            setToast({ message: 'Failed to delete Academic Year', type: 'error' });
        } finally {
            setDeleteId(null);
            setIsLoading(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="m-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold">Academic Year</h2>
                    <Button
                        onClick={() => {
                            setEditing(undefined);
                            setModalOpen(true);
                        }}
                        className="flex items-center rounded bg-green-600 p-3 font-bold text-white hover:bg-green-500"
                    >
                        <CirclePlus className="h-6 w-6" /> Add Academic Year
                    </Button>
                </div>
                <DataTable
                    columns={columns(
                        (row) => {
                            setEditing(row);
                            setModalOpen(true);
                        },
                        (id) => setDeleteId(parseInt(id)),
                    )}
                    data={data || []}
                    isLoading={isLoading}
                    page={page}
                    totalPages={totalPages}
                    onPageChange={(newPage) => {
                        setPage(newPage);
                        fetchData(newPage);
                    }}
                />
                <ModalForm open={modalOpen} onOpenChange={setModalOpen} submit={handleSubmit} defaultValues={editing} />
                <ConfirmDeleteDialog open={deleteId !== null} onCancel={() => setDeleteId(null)} onConfirm={handleDelete} isLoading={isLoading} />
                <ToastProvider>
                    {toast && (
                        <Toast variant={toast.type === 'error' ? 'destructive' : 'default'}>
                            <div className="grid gap-1">
                                <ToastTitle>{toast.type === 'success' ? 'Success' : 'Error'}</ToastTitle>
                                <ToastDescription>{toast.message}</ToastDescription>
                            </div>
                        </Toast>
                    )}
                    <ToastViewport />
                </ToastProvider>
            </div>
        </AppLayout>
    );
};

export default AcademicYearPage;
