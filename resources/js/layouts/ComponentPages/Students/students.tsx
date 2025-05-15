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
import { columns, StudentType } from './Column';
import ModalForm from './Modal';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'student', href: '/student' }];

const Students = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<StudentType[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<StudentType | undefined>();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const fetchData = async () => {
        try {
            const res: any = await get('/student');
            setData(res);
        } catch (err) {
            console.error('Error fetching:', err);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const handleSubmit = async (product: Omit<StudentType, 'id'>, id?: number) => {
        try {
            if (id) {
                const res: any = await put(`/student/${id}`, product);
                setData((prev) => prev.map((p) => (p.id === id ? res : p)));
                setToast({ message: 'Student updated successfully', type: 'success' });
            } else {
                const res: any = await post('/student', product);
                setData((prev) => [...prev, res]);
                setToast({ message: 'Student created successfully', type: 'success' });
            }
            setModalOpen(false);
        } catch (error) {
            setToast({ message: 'Failed to submit Student', type: 'error' });
        }
    };
    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await del(`/student/${deleteId}`);
            setData((prev) => prev.filter((item) => item.id !== deleteId));
            setDeleteId(null);
            setToast({ message: 'Student deleted successfully', type: 'success' });
        } catch (err) {
            setDeleteId(null);
            setToast({ message: 'Failed to delete Student', type: 'error' });
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Students" />
            <div className="m-6">
                <div className="mb-4 flex justify-between">
                    <h2 className="text-2xl font-bold">Students</h2>
                    <Button
                        onClick={() => {
                            setEditing(undefined);
                            setModalOpen(true);
                        }}
                        className="flex items-center rounded bg-green-600 p-3 font-bold text-white hover:bg-green-500"
                    >
                        <CirclePlus className="h-6 w-6" /> Add Students
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
                <ModalForm open={modalOpen} onOpenChange={setModalOpen} onSubmit={handleSubmit} defaultValues={editing} />
                <ConfirmDeleteDialog open={deleteId !== null} onCancel={() => setDeleteId(null)} onConfirm={handleDelete} />
            </div>
        </AppLayout>
    );
};

export default Students;
