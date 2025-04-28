import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type AccreditionProdiType = {
    id?: number;
    accreditation_code: string;
    accreditation_name: string;
    accreditation_score: string;
    accr_cert_number: string;
    accr_cert_date: string;
    valid_from: string;
    valid_until: string;
    certificate_url: string | null;
    accreditation_agency: {
        accreditation_agency_name: string;
    };
};

export const columns = (onEdit: (row: AccreditionProdiType) => void, onDelete: (id: string) => void): ColumnDef<AccreditionProdiType>[] => [
    { id: 'rowNumber', header: 'No', cell: ({ row }) => <div className="text-center">{row.index + 1}</div> },
    { accessorKey: 'accreditation_code', header: 'Accreditation Code' },
    { accessorKey: 'accreditation_name', header: 'Accreditation Name' },
    { accessorKey: 'accreditation_score', header: 'Accreditation Score' },
    { accessorKey: 'accr_cert_number', header: 'Certificate Number' },
    { accessorKey: 'accr_cert_date', header: 'Certificate Date' },
    { accessorKey: 'valid_from', header: 'Valid From' },
    { accessorKey: 'valid_until', header: 'Valid Until' },
    { accessorKey: 'certificate_url', header: 'Certificate URL' },
    {
        header: 'Agency',
        accessorFn: (row) => row.accreditation_agency?.accreditation_agency_name ?? null,
        id: 'accreditation_agency_name',
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
