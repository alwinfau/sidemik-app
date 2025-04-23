import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/Components_1/DataTable';
import ConfirmDeleteDialog from '@/components/ui/Components_1/DeleteModal';
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import { useAxios } from '@/hooks/useAxios';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { columns, EmployeesType } from './Column';
import ModalForm from './Modal';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Employees',
        href: '/employees',
    },
];

const Employees = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<EmployeesType[]>([]);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<EmployeesType | undefined>();
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const fetchData = async () => {
        try {
            const res: any = await get('/products');
            setData(res);
        } catch (err) {
            console.error('Error fetching:', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (data: Omit<EmployeesType, 'id'>, id?: number) => {
        try {
            if (id) {
                const res: any = await put(`/products/${id}`, data);
                setData((prev) => prev.map((p) => (p.id === id ? res : p)));
                setToast({ message: 'Product updated successfully', type: 'success' });
            } else {
                const res: any = await post('/products', data);
                setData((prev) => [...prev, res]);
                setToast({ message: 'Product created successfully', type: 'success' });
            }
            setModalOpen(false);
        } catch (error) {
            setToast({ message: 'Failed to submit product', type: 'error' });
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await del(`/products/${deleteId}`);
            setData((prev) => prev.filter((item) => item.id !== deleteId));
            setDeleteId(null);
            setToast({ message: 'Product deleted successfully', type: 'success' });
        } catch (err) {
            setDeleteId(null);
            setToast({ message: 'Failed to delete product', type: 'error' });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="m-6">
                <div className="mb-4 flex justify-between">
                    <h2 className="text-2xl font-bold"> Employees </h2>
                    <Button
                        onClick={() => {
                            setEditing(undefined);
                            setModalOpen(true);
                        }}
                        className="flex items-center rounded bg-green-600 p-3 font-bold text-white hover:bg-green-500"
                    >
                        <CirclePlus className="mr-2" />
                        Add Employee
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

                <ModalForm open={modalOpen} onOpenChange={setModalOpen} onSubmit={handleSubmit} defaultValues={editing} />
                <ConfirmDeleteDialog open={deleteId !== null} onCancel={() => setDeleteId(null)} onConfirm={handleDelete} />
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

export default Employees;
