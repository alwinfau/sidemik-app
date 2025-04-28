import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type EductionLevelType = {
    id?: number;
    education_level_code: string;
    education_stages: string;
    education_stages_name_id: string;
    education_stages_name_en: string;
    education_stages_sequence: number;
    university_level: string;
    postgraduate: Boolean;
    rpl_stages: Boolean
}
export const columns = (onEdit: (row: EductionLevelType) => void, onDelete: (id: string) => void): ColumnDef<EductionLevelType>[] => [
    {
        id: 'rowNumber',
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    { accessorKey: 'education_level_code', header: 'Code' },
    { accessorKey: 'education_stages', header: 'Education Stage' },
    { accessorKey: 'education_stages_name_id', header: 'Name' },
    { accessorKey: 'education_stages_name_en', header: 'Name(ENG)' },
    { accessorKey: 'education_stages_sequence', header: 'Sequence Education Stage' },
    {
        accessorKey: 'university_level',
        header: 'University Level',
        cell: ({ row }) => row.getValue('university_level') === '1' ? 'Iya' : 'Tidak',  // Custom display
    },
    {
        accessorKey: 'postgraduate',
        header: 'Post Graduate',
        cell: ({ row }) => row.getValue('postgraduate') ? 'Iya' : 'Tidak',  // Custom display
    },
    {
        accessorKey: 'rpl_stages',
        header: 'RPL Stages',
        cell: ({ row }) => row.getValue('rpl_stages') ? 'Iya' : 'Tidak',  // Custom display
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
]