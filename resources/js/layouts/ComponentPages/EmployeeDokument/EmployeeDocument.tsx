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
import { columns, EmployeeDocumentType } from './Column';
import ModalForm from './Modal';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'EmployeeDocument',
        href: '/employee-documnet',
    },
];

const EmployeeDocumentPage = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<EmployeeDocumentType[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<EmployeeDocumentType | undefined>();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res: any = await get('/employee-documents');
            setData(res.data.data);
            return res;
        } catch (err) {
            setToast({ message: 'Failed to get Employee Document', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);
    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (data: Omit<EmployeeDocumentType, 'id'>, id?: number) => {
        try {
            if (id) {
                const res: any = await put(`/employee-documents/${id}`, data);
                setData((prev) => prev.map((p) => (p.id === id ? res.data : p)));
                await fetchData();
                setModalOpen(false);
                setToast({ message: 'Product updated successfully', type: 'success' });
                return res;
            } else {
                const res: any = await post('/employee-documents', data);
                setData((prev) => [...prev, res.data]);
                await fetchData();
                setModalOpen(false);
                setToast({ message: 'Product created successfully', type: 'success' });
                return res;
            }
        } catch (error: any) {
            if (error.response.status === 500) {
                setToast({ message: 'Failed to submit product', type: 'error' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsLoading(true);
        try {
            await del(`/employee-documents/${deleteId}`);
            setData((prev) => prev.filter((p) => p.id !== deleteId));
            setToast({ message: 'Employee Document deleted successfully', type: 'success' });
        } catch (err) {
            setToast({ message: 'Failed to delete Employee Document', type: 'error' });
        } finally {
            setIsLoading(false);
            setDeleteId(null);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employee Document" />
            <div className="m-6">
                <div className="mb-4 flex justify-between">
                    <h2 className="text-2xl font-bold">Employee Document</h2>
                    <Button
                        onClick={() => {
                            setEditing(undefined);
                            setModalOpen(true);
                        }}
                        className="flex items-center rounded bg-green-500 p-3 font-bold text-white hover:bg-green-600"
                    >
                        <CirclePlus className="h-6 w-6" />
                        Add Employee Document
                    </Button>
                </div>

                <DataTable
                    columns={columns(
                        (row) => {
                            setEditing(row);
                            setModalOpen(true);
                        },
                        (id) => {
                            setDeleteId(parseInt(id));
                        },
                    )}
                    data={data || []}
                    isLoading={isLoading}
                />
            </div>

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
        </AppLayout>
    );
};

export default EmployeeDocumentPage;
