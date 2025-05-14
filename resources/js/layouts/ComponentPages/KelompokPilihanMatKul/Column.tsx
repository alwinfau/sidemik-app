import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type MatkulPilihan = {
    id?: number;
    code: string;
    name: string;
    is_active: boolean;
    // description: string
    study_program: {
        idn_sp_name: string;
    };
};

export const columns = (onEdit: (row: MatkulPilihan) => void, onDelete: (id: string) => void): ColumnDef<MatkulPilihan>[] => [
    {
        id: 'rowNumber',
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    { accessorKey: 'code', header: 'Kode' },
    { accessorKey: 'name', header: 'Mata Kuliah Pilihan' },
    {
        accessorKey: 'is_active',
        header: 'Status',
        cell: ({ getValue }) => <div>{getValue<boolean>() ? 'Aktif' : 'Tidak Aktif'}</div>,
    },
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
