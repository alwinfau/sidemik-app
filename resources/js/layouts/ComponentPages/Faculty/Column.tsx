import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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

export const columns = (
    onEdit: (row: FakultasType) => void,
    onDelete: (id: string) => void,
    selectedIds: number[],
    toggleSelect: (id: number) => void,
    toggleSelectAll: (checked: boolean) => void,
    allSelected: boolean,
): ColumnDef<FakultasType>[] => [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={allSelected}
                onCheckedChange={(checked) => toggleSelectAll(!!checked)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => {
            const id = row.original.id!;
            return (
                <Checkbox
                    checked={selectedIds.includes(id)}
                    onCheckedChange={() => toggleSelect(id)}
                    aria-label={`Select row ${id}`}
                />
            );
        },
        enableSorting: false,
        size: 20,
    },
    {
        id: 'rowNumber',
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    { accessorKey: 'code', header: 'Code' },
    
    { 
        accessorKey: 'combined_name',
        header: 'Nama Prodi & Singkatan',
        cell: ({ row }) => `${row.original.name} (${row.original.short_name})`, },
    
    { accessorKey: 'eng_name', header: 'Nama Fakultas(ENG)' },
    // { accessorKey: 'address', header: 'Alamat' },
    // { accessorKey: 'telephone', header: 'Telephone', cell: ({ getValue }) => getValue<number>() ?? '-' },
    // { accessorKey: 'vision', header: 'Visi', cell: ({ getValue }) => getValue<string>() ?? '-' },
    // { accessorKey: 'mission', header: 'Misi', cell: ({ getValue }) => getValue<string>() ?? '-' },
    // { accessorKey: 'description', header: 'Keterangan', cell: ({ getValue }) => getValue<string>() ?? '-' },
    {
        accessorKey: 'is_active',
        header: 'Status',
        cell: ({ getValue }) =>  
        <div className={`font-semibold ${ getValue<boolean>() ? 'text-green-600' : 'text-red-600' }`}>
            {getValue<boolean>() ? 'Aktif' : 'Tidak Aktif'}
        </div>  
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
