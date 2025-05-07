import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type CurriculumType = {
    id?: number;
    code: string;
    curriculum_year: Date;
    sks_required: string;
    sks_elective: string;
    // description: string
    study_program: {
        idn_sp_name: string;
    };
};
export const columns = (onEdit: (row: CurriculumType) => void, onDelete: (id: string) => void): ColumnDef<CurriculumType>[] => [
    {
        id: 'rowNumber',
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    { accessorKey: 'code', header: 'Code' },
    { accessorKey: 'curriculum_year', header: 'Tahun Kurikulum' },
    { accessorKey: 'sks_required', header: 'SKS Wajib' },
    { accessorKey: 'sks_elective', header: 'SKS Pilihan' },
    // { accessorKey:'description', header: 'Keterangan'},
    {
        header: 'Prodi',
        accessorFn: (row) => row.study_program?.idn_sp_name ?? null,
        id: 'study_program',
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
