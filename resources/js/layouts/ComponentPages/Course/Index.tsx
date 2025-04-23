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
import ModalForm from './Modal';
import { CourseType, columns } from './Column';

const breadcrumbs: BreadcrumbItem[] = [{
    title: ' Course', 
    href: '/course' 
}]

const CoursePages = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<CourseType[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<CourseType | undefined>();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res: any = await get('/course');
            setData(res.data.data);
        } catch (err) {
            setToast({ message: 'Failed to get Course', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (data: Omit<CourseType, 'id'>, id?: number) => {
        try {
            setIsLoading(true);
            if (id) {
                const res: any = await put(`/course/${id}`, data);
                setData((prev) => prev.map((p) => (p.id === id ? res.data : p)));
                setToast({ message: 'Course updated successfully', type: 'success' });
            } else {
                const res: any = await post('/course', data);
                setData((prev) => [...prev, res.data]);
                setToast({ message: 'Course created successfully', type: 'success' });
            }
        } catch (error: any) {
            setToast({ message: 'Failed to submit Course', type: 'error' });
        } finally {
            setIsLoading(false);
            setModalOpen(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsLoading(true);
        try {
            await del(`/course/${deleteId}`);
            setData((prev) => prev.filter((item) => item.id !== deleteId));
            setToast({ message: 'Course deleted successfully', type: 'success' });
        } catch (err) {
            setToast({ message: 'Failed to delete Course', type: 'error' });
        } finally {
            setIsLoading(false);
            setDeleteId(null);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Course" />
            <div className="m-6">
                <div className="mb-4 flex justify-between">
                    <h2 className="text-2xl font-bold">Course</h2>
                    <Button
                        onClick={() => {
                            setEditing(undefined);
                            setModalOpen(true);
                        }}
                        className="flex items-center rounded bg-green-600 p-3 font-bold text-white hover:bg-green-500"
                    >
                        <CirclePlus className="h-6 w-6" /> Add Course
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

export default CoursePages;