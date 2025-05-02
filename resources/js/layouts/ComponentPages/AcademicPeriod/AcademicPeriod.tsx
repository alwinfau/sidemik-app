import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/Components_1/DataTable';
import ConfirmDeleteDialog from '@/components/ui/Components_1/DeleteModal';
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import { useAxios } from '@/hooks/useAxios';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { columns, PeriodeAcademicType } from './Column';
import ModalForm from './Modal';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Academic Period',
        href: '/academic-period',
    },
];

const PeriodeAcademic = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<PeriodeAcademicType[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<PeriodeAcademicType | undefined>();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res: any = await get('/academic-period');
            setData(res.data.data);
        } catch (err) {
            console.error('Error Fetching', err);
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

    const handleSubmit = async (data: Omit<PeriodeAcademicType, 'id'>, id?: number | undefined) => {
        try {
            setIsLoading(true);
            if (id) {
                const res: any = await put(`/academic-period/${id}`, data);
                setData((prev) => prev.map((p: any) => (p.id === id ? res.data : p)));
                await fetchData();
                setModalOpen(false);
                setToast({ message: 'Academic Period updated successfully', type: 'success' });
                return res;
            } else {
                const res: any = await post('/academic-period', data);
                setData((prev) => [...prev, res.data]);
                await fetchData();
                setModalOpen(false);
                setToast({ message: 'Academic Period created successfully', type: 'success' });
                return res;
            }
        } catch (error: any) {
            if (error.response.status === 500) {
                setToast({ message: 'Failed to submit Academic Period', type: 'error' });
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
            await del(`/academic-period/${deleteId}`);
            setData((prev) => prev.filter((item: any) => item.id !== deleteId));
            setDeleteId(null);
            setToast({ message: 'Academic Period deleted successfully', type: 'success' });
        } catch (err) {
            console.error(err);
            setToast({ message: 'Failed to delete Academic Period', type: 'error' });
        } finally {
            setDeleteId(null);
            setIsLoading(false);
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="m-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold">Academic Period</h2>
                    <Button
                        onClick={() => {
                            setEditing(undefined);
                            setModalOpen(true);
                        }}
                        className="flex items-center rounded bg-green-600 p-3 font-bold text-white hover:bg-green-500"
                    >
                        <CirclePlus className="h-6 w-6" /> Add Academic Period
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

export default PeriodeAcademic;
