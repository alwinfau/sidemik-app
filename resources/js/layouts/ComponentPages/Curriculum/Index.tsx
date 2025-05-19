import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/Components_1/DataTable';
import ConfirmDeleteDialog from '@/components/ui/Components_1/DeleteModal';
import { Input } from '@/components/ui/input';
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { columns, CurriculumType } from './Column';
import ModalForm from './Modal';
import { useCurriculum } from './useCurriculum';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Kurikulum', href: '/curriculum' }];

const Curiculumpage = () => {
    const {
        data,
        isLoading,
        toast,
        TahunKurikulum,
        setTahunKurikulum,
        setSearchTahunKurikulum,
        fetchData,
        handleSubmit,
        handleDelete,
        setToast,
        page,
        setPage,
        totalPages,
    } = useCurriculum();
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<CurriculumType | undefined>();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    useEffect(() => {
        fetchData();
    }, []);

    // const handleSearch = () => {
    //     fecthSearch();
    // }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kurikulum" />
            <div className="m-6">
                <div className="flex items-center gap-2">
                    <Input
                        id="search"
                        placeholder="Search. .."
                        onChange={(e) => {
                            setSearchTahunKurikulum(e.target.value);
                        }}
                        className="mt-3 max-w-sm bg-white"
                    />
                    <Button className="self-end">search</Button>
                </div>
                <div className="mb-4 flex justify-between">
                    <h2 className="text-2xl font-bold">Kurikulum</h2>
                    <Button
                        onClick={() => {
                            setEditing(undefined);
                            setModalOpen(true);
                        }}
                        className="flex items-center rounded bg-green-500 p-3 font-bold text-white hover:bg-green-600"
                    >
                        <CirclePlus className="h-6 w-6" /> Add Kurikulum
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
export default Curiculumpage;
