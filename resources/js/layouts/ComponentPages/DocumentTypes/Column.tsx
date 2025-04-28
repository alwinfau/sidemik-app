import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { on } from "events";
import { Pencil, Trash2 } from "lucide-react";

export type DocumentType = {
    id?: number;
    document_type_code: string;
    document_name: string;
    document_type: string;
    document_descrtiption: string;
};

export const columns = (onEdit: (row: DocumentType) => void, onDelete: (id: string) => void): ColumnDef<DocumentType>[] => [
    {
        id: "rowNumber",
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    { accessorKey: "document_type_code", header: "Document Type Code" },
    { accessorKey: "document_name", header: "Document Name" },
    { accessorKey: "document_type", header: "Document Type" },
    { accessorKey: "document_descrtiption", header: "Document Description" },

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