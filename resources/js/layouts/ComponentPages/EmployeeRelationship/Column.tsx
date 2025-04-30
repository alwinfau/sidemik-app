import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

export type EmployeeRelationshipTypes = {
    id?: number;
    code: string;
    name: string;
    employment_relationship_status: boolean;
    pns_status: boolean;
};

export const columns = (onEdit: (row: EmployeeRelationshipTypes) => void, onDelete: (id: string) => void): ColumnDef<EmployeeRelationshipTypes>[] => [
    {
        id: "rowNumber",
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    { accessorKey: "code", header: "Code" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "employment_relationship_status", header: "Employee Relationship Status" },
    { accessorKey: "pns_status", header: "PNS Status" },
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