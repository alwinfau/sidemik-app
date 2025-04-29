import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/Components_1/DataTable';
import ConfirmDeleteDialog from '@/components/ui/Components_1/DeleteModal';
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import { CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AccreditionProdiType, columns } from './Column';
import ModalForm from './Modal';
import { useProdiAccreditation } from './useProdiAccreditation';

const ProdyAccreditation = () => {
    const { data, isLoading, toast, fetchData, handleSubmit, handleDelete, setToast, page, setPage, totalPages } = useProdiAccreditation();
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<AccreditionProdiType | undefined>();
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
        <div className="m-6">
            <div className="mb-4 flex justify-between">
                <h2 className="text-2xl font-bold">Prodi Accreditation</h2>
                <Button
                    onClick={() => {
                        setEditing(undefined);
                        setModalOpen(true);
                    }}
                    className="flex items-center rounded bg-green-600 p-3 font-bold text-white hover:bg-green-500"
                >
                    <CirclePlus className="h-6 w-6" /> Add Prodi Accreditation
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
    );
};

export default ProdyAccreditation;
