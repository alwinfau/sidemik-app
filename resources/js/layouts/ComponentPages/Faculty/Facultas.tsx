import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/Components_1/DataTable';
import ConfirmDeleteDialog from '@/components/ui/Components_1/DeleteModal';
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import { useAxios } from '@/hooks/useAxios';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { CirclePlus } from 'lucide-react';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { columns, FakultasType } from './Column';
import ModalForm from './Modal';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Fakultas',
        href: '/faculty',
    },
];

const FakultasPage = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<FakultasType[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<FakultasType | undefined>();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const fetchData = async () => {
        try {
            const res: any = await get('/faculty');
            setData(res.data.data);
        } catch (err) {
            console.error('Error fetching:', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (data: Omit<FakultasType, 'id'>, id?: number | undefined) => {
        try {
            if (id) {
                const res: any = await put(`/faculty/${id}`, data);
                setData((prev) => prev.map((p) => (p.id === id ? res : p)));
                setToast({ message: 'Faculty updated successfully', type: 'success' });
            } else {
                const res: any = await post('/faculty', data);
                setData((prev) => [...prev, res]);
                setToast({ message: 'Faculty created successfully', type: 'success' });
            }
            setModalOpen(false);
        } catch (error) {
            setToast({ message: 'Failed to submit Faculty', type: 'error' });
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await del(`/faculty/${deleteId}`);
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
            <Head title="Fakultas" />
            <div className="m-6">
                <div className="mb-4 flex justify-between">
                    <h2 className="text-2xl font-bold">Fakultas</h2>
                    <Button
                        onClick={() => {
                            setEditing(undefined);
                            setModalOpen(true);
                        }}
                        className="flex items-center rounded bg-green-500 p-3 font-bold text-white hover:bg-green-600"
                        >
                            <CirclePlus className="h-6 w-6" /> Add Facult
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

export default FakultasPage;
