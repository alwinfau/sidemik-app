import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type Stambuk = {
    id?: number;
    year: Date;
    name: string;
    ukt: string;
    description: string;
    curriculum_years: {
        curriculum_years_name: string;
    };
    // studi_program: {
    //     idn_sp_name: string;
    // }
};

export const columns = (onEdit: (row: Stambuk) => void, onDelete: (id: string) => void): ColumnDef<Stambuk>[] => [
    {
        id: 'rowNumber',
        header: 'No',
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    { accessorKey: 'year', header: 'Tahun' },
    { accessorKey: 'name', header: 'Nama Stambuk' },
    { accessorKey: 'ukt', header: 'UKT' },
    { accessorKey: 'description', header: 'Keterangan' },
    { header: 'Tahun Kurikulum', accessorFn: (row) => row.curriculum_years?.curriculum_years_name ?? null, id: 'curriculum_years' },
    // { header: 'Academic Period',
    //     accessorFn: (row) => row.studi_program?.idn_sp_name ?? null,
    //     id: 'studi_program',
    // },
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
