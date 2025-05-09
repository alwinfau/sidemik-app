import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type Stambuk = {
    id?: number;
    year: string;
    name: string;
    ukt: number;
    // description: string;
    curriculums: {
        code: Date;
    };
    study_programs: {
        idn_sp_name: string;
    };
};

export const columns = (onEdit: (row: Stambuk) => void, onDelete: (id: string) => void): ColumnDef<Stambuk>[] => [
    {
        id: 'rowNumber',
        header: 'No',
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    { 
        accessorKey: 'year', 
        header: 'Tahun' ,
        cell: ({row}) => row.original.year.slice(0, 4)
    },
    { accessorKey: 'name', header: 'Nama Stambuk' },
    { accessorKey: 'ukt', header: 'UKT' },
    // { accessorKey: 'description', header: 'Keterangan' },
    {
        header: 'Tahun Kurikulum',
        accessorFn: (row) => row.curriculums?.code ?? null,
        id: 'curriculum',
    },
    {
        header: 'Prodi',
        accessorFn: (row) => row.study_programs?.idn_sp_name ?? null,
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

export default columns;
