import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type AcademicPositionTypes = {
    id?: number;
    job_type_code: string;
    job_type_name: string;
    job_type_description: string;
};


export const columns = (onEdit: (row: AcademicPositionTypes) => void, onDelete: (id: string) => void): ColumnDef<AcademicPositionTypes>[] => [
    { id: 'rowNumber', header: 'No', cell: ({ row }) => <div className="text-center">{row.index + 1}</div> },
    { accessorKey: 'job_type_code', header: 'Job Type Code' },
    { accessorKey: 'job_type_name', header: 'Job Type Name' },
    { accessorKey: 'job_type_description', header: 'Job Type Description' },
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

