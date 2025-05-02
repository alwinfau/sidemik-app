import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type CuriculumYearsType = {
    id?: number;
    curriculum_years_code: string;
    curriculum_years_name: string;
    curriculum_years_desc: Text;
    start_date: Date;
    end_date: Date;
    study_program: {
        idn_sp_name: string;
    };
    academic_period: {
        name: string;
    };
};

export const columns = (onEdit: (row: CuriculumYearsType) => void, onDelete: (id: string) => void): ColumnDef<CuriculumYearsType>[] => [
    {
        id: 'rowNumber',
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    { accessorKey: 'curriculum_years_code', header: 'Code' },
    { accessorKey: 'curriculum_years_name', header: 'Name' },
    { accessorKey: 'curriculum_years_desc', header: 'Description' },
    { accessorKey: 'start_date', header: 'Start Date' },
    { accessorKey: 'end_date', header: 'End Date' },
    {
        header: 'Prodi',
        accessorFn: (row) => row.study_program?.idn_sp_name ?? null,
        id: 'study_program',
    },
    {
        header: 'Academic Periode',
        accessorFn: (row) => row.academic_period?.name ?? null,
        id: 'name',
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
