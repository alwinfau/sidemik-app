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
import { columns, DocumentType } from './Column';
import ModalForm from './Modal';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Document Type', href: '/document-types' }];

const DocumentTypePage = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<DocumentType[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<DocumentType | undefined>();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const fetchData = async () => {
        try {
            const res: any = await get('/document-types');
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

    const handleSubmit = async (document: Omit<DocumentType, 'id'>, id?: number) => {
        try {
            if (id) {
                const res: any = await put(`/document-types/${id}`, document);
                setData((prev) => prev.map((p) => (p.id === id ? res : p)));
                setToast({ message: 'Document updated successfully', type: 'success' });
            } else {
                const res: any = await post('/document-types', document);
                setData((prev) => [...prev, res]);
                setToast({ message: 'Document created successfully', type: 'success' });
            }
            setModalOpen(false);
        } catch (error) {
            setToast({ message: 'Failed to submit document', type: 'error' });
        }
    };
    const handleDelete = async () => {
        if (deleteId) {
            try {
                await del(`/document-types/${deleteId}`);
                setData((prev) => prev.filter((item) => item.id !== deleteId));
                setToast({ message: 'Document deleted successfully', type: 'success' });
            } catch (error) {
                setToast({ message: 'Failed to delete document', type: 'error' });
            } finally {
                setDeleteId(null);
            }
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Document Type" />
            <div className="m-6">
                <div className="mb-4 flex justify-between">
                    <h1 className="text-2xl font-bold">Document Type</h1>
                    <Button
                        onClick={() => {
                            setEditing(undefined);
                            setModalOpen(true);
                        }}
                    >
                        <CirclePlus className="mr-2 h-4 w-4" />
                        Add Document Type
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

                <ConfirmDeleteDialog open={!!deleteId} onCancel={() => setDeleteId(null)} onConfirm={handleDelete} />

                {toast && (
                    <ToastProvider swipeDirection="right">
                        <Toast className={`bg-${toast.type === 'success' ? 'green' : 'red'}-500`}>
                            <ToastTitle>{toast.message}</ToastTitle>
                            <ToastDescription>{toast.message}</ToastDescription>
                        </Toast>
                        <ToastViewport />
                    </ToastProvider>
                )}
            </div>
        </AppLayout>
    );
};
export default DocumentTypePage;
