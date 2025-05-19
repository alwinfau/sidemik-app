import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type FakultasType = {
    id?: number;
    code: string;
    name: string;
    eng_name: string;
    short_name: string;
    address: string;
    telephone: string;
    is_active: boolean;
    vision: string;
    mission: string;
    description: string;
    academic_period: {
        name: string;
    };
};

export const columns = (onEdit: (row: FakultasType) => void, onDelete: (id: string) => void): ColumnDef<FakultasType>[] => [
    {
        id: 'rowNumber',
        header: 'No',
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    { accessorKey: 'code', header: 'Code' },
    {
        header: 'Periode Akademik',
        accessorFn: (row) => row.academic_period?.name ?? null,
        id: 'academic_period',
    },
    { accessorKey: 'name', header: 'Nama Fakultas' },
    { accessorKey: 'eng_name', header: 'Nama Fakultas(ENG)' },
    { accessorKey: 'short_name', header: 'Singkatan' },
    { accessorKey: 'address', header: 'Alamat' },
    { accessorKey: 'telephone', header: 'Telephone', cell: ({ getValue }) => getValue<number>() ?? '-' },
    { accessorKey: 'vision', header: 'Visi', cell: ({ getValue }) => getValue<string>() ?? '-' },
    { accessorKey: 'mission', header: 'Misi', cell: ({ getValue }) => getValue<string>() ?? '-' },
    { accessorKey: 'description', header: 'Keterangan', cell: ({ getValue }) => getValue<string>() ?? '-' },
    {
        accessorKey: 'is_active',
        header: 'Status',
        cell: ({ getValue }) => <div className="text-center">{getValue<boolean>() ? 'Aktif' : 'Tidak Aktif'}</div>,
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
