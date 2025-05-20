import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type CurriculumType = {
    id?: number;
    code: string;
    curriculum_year: string;
    sks_required: string;
    sks_elective: string;
    // description: string
    study_program: {
        idn_sp_name: string;
    };
};
export const columns = (
    onEdit: (row: CurriculumType) => void,
    onDelete: (id: string) => void,
    selectedIds: number[],
    toggleSelect: (id: number) => void,
    toggleSelectAll: (checked: boolean) => void,
    allSelected: boolean,
): ColumnDef<CurriculumType>[] => [
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
    {
        header: 'Prodi',
        accessorFn: (row) => row.study_program?.idn_sp_name ?? null,
        id: 'study_program',
    },
    { accessorKey: 'code', header: 'Code' },
    { accessorKey: 'curriculum_year', header: 'Tahun Kurikulum' },
    { accessorKey: 'sks_required', header: 'SKS Wajib' },
    { accessorKey: 'sks_elective', header: 'SKS Pilihan' },
    // { accessorKey:'description', header: 'Keterangan'},
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
