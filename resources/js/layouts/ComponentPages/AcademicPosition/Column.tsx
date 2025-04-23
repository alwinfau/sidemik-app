import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

export type AcademicPosition = {
    id?: number;
    academic_position_code: string;
    academic_position_name: string;
    academic_position_types_id: number;
};

export const columns = (onEdit: (row: AcademicPosition) => void, onDelete: (id: string) => void): ColumnDef<AcademicPosition>[] => [
    {
        id: "rowNumber",
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    { accessorKey: "academic_position_code", header: "Academic Position Code" },
    { accessorKey: "academic_position_name", header: "Academic Position Name" },
    { accessorKey: "academic_position_types_id", header: "Academic Position Types ID" },
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