import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type EmployeeDocumentType = {
    id?: number;
    document_type_id: {
        document_type_name: string;
    };
    employee_id: {
        employee_name: string;
    };
    document_url: string;
};

export const columns = (onEdit: (row: EmployeeDocumentType) => void, onDelete: (id: string) => void): ColumnDef<EmployeeDocumentType>[] => [
    {
        id: 'rowNumber',
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    {
        header: 'Document Type',
        accessorFn: (row) => row.document_type_id?.document_type_name ?? null,
        id: 'document_type_name',
    },
    {
        header: 'Employee',
        accessorFn: (row) => row.employee_id?.employee_name ?? null,
        id: 'employee_name',
    },
    { accessorKey: 'document_url', header: 'Document URL' },

    {
        id: 'actions',
        header: 'Actions',
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
