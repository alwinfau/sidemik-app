import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/Components_1/DataTable";
import ConfirmDeleteDialog from "@/components/ui/Components_1/DeleteModal";
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";
import { useAxios } from "@/hooks/useAxios";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { columns, ProvinceType } from "./Column";
import ModalForm from "./Modal";
import { set } from "react-hook-form";

const breadcrumbs: BreadcrumbItem[] = [
    { title: "ProvinceType", href: "/province" }
];

const ProvinceTypePage = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<ProvinceType[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<ProvinceType | undefined>();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res: any = await get("/province");
            setData(res.data.data);
        } catch (err) {
            setToast({ message: "Failed to get Province types", type: "error" });
        } finally {
            setLoading(false);
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

    const handleSubmit = async (data: Omit<ProvinceType, "id">, id?: number) => {
        try {
            setLoading(true);
            if (id) {
                const res: any = await put(`/province/${id}`, data);
                setData((prev) => prev.map((p) => (p.id === id ? res.data : p)));
                await fetchData();
                setModalOpen(false);
                setToast({ message: "Province updated successfully", type: "success" });

                return res;
            } else {
                const res: any = await post("/province", data);
                setData((prev) => [...prev, res.data]);
                await fetchData();
                setModalOpen(false);
                setToast({ message: "Province created successfully", type: "success" });

                return res;
            }
           
        } catch (error: any) {
            if (error.response.status === 500) {
                setToast({ message: "Failed to submit Province", type: "error" });
            }  
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (deleteId) return;
        setLoading(true);
            try {
                await del(`/province/${deleteId}`);
                setData((prev) => prev.filter((item) => item.id !== deleteId));
                setToast({ message: "Province deleted successfully", type: "success" });
            } catch (error) {
                setToast({ message: "Failed to delete Province", type: "error" });
            } finally {
                setLoading(false);
                setDeleteId(null);
            }
        
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="m-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold">Province</h2>
                    <Button
                        onClick={() => {
                            setEditing(undefined);
                            setModalOpen(true);
                        }}
                        className="flex items-center rounded bg-green-600 p-3 font-bold text-white hover:bg-green-500"
                    >
                        <CirclePlus className="h-6 w-6" /> Add Province
                    </Button>
                </div>
                <DataTable
                    columns={columns(
                        (row) => {
                            setEditing(row);
                            setModalOpen(true);
                        },
                        (id) => setDeleteId(parseInt(id))
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

export default ProvinceTypePage;
