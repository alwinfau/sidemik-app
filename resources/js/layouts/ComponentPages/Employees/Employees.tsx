import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/Components_1/DataTable';
import ConfirmDeleteDialog from '@/components/ui/Components_1/DeleteModal';
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import { useAxios } from '@/hooks/useAxios';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { columns, EmployeesType } from './Column';
import ModalForm from './Modal';
import { set } from 'react-hook-form';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {title: 'Employees', href: '/employees'}];

const Employees = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<EmployeesType[]>([]);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<EmployeesType | undefined>();
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
       const fetchData = async () => {
           try {
               setIsLoading(true);
               const res: any = await get('/employees');
               setData(res.data.data);
               return res;
           } catch (err) {
               setToast({ message: 'Failed to get Prodi Accreditation', type: 'error' });
           } finally {
               setIsLoading(false);
           }
       };
   
       useEffect(() => {
           fetchData();
       }, []);
       
   
       const handleSubmit = async (data: Omit<EmployeesType, 'id'>, id?: number) => {
           try {
               setIsLoading(true);
               if (id) {
                   const res: any = await put(`/employees/${id}`, data);
                   setData((prev) => prev.map((p) => (p.id === id ? res.data : p)));
                   await fetchData();
                   setModalOpen(false);
                   setToast({ message: 'Prodi Accreditation updated successfully', type: 'success' });
                   return res;
               } else {
                   const res: any = await post('/employees', data);
                   setData((prev) => [...prev, res.data]);
                   await fetchData();
                   setModalOpen(false);
                   setToast({ message: 'Prodi Accreditation created successfully', type: 'success' });
                   return res;
               }
           } catch (error: any) {
               if (error.response.status === 500) {
                   setToast({ message: 'Failed to submit Prodi Accreditation', type: 'error' });
               }
           } finally {
               setIsLoading(false);
              
           }
       };
   
       const handleDelete = async () => {
           if (!deleteId) return;
           setIsLoading(true);
           try {
               await del(`/employees/${deleteId}`);
               setData((prev) => prev.filter((item) => item.id !== deleteId));
               setToast({ message: 'Prodi Accreditation deleted successfully', type: 'success' });
           } catch (err) {
               setToast({ message: 'Failed to delete Prodi Accreditation', type: 'error' });
           } finally {
               setIsLoading(false);
               setDeleteId(null);
           }
       };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employees" />
            <div className="m-6">
                <div className="mb-4 flex justify-between">
                    <h1 className="text-2xl font-bold"> Employees </h1>
                    <Button
                        onClick={() => {
                            setEditing(undefined);
                            setModalOpen(true);
                        }}
                        className="flex items-center rounded bg-green-600 p-3 font-bold text-white hover:bg-green-500"
                    >
                        <CirclePlus className="mr-2" />
                        Add Employee
                    </Button>
                </div>
                <DataTable
                    columns={columns(
                        (row) => {
                            setEditing(row);
                            setModalOpen(true);
                        },
                        (id) => 
                            setDeleteId(parseInt(id)),
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
                <ConfirmDeleteDialog open={deleteId !== null} onCancel={() => setDeleteId(null)} onConfirm={handleDelete} />
            </div>
        </AppLayout>
    );
}

export default Employees;
