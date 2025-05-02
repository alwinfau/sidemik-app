import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/Components_1/DataTable';
import ConfirmDeleteDialog from '@/components/ui/Components_1/DeleteModal';
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import { useAxios } from '@/hooks/useAxios';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AccreditationagencyType, columns } from './Column';
import ModalForm from './Modal';
import { useAccreditationAgency } from './useAccreditationAgency';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Accreditation Agency',
        href: '/accreditation-agency',
    },
];

const AccreditationPage = () => {
    const { data, isLoading, toast, fetchData, handleSubmit, handleDelete, setToast, page, setPage, totalPages } = useAccreditationAgency();
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<AccreditationagencyType | undefined>();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="m-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold">Accreditation Agency</h2>
                    <Button
                        onClick={() => {
                            setEditing(undefined);
                            setModalOpen(true);
                        }}
                        className="flex items-center rounded bg-green-600 p-3 font-bold text-white hover:bg-green-500"
                    >
                        <CirclePlus className="h-6 w-6" /> Add Accreditation Agency
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
                page={page}
                totalPages={totalPages}
                onPageChange={(newPage) => {
                    setPage(newPage);
                    fetchData(newPage);
                }}
            />

            <ModalForm
                open={modalOpen}
                onOpenChange={setModalOpen}
                submit={(values, id) =>
                    handleSubmit(values, id, () => {
                        setModalOpen(false);
                    })
                }
                defaultValues={editing}
            />
            <ConfirmDeleteDialog
                open={deleteId !== null}
                onCancel={() => setDeleteId(null)}
                onConfirm={() => {
                    if (!deleteId) return;
                    handleDelete(deleteId, () => {
                        setDeleteId(null);
                    });
                }}
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
            </div>
        </AppLayout>
    );
};
export default AccreditationPage;
