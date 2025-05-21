import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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

export const columns = (
    
    onEdit: (row: Stambuk) => void,
    onDelete: (id: string) => void,
    selectedIds: number[],
    toggleSelect: (id: number) => void,
    toggleSelectAll: (checked: boolean) => void,
    allSelected: boolean,
): ColumnDef<Stambuk>[] => [
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
        header: 'No',
        cell: ({ row }) => <div className="">{row.index + 1}</div>,
    },
    {
        accessorKey: 'year',
        header: 'Tahun Stambuk',
        cell: ({ row }) => row.original.year.slice(0, 4),
    },
    {
        header: ' Kurikulum',
        accessorFn: (row) => row.curriculums?.code ?? null,
        id: 'curriculum',
    },
    {
        header: 'Prodi',
        accessorFn: (row) => row.study_programs?.idn_sp_name ?? null,
        id: 'study_program',
    },
    { accessorKey: 'name', header: 'Angkatan' },
    { 
        accessorKey: 'ukt', 
        header: 'UKT',
        cell: ({ getValue }) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(getValue()),
    },
    // { accessorKey: 'description', header: 'Keterangan' },
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
