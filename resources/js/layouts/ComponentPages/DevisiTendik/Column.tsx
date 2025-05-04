import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type DevisiTendik = {
    id?: number;
    kode: string;
    nama: string;
    keterangan: string;
};

export const columns = (onEdit: (row: DevisiTendik) => void, onDelete: (id: string) => void): ColumnDef<DevisiTendik>[] => [
    { id: 'rowNumber', header: 'No', cell: ({ row }) => <div className="text-center">{row.index + 1}</div> },
    { accessorKey: 'kode', header: ' kode' },
    { accessorKey: 'nama', header: ' Nama' },
    { accessorKey: 'keterangan', header: ' Keterangan' },
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
