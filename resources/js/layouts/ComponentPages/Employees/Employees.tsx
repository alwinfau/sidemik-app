import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/Components_1/DataTable';
import ConfirmDeleteDialog from '@/components/ui/Components_1/DeleteModal';
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import { CirclePlus,Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { columns, EmployeesType } from './Column';
import ModalForm from './Modal';
import { useEmployees } from './useEmploye';
import ModalDetails from './ModalDetails';

const EmployeesPage = () => {
    const { data, isLoading, toast, fetchData, handleSubmit, handleDelete, setToast, page, setPage, totalPages } = useEmployees();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalDetailOpen, setModalDetailOpen] = useState(false);
    const [editing, setEditing] = useState<EmployeesType | undefined>();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

    // Toggle select row
    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    // Toggle select all rows
    const toggleSelectAll = (checked: boolean) => {
        if (checked) {
            const allIds = data?.map((d) => d.id!).filter(Boolean) || [];
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    const allSelected = data && data.length > 0 && selectedIds.length === data.length;

    // Hapus banyak data
    const handleBulkDelete = async () => {
        for (const id of selectedIds) {
            await handleDelete(id);
        }
        setSelectedIds([]);
        setBulkDeleteOpen(false);
    };


    useEffect(() => {
        fetchData();
    }, []);

    console.log('data', data);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    return (
        <div className="m-6">
            <div className="mb-4 flex justify-between">
                <h2 className="text-2xl font-bold">Pegawai</h2>
                <div className="flex gap-3">
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
                        className="flex items-center rounded bg-green-500 p-3 font-bold text-white hover:bg-green-600"
                    >
                        <CirclePlus className="h-6 w-6" /> Tambah Pegawai
                    </Button>
                </div>
            </div>


            <DataTable
                columns={columns(
                  (row) => {
                        setEditing(row);
                        setModalOpen(true); 
                        setModalDetailOpen(false);
                    },
                    (row) => {
                        setEditing(row);
                        setModalDetailOpen(true);
                        setModalOpen(false);
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

             <ModalDetails
                open={modalDetailOpen}
                onOpenChange={setModalDetailOpen}
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
                title= {`Hapus ${selectedIds.length} Pilih Pegawai?`}
                description="Apakah Anda yakin ingin menghapus karyawan ini? Tindakan ini tidak dapat dibatalkan."

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

export default EmployeesPage;
