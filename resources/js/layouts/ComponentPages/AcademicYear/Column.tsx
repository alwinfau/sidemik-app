import { Checkbox } from '@/components/ui/checkbox'; // import komponen checkbox jika kamu punya
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type AcademicYearType = {
    id?: number;
    academic_year: string;
    name: string;
    start_date: string;
    end_date: string;
    description: string;
};

export const columns = (
  onEdit: (row: AcademicYearType) => void,
  onDelete: (id: string) => void,
  selectedIds: number[],
  toggleSelect: (id: number) => void,
  toggleSelectAll: (checked: boolean) => void,
  allSelected: boolean,
): ColumnDef<AcademicYearType>[] => [
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
    { accessorKey: 'academic_year', header: 'Tahun Akademik' },
    { accessorKey: 'name', header: 'Nama' },
    { accessorKey: 'start_date', header: 'Sejak' },
    { accessorKey: 'end_date', header: 'Hingga' },
    { accessorKey: 'description', header: 'Keterangan' },
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
