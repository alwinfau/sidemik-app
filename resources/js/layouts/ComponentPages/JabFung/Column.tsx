import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type JabatanFungsional = {
    id?: number;
    code: string;
    name: string;
    description: string;
};

export const columns = (onEdit: (row: JabatanFungsional) => void, onDelete: (id: string) => void): ColumnDef<JabatanFungsional>[] => [
    { id: 'rowNumber', header: 'No', cell: ({ row }) => <div className="text-center">{row.index + 1}</div> },
    { accessorKey: 'code', header: ' Kode' },
    { accessorKey: 'name', header: ' Nama' },
    { accessorKey: 'description', header: ' Keterangan' },
    {
        id: 'actions',
        header: 'Aksi',
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
