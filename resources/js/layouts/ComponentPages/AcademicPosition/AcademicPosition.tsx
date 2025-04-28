import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/Components_1/DataTable";
import ConfirmDeleteDialog from "@/components/ui/Components_1/DeleteModal";
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";
import { useAxios } from "@/hooks/useAxios";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { columns, AcademicPosition } from "./Column";
import ModalForm from "./Modal";
import { set } from "react-hook-form";

const breadcrumbs: BreadcrumbItem[] = [{ title: "Academic Position", href: "/academic-positions" }];

const AcademicPositionPage = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<AcademicPosition[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<AcademicPosition | undefined>();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res: any = await get("/academic-positions");
            setData(res.data.data);
            return res;
        } catch (err) {
            setToast({ message: "Failed to get Academic Position", type: "error" });
        } finally {
            setIsLoading(false);
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

    const handleSubmit = async (data: Omit<AcademicPosition, "id">, id?: number) => {
        try {
            setIsLoading(true);
            if(id) {
                const res: any = await put(`/academic-positions/${id}`, data);
                setData((prev) => prev.map((p) => (p.id === id ? res : p)));
                await fetchData();
                setModalOpen(false);
                setToast({ message: "Academic Position updated successfully", type: "success" });
                return res;
            } else {
                const res: any = await post("/academic-positions", data);
                setData((prev) => [...prev, res]);
                await fetchData();
                setModalOpen(false);
                setToast({ message: "Academic Position created successfully", type: "success" });
                return res;
            }
           
        } catch (error: any) {
            if (error.response.status === 500) {
                setToast({ message: "Failed to submit Academic Position", type: "error" });
            }

            console.log("Error submitting data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (deleteId) return;
        setIsLoading(true);
            try {
                await del(`/academic-positions/${id}`);
                setData((prev) => prev.filter((p) => p.id !== id));
                setToast({ message: "Academic Position deleted successfully", type: "success" });
            } catch (err) {
                setToast({ message: "Failed to delete Academic Position", type: "error" });
            } finally {
                setIsLoading(false);
                setDeleteId(null);
            }
        
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Academic Position" />
            <div className="m-6">
                <div className="mb-4 flex justify-between">
                    <h1 className="text-2xl font-bold">Academic Position</h1>
                    <Button 
                        onClick={() => {
                            setEditing(undefined);
                            setModalOpen(true);
                        }}
                        className= "flex items-center rounded bg-green-600 p-3 font-bold text-white hover:bg-green-500"
                    >
                        <CirclePlus className="mr-2 " size = {20} />
                        Add Academic Position
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
                <ModalForm
                    open={modalOpen}
                    onOpenChange={setModalOpen}
                    submit={handleSubmit}
                    defaultValues={editing}
                />

                <ConfirmDeleteDialog
                    open={!!deleteId}
                    onCancel={() => setDeleteId(null)}
                    onConfirm={() => handleDelete(deleteId!)}
                />
                {toast && (
                    <ToastProvider swipeDirection="right">
                        <Toast className={`bg-${toast.type === "success" ? "green" : "red"}-500`}>
                            <ToastTitle>{toast.type === "success" ? "Success" : "Error"}</ToastTitle>
                            <ToastDescription>{toast.message}</ToastDescription>
                        </Toast>
                        <ToastViewport />
                    </ToastProvider>
                )}    

            </div>
        </AppLayout>
    );
}

export default AcademicPositionPage;