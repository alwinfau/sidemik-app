import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/Components_1/DataTable";
import ConfirmDeleteDialog from "@/components/ui/Components_1/DeleteModal";
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";
import { useAxios } from "@/hooks/useAxios";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { columns, ActiveStatus } from "./Column";
import ModalForm from "./Modal";

const breadcrumbs: BreadcrumbItem[] = [{ title: "Active Statuses", href: "/active-statuses" }];

const ActiveStatusesPage = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<ActiveStatus[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<ActiveStatus | undefined>();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res: any = await get("/active-statuses");
            setData(res.data.data);
            return res;
        } catch (err) {
            setToast({ message: "Failed to get Active Statuses", type: "error" });
        } finally {
            setIsLoading(false);
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

    const handleSubmit = async (data: Omit<ActiveStatus, "id">, id?: number | undefined) => {
        try { 
            setIsLoading(true);
            if (id) {
                const res: any = await put(`/active-statuses/${id}`, data);
                setData((prev) => prev.map((p) => (p.id === id ? res.data : p)));
                await fetchData();
                setModalOpen(false);
                setToast({ message: "Active Status updated successfully", type: "success" });
                return res;
            } else {
                const res: any = await post("/active-statuses", data);
                setData((prev) => [...prev, res.data]);
                await fetchData();
                setModalOpen(false);
                setToast({ message: "Active Status created successfully", type: "success" });
                return res;
            }        
        } catch (error: any) {
            if (error.response.status === 500) {
                setToast({ message: "Internal Server Error", type: "error" });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        
        if (!deleteId) return;
        setIsLoading(true);
        try {
            await del(`/active-statuses/${deleteId}`);
            setData((prev) => prev.filter((p) => p.id !== deleteId));
            setToast({ message: "Active Status deleted successfully", type: "success" });
        } catch (err) {
            setToast({ message: "Failed to delete Active Status", type: "error" });
        } finally {
            setIsLoading(false);
            setDeleteId(null);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="m-6">
                <div className="mb-4 flex justify-between">
                    <h1 className="text-3xl font-bold">Active Statuses</h1>
                    <Button
                        onClick={() => {
                            setEditing(undefined);
                            setModalOpen(true);
                        }}
                        className="flex items-center rounded bg-green-600 p-3 font-bold text-white hover:bg-green-500"
                    >
                        <CirclePlus className="mr-2 h-4 w-4" />
                        Add Active Status
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
                <ConfirmDeleteDialog open={deleteId !== null} onCancel={() => setDeleteId(null)} onConfirm={handleDelete} isLoading={isLoading} />

                <ToastProvider>
                    {toast && (
                        <Toast variant={toast.type === "error" ? "destructive" : "default"}>
                            <ToastTitle>{toast.type === "success" ? "Success" : "Error"}</ToastTitle>
                            <ToastDescription>{toast.message}</ToastDescription>
                        </Toast>
                    )}
                    <ToastViewport />
                </ToastProvider>
            </div>
        </AppLayout>
    );
};

export default ActiveStatusesPage;
