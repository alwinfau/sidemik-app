import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type ActiveStatus = {
    id?: number;
    active_status_code: string;
    active_status_name: boolean;
    active_status_description: string;
};

export const columns = (onEdit: (row: ActiveStatus) => void, onDelete: (id: string) => void): ColumnDef<ActiveStatus>[] => [
    {
        id: 'rowNumber',
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    { accessorKey: 'active_status_code', header: 'Active Status Code' },
    { 
        accessorKey: 'active_status_name', 
        header: 'Active Status Name',
        cell: ({ getValue }) => <div className="text-center">{getValue<boolean>() ? 'Active' : 'Inactive'}</div>,
    },
    { accessorKey: 'active_status_description', header: 'Active Status Description' },
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
