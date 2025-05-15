import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type AcademicPositionType = {
    id?: number;
    academic_position_code: string;
    academic_position_name: string;
    academic_positions_types: {
        job_type_name: string;
    };
};

export const columns = (onEdit: (row: AcademicPositionType) => void, onDelete: (id: string) => void): ColumnDef<AcademicPositionType>[] => [
    {
        id: 'rowNumber',
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    { accessorKey: 'academic_position_name', header: 'Name' },
    { accessorKey: 'academic_position_code', header: 'Code' },
    {
        header: 'Academic Position Types',
        accessorFn: (row) => row.academic_positions_types?.job_type_name ?? null, // Use the 'name' property from the 'aca?.job_type' object?.job_type_name ?? null,
        id: 'academic_positions_types.job_type_name',
    },
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
