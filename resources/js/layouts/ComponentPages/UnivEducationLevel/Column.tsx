import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type UnivEducationLevelType = {
    id?: number;
    edu_level_code: string;
    edu_study_period: string;
    max_cuti_in_sem: number;
    max_studi_in_sem: number;
    univ_edulevel_description: string;
    education_levels: {
        education_stages_name_id: string;
    };
};

export const columns = (onEdit: (row: UnivEducationLevelType) => void, onDelete: (id: string) => void): ColumnDef<UnivEducationLevelType>[] => [
    { id: 'rowNumber', header: 'No', cell: ({ row }) => <div className="text-center">{row.index + 1}</div> },
    { accessorKey: 'edu_level_code', header: 'Code' },
    { accessorKey: 'edu_study_period', header: 'Education Study Period' },
    { accessorKey: 'max_cuti_in_sem', header: 'Max Cuti Semester' },
    { accessorKey: 'max_studi_in_sem', header: 'Max Studi Semes' },
    { accessorKey: 'univ_edulevel_description', header: 'Description' },
    {
        header: 'Education Name',
        accessorFn: (row) => row.education_levels?.education_stages_name_id ?? null,
        id: 'education_stages_name_id',
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
