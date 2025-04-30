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
import { columns } from "./Column";
import ModalForm from "./Modal";
import type { EmployeeRelationshipTypes } from "./Column";


const breadcrumbs: BreadcrumbItem[] = [{ title: "Employee Relationship", href: "/employee-relationship" }];

const EmployeeRelationshipTypes = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<EmployeeRelationshipTypes[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<EmployeeRelationshipTypes | undefined>();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res: any = await get("/employments-relationship");
            setData(res.data.data);
        } catch (err) {
            console.error("Error fetching:", err);
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

    const handleSubmit = async (data: Omit<EmployeeRelationshipTypes, "id">, id?: number) => {
        try {
            setIsLoading(true);
            if (id) {
                const res: any = await put(`/employments-relationship/${id}`, data);
                setData((prev) => prev.map((p) => (p.id === id ? res.data : p)));
                await fetchData();
                setModalOpen(false);
                setToast({ message: "Employee Relationship updated successfully", type: "success" });

                return res;
            } else {
                const res: any = await post("/employments-relationship", data);
                console.log(res.data)
                setData((prev) => [...prev, res.data]);
                await fetchData();
                setModalOpen(false);
                setToast({ message: "Employee Relationship created successfully", type: "success" });

                return res;
            }       
        } catch (error: any) {
            if (error.response.status === 500) {
                setToast({ message: "Failed to submit Employee Relationship", type: "error" });
            }
        } finally {
            setIsLoading(false);
        }
    };
        const handleDelete = async () => {
            if (!deleteId) return;
            setIsLoading(true);
            try {
                await del(`/employments-relationship/${deleteId}`);
                setData((prev) => prev.filter((p) => p.id !== deleteId));
                setToast({ message: "Employee Relationship deleted successfully", type: "success" });
            } catch (err) {
                setToast({ message: "Error deleting Employee Relationship", type: "error" });
            } finally {
                setIsLoading(false);
                setDeleteId(null);
            }
        };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employee Relationships" />
            <div className="m-6">
                <div className="mb-4 flex justify-between">
                    <h1 className="text-3xl font-bold">Employee Relationships</h1>
                    <Button
                        onClick={() => {
                            setEditing(undefined);
                            setModalOpen(true);
                        }}
                        className= "flex items-center rounded bg-green-600 p-3 font-bold text-white hover:bg-green-500"
                    >
                        <CirclePlus className="mr-2" size={20} />
                        Add Employee Relationship
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
                isLoading = {isLoading}
            />

            <ModalForm
                open={modalOpen}
                onOpenChange={setModalOpen}
                submit={handleSubmit}
                defaultValues={editing}
            />

            <ConfirmDeleteDialog
                open={deleteId !== null}
                onCancel={() => setDeleteId(null)}
                onConfirm={handleDelete}
                isLoading={isLoading}
            />
            
                {toast && (
                    <ToastProvider swipeDirection="right" >
                        <Toast className={`bg-${toast.type === "success" ? "green" : "red"}-500`}>
                            <ToastTitle>{toast.type}</ToastTitle>
                            <ToastDescription>{toast.message}</ToastDescription>
                        </Toast>
                    </ToastProvider>
                )}
             </div>
        </AppLayout>
    );    

}

export default EmployeeRelationshipTypes;