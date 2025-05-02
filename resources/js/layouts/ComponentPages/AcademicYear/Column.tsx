import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type AcademicYearType = {
    id?: number;
    academic_year: string;
    name: string;
    start_date: string;
    end_date: string;
    description: string;
};

export const columns = (onEdit: (row: AcademicYearType) => void, onDelete: (id: string) => void): ColumnDef<AcademicYearType>[] => [
    {
        id: 'rowNumber',
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    { accessorKey: 'academic_year', header: 'Academic Year' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'start_date', header: 'Start Date' },
    { accessorKey: 'end_date', header: 'End Date' },
    { accessorKey: 'description', header: 'Description' },
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
