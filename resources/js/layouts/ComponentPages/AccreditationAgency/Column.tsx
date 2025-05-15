import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type AccreditationagencyType = {
    id?: number;
    accreditation_agency_code: string;
    accreditation_agency_name: string;
    website_url: string;
};

export const columns = (onEdit: (row: AccreditationagencyType) => void, onDelete: (id: string) => void): ColumnDef<AccreditationagencyType>[] => [
    {
        id: 'rowNumber',
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    { accessorKey: 'accreditation_agency_code', header: 'Code' },
    { accessorKey: 'accreditation_agency_name', header: 'Name' },
    { accessorKey: 'website_url', header: 'URL Website' },
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
