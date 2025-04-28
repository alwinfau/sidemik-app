
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type FakultasType = {
    id?: string;
    code: string;
    name: string;
    eng_name: string;
    short_name: string;
    address: string;
    telephone: string;
    academic_period: { name: string };
    is_active: boolean ;
    vision: string;
    mission: string;
    description: string;
};

export const columns = (onEdit: (row: FakultasType) => void, onDelete: (id: string) => void): ColumnDef<FakultasType>[] => [
    {
        id: 'rowNumber',
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    {
        accessorKey: 'code',
        header: 'Kode',
    },
    {
        accessorKey: 'name',
        header: 'Nama',
    },
    {
        accessorKey: 'eng_name',
        header: 'Eng Name',
    },
    {
        accessorKey: 'short_name',
        header: 'Short Name',
    },
    {
        accessorKey: 'address',
        header: 'Address',
    },
    {
        accessorKey: 'telephone',
        header: 'Telephone',
    },
    {
        accessorKey: 'academic_period.name',
        header: 'Academic Period',
        cell: ({ row }) => row.original.academic_period?.name || '-',
    },
    {
        accessorKey: 'vision',
        header: 'Vision',
    },
    {
        accessorKey: 'mission',
        header: 'Mission',
    },
    {
        accessorKey: 'is_active',
        header: 'Status',
    },
    {
        accessorKey: 'description',
        header: 'Deskripsi',
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
