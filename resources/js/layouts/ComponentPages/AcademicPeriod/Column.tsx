import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type PeriodeAcademicType = {
    id?: number;
    code: string;
    academic_year: {
        name: string;
    };
    academic_period: Date;
    name: string;
    short_name: string;
    start_date: Date;
    end_date: Date;
    start_midterm_exam: Date;
    end_midterm_exam: Date;
    start_final_exam: Date;
    end_final_exam: Date;
    number_of_meetings: number;
    min_number_of_meetings: number;
    is_active: boolean;
    descritpion: Text;
};

export const columns = (onEdit: (row: PeriodeAcademicType) => void, onDelete: (id: string) => void): ColumnDef<PeriodeAcademicType>[] => [
    {
        id: 'rowNumber',
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    { accessorKey: 'code', header: 'Code' },
    {
        header: 'Years',
        accessorFn: (row) => row.academic_year?.name ?? null,
        id: 'academic_year',
    },
    { accessorKey: 'academic_period', header: 'Academic Period' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'short_name', header: 'Short Name' },
    { accessorKey: 'start_date', header: 'Start Date' },
    { accessorKey: 'end_date', header: 'End Date' },
    { accessorKey: 'start_midterm_exam', header: 'UTS Start Date' },
    { accessorKey: 'end_midterm_exam', header: 'UTS End Date' },
    { accessorKey: 'start_final_exam', header: 'UAS Start Date' },
    { accessorKey: 'end_final_exam', header: 'UAS Final Date' },
    { accessorKey: 'number_of_meetings', header: 'Number Of Attendances' },
    { accessorKey: 'min_number_of_meetings', header: 'Minimum Number Of Attendances' },
    { accessorKey: 'is_active', header: 'Status' },
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
