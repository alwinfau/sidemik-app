import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/Components_1/DataTable';
import ConfirmDeleteDialog from '@/components/ui/Components_1/DeleteModal';
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import { useAxios } from '@/hooks/useAxios';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { EductionLevelType, columns } from './Column';
import ModalForm from './Modal';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Education Level',
        href: '/education-level',
    },
];


const EducationLevel = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<EductionLevelType[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<EductionLevelType | undefined>();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const fetchData = async () => {
        try {
            const res: any = await get('/education-level');
            setData(res.data.data);
            return res;
        } catch (err) {
            console.error('Error fetching:', err);
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

    const handleSubmit = async (data: Omit<EductionLevelType, 'id'>, id?: number | undefined) => {
        try {
            let res: any;
            if (id) {
                res = await put(`/education-level/${id}`, data);
                setData((prev) => prev.map((p: any) => (p.id === id ? res.data : p)));
                setToast({ message: 'Education Level updated successfully', type: 'success' });
            } else {
                res = await post('/education-level', data);
                setData((prev) => [...prev, res.data]);
                setToast({ message: 'Education Level created successfully', type: 'success' });
            }
    
            await fetchData(); // refresh data table
            setModalOpen(false); // tutup modal setelah berhasil
            return res;
        } catch (error: any) {
            console.log('Error submitting data:', error);
    
            // Tambahkan throw agar isSubmitting kembali ke false
            throw error;
        }
    };
    
    

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsLoading(true);
        try {
            await del(`/education-level/${deleteId}`);
            setData((prev) => prev.filter((item: any) => item.id !== deleteId));
            setDeleteId(null);
            setToast({ message: 'Education Level deleted successfully', type: 'success' });
        } catch (err) {
            console.error(err);
            setToast({ message: 'Failed to delete Education Level', type: 'error' });
        } finally {
            setDeleteId(null);
            setIsLoading(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="m-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold">Education Level</h2>
                    <Button
                        onClick={() => {
                            setEditing(undefined);
                            setModalOpen(true);
                        }}
                        className="flex items-center rounded bg-green-600 p-3 font-bold text-white hover:bg-green-500"
                    >
                        <CirclePlus className="h-6 w-6" /> Add Education Level
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

export default EducationLevel;
