import { DataTable } from '@/components/ui/Components_1/DataTable';
import ConfirmDeleteDialog from '@/components/ui/Components_1/DeleteModal';
import { Button } from '@/components/ui/button';
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CirclePlus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { columns, Stambuk } from './Column';
import ModalForm from './Modal';
import { useStambuk } from './useStambuk';
const breadcrumbs: BreadcrumbItem[] = [{ title: 'Stambuk', href: '/stambuk' }];

const StambukPage = () => {
    const { data, isLoading, toast, fetchData, handleSubmit, handleDelete, setToast, page, setPage, totalPages } = useStambuk();
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<Stambuk | undefined>();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);


    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };


    const toggleSelectAll = (checked: boolean) => {
        if (checked) {
            const allIds = data?.map((d) => d.id!).filter(Boolean) || [];
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    const allSelected = data && data.length > 0 && selectedIds.length === data.length;

    const handleBulkDelete = async () => {
        for (const id of selectedIds) {
            await handleDelete(id);
        }
        setSelectedIds([]);
        setBulkDeleteOpen(false);
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stambuk" />
            <div className="m-6">
                <div className="mb-4 flex justify-between">
                    <h2 className="text-2xl font-bold">Stambuk</h2>
                    <div className="flex gap-2">
                    {selectedIds.length > 0 && (
                        <Button
                            variant="destructive"
                            className="flex items-center gap-1"
                            onClick={() => setBulkDeleteOpen(true)}
                        >
                            <Trash2 /> Delete Selected ({selectedIds.length})
                        </Button>
                    )}
                    <Button
                        onClick={() => {
                            setEditing(undefined);
                            setModalOpen(true);
                        }}
                        className="flex items-center rounded bg-green-600 p-3 font-bold text-white hover:bg-green-500"
                    >
                        <CirclePlus className="h-6 w-6" /> Add Stambuk
                    </Button>
                    </div>
                </div>

                <DataTable
                    columns={columns(
                        (row) => {
                            setEditing(row);
                            setModalOpen(true);
                        },
                        (id) => setDeleteId(parseInt(id)),
                        selectedIds,
                        toggleSelect,
                        toggleSelectAll,
                        allSelected
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
                <ConfirmDeleteDialog
                    open={bulkDeleteOpen}
                    onCancel={() => setBulkDeleteOpen(false)}
                    onConfirm={() => {
                        handleBulkDelete();
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
export default StambukPage;
