import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/Components_1/DataTable';
import ConfirmDeleteDialog from '@/components/ui/Components_1/DeleteModal';
import { Toast, ToastDescription, ToastProvider, ToastTitle } from '@/components/ui/toast';
import { useAxios } from '@/hooks/useAxios';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { columns, EmployeeRelationship } from './Column';
import ModalForm from './Modal';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Employee Relationship', href: '/employee-relationship' }];

const EmploRelationshipPage = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<EmployeeRelationship[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<EmployeeRelationship | undefined>();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const fetchData = async () => {
        try {
            const res: any = await get('/employee-relationship');
            setData(res);
        } catch (err) {
            console.error('Error fetching:', err);
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

    const handleSubmit = async (data: Omit<EmployeeRelationship, 'id'>, id?: number) => {
        try {
            if (id) {
                const res: any = await put(`/employee-relationship/${id}`, data);
                setData((prev) => prev.map((p) => (p.id === id ? res : p)));
                setToast({ message: 'Employee Relationship updated successfully', type: 'success' });
            } else {
                const res: any = await post('/employee-relationship', data);
                setData((prev) => [...prev, res]);
                setToast({ message: 'Employee Relationship created successfully', type: 'success' });
            }
            setEditing(undefined);
        } catch (err) {
            console.error('Error submitting:', err);
        }
    };
    const handleDelete = async (id: number) => {
        if (deleteId) {
            try {
                await del(`/employee-relationship/${id}`);
                setData((prev) => prev.filter((p) => p.id !== id));
                setToast({ message: 'Employee Relationship deleted successfully', type: 'success' });
            } catch (err) {
                setToast({ message: 'Error deleting Employee Relationship', type: 'error' });
            } finally {
                setDeleteId(null);
            }
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employee Relationships" />
            <div className="m-6">
                <div className="mb-4 flex justify-between">
                    <h1 className="text-3xl font-bold">Employee Relationships</h1>
                    <Button
                        onClick={() => {
                            setEditing(undefined);
                            setModalOpen(true);
                        }}
                        className="flex items-center rounded bg-green-600 p-3 font-bold text-white hover:bg-green-500"
                    >
                        <CirclePlus className="mr-2" size={20} />
                        Add Employee Relationship
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

                <ModalForm open={modalOpen} onOpenChange={setModalOpen} submit={handleSubmit} defaultValues={editing} />

                <ConfirmDeleteDialog open={!!deleteId} onCancel={() => setDeleteId(null)} onConfirm={() => handleDelete(deleteId || 0)} />

                {toast && (
                    <ToastProvider swipeDirection="right">
                        <Toast className={`bg-${toast.type === 'success' ? 'green' : 'red'}-500`}>
                            <ToastTitle>{toast.type}</ToastTitle>
                            <ToastDescription>{toast.message}</ToastDescription>
                        </Toast>
                    </ToastProvider>
                )}
            </div>
        </AppLayout>
    );
};

export default EmploRelationshipPage;
