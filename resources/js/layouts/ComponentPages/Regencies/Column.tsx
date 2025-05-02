import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

export type RegenciesType = {
    id?: number;
    name: string;
    description: string;
    province: {
        name: string;
    };
};

export const columns = (onEdit: (row: RegenciesType) => void, onDelete: (id: string) => void): ColumnDef<RegenciesType>[] => [
    {
        id: "rowNumber",
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "description", header: "Description" },
    { 
        header: "Province",
        accessorFn: (row) => row.province?.name ?? null, // Use the 'name' property from the 'province' object?.job_type_name ?? null,
        id: "province.name",
     },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Button className="bg-blue-700 hover:bg-blue-600" size="sm" onClick={() => onEdit(row.original)}>
                    <Pencil />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(row.original.id!.toString())}>
                    <Trash2 />
                </Button>
            </div>
        ),
    },
];

export default columns;