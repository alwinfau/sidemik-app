import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/Components_1/DataTable';
import ConfirmDeleteDialog from '@/components/ui/Components_1/DeleteModal';
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import { useAxios } from '@/hooks/useAxios';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { AcademicPositionTypes } from './Column';
import { columns } from './Column';
import ModalForm from './modal';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Academic Position Type ', href: '/academic-positions-types' }];

const AcademicPositionTypes = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<AcademicPositionTypes[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<AcademicPositionTypes | undefined>();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res: any = await get('/academic-positions-types');
            setData(res.data.data);
            return res;
        } catch (err) {
            setToast({ message: 'Failed to get Academic position type', type: 'error' });
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

    const handleSubmit = async (data: Omit<AcademicPositionTypes, 'id'>, id?: number) => {
        try {
            setIsLoading(true);
            if (id) {
                const res: any = await put(`/academic-positions-types/${id}`, data);
                setData((prev) => prev.map((p) => (p.id === id ? res.data : p)));
                setToast({ message: 'Academic position type updated successfully', type: 'success' });
                await fetchData();
                setModalOpen(false);
                return res;
            } else {
                const res: any = await post('/academic-positions-types', data);
                setData((prev) => [...prev, res.data]);
                setToast({ message: 'Academic position type created successfully', type: 'success' });
                await fetchData();
                setModalOpen(false);
                return res;
            }
        } catch (error: any) {
            if (error.response.status === 500) {
                setToast({ message: 'Failed to submit Academic position type', type: 'error' });
            }
        } finally {
            setIsLoading(false);
            setModalOpen(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsLoading(true);
        try {
            await del(`/academic-positions-types/${deleteId}`);
            setData((prev) => prev.filter((item) => item.id !== deleteId));
            setToast({ message: 'Academic position type deleted successfully', type: 'success' });
        } catch (err) {
            setToast({ message: 'Failed to delete Academic position type', type: 'error' });
        } finally {
            setIsLoading(false);
            setDeleteId(null);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Academic position type" />
            <div className="m-6">
                <div className="mb-4 flex justify-between">
                    <h2 className="text-2xl font-bold">Academic position type</h2>
                    <Button
                        onClick={() => {
                            setEditing(undefined);
                            setModalOpen(true);
                        }}
                        className="flex items-center rounded bg-green-600 p-3 font-bold text-white hover:bg-green-500"
                    >
                        <CirclePlus className="h-6 w-6" /> Add Academic position type
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

                <ModalForm open={modalOpen} onOpenChange={setModalOpen} submit={handleSubmit} defaultValues={editing} />
                <ConfirmDeleteDialog open={deleteId !== null} onCancel={() => setDeleteId(null)} onConfirm={handleDelete} isLoading={isLoading} />
            </div>
        </AppLayout>
    );
};

export default AcademicPositionTypes;
