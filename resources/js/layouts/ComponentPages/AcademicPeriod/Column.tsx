import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type PeriodeAcademicType = {
    id?: number;
    code: string;
    academic_year_id: string;
    academic_period: Date;
    name: string;
    short_name: string;
    start_date: Date |null;
    end_date: Date |null;
    start_midterm_exam: Date |null;
    end_midterm_exam: Date |null;
    start_final_exam: Date |null;
    end_final_exam: Date | null;
    number_of_meetings: number |null;
    min_number_of_meetings: number |null;
    is_active: boolean;
    descritpion: Text;
};


export const columns = (onEdit: (row: PeriodeAcademicType) => void, onDelete: (id: string) => void): ColumnDef<PeriodeAcademicType>[] => [
    {
        id: 'rowNumber',
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
        { accessorKey: 'academic_year_id', header: 'Academic Year' },
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
        { accessorKey: 'description', header: 'Description'},
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
