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
import { UnivEducationLevelType, columns } from './Column';
import ModalForm from './Modal';


const breadcrumbs: BreadcrumbItem[] = [{ 
    title: ' Univ Level Education ', 
    href: '/univ-level-education' 
}];

const UnivLevel = () =>{
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<UnivEducationLevelType[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<UnivEducationLevelType | undefined>();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res: any = await get('/univ-education-level');
            setData(res.data.data);
            return res;
        } catch (err) {
            setToast({ message: 'Failed to get Univ Level Education', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (data: Omit<UnivEducationLevelType, 'id'>, id?: number) => {
        try {
            setIsLoading(true);
            if (id) {
                const res: any = await put(`/univ-education-level/${id}`, data);
                setData((prev) => prev.map((p) => (p.id === id ? res.data : p)));
                await fetchData();
                setModalOpen(false);
                setToast({ message: 'Univ Level Education updated successfully', type: 'success' });
                return res;
            } else {
                const res: any = await post('/univ-education-level', data);
                setData((prev) => [...prev, res.data]);
                await fetchData();
                setModalOpen(false);
                setToast({ message: 'Univ Level Education created successfully', type: 'success' });
                return res;
            }
        } catch (error: any) {
            if (error.response.status === 500) {
                setToast({ message: 'Failed to submit Univ Level Education', type: 'error' });
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
            await del(`/univ-education-level/${deleteId}`);
            setData((prev) => prev.filter((item) => item.id !== deleteId));
            setToast({ message: 'Univ Level Education deleted successfully', type: 'success' });
        } catch (err) {
            setToast({ message: 'Failed to delete Univ Level Education', type: 'error' });
        } finally {
            setIsLoading(false);
            setDeleteId(null);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Univ Level Education" />
            <div className="m-6">
                <div className="mb-4 flex justify-between">
                    <h2 className="text-2xl font-bold">Univ Level Education</h2>
                    <Button
                        onClick={() => {
                            setEditing(undefined);
                            setModalOpen(true);
                        }}
                        className="flex items-center rounded bg-green-600 p-3 font-bold text-white hover:bg-green-500"
                    >
                        <CirclePlus className="h-6 w-6" /> Add Univ Level Education
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
export default UnivLevel;