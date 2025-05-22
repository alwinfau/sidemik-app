import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type PeriodeAcademicType = {
    id?: number;
    academic_year: {
        name: string;
    };
    semester: string;
    name: string;
    short_name: string;
    start_date: string;
    end_date: string;
    start_midterm_exam: string;
    end_midterm_exam: string;
    start_final_exam: string;
    end_final_exam: string;
    number_of_meetings: number;
    min_presence: number;
    is_active: boolean;
    descritpion: string;
};

export const columns = (
    onEdit: (row: PeriodeAcademicType) => void,
    onDelete: (id: string) => void,
    selectedIds: number[],
    toggleSelect: (id: number) => void,
    toggleSelectAll: (checked: boolean) => void,
    allSelected: boolean,
): ColumnDef<PeriodeAcademicType>[] => [
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
        header: 'Tahun Ajaran',
        accessorFn: (row) => row.academic_year?.name ?? null,
        id: 'academic_year',
    },
    { accessorKey: 'semester', header: 'Semester' },
    { accessorKey: 'name', header: () => <div className="w-30">Nama</div>, cell: ({ row }) => <div className="w-22">{row.getValue('name')}</div> },
    {
        accessorKey: 'start_date',
            header: () => <div className="w-10">Mulai</div>, 
            cell: ({ row }) => <div className="w-20 truncate">{row.getValue('start_date')}</div> 
    },
    {
        accessorKey: 'start_midterm_exam',
        header: () => <div className="w-20">Tanggal Mulai UTS</div>, 
        cell: ({ row }) => <div className="w-20 truncate">{row.getValue('start_midterm_exam')}</div> 
    },
    {
        accessorKey: 'end_midterm_exam',
        header: () => <div className="w-10">Tanggal Selesai UTS</div>, 
        cell: ({ row }) => <div className="w-20 truncate">{row.getValue('end_midterm_exam')}</div> 
    },
    {
        accessorKey: 'start_final_exam',
        header: () => <div className="w-10">Tanggal Mulai UAS</div>, 
        cell: ({ row }) => <div className="w-2- truncate">{row.getValue('start_final_exam')}</div> 
    },
    {
        accessorKey: 'end_final_exam',
        header: () => <div className="w-10">Tanggal Selsei UAS</div>, 
        cell: ({ row }) => <div className="w-20 truncate">{row.getValue('end_final_exam')}</div> 
    },
    {
        accessorKey: 'end_date',
        header: () => <div className="w-10">Berakhir</div>, 
        cell: ({ row }) => <div className="w-20 truncate">{row.getValue('end_date')}</div> 
    },
    {
        accessorKey: 'number_of_meetings',
        header: 'Jumlah Pertemuan',
        cell: ({ getValue }) => getValue<number>() ?? '-',
    },
    {
        accessorKey: 'min_presence',
        header: 'Jumlah Min Presensi',
        cell: ({ getValue }) => getValue<number>() ?? '-',
    },
    {
        accessorKey: 'is_active',
        header: 'Status',
        cell: ({ getValue }) => <div className={`font-semibold ${ getValue<boolean>() ? 'text-green-600' : 'text-red-600' }`}>
        {getValue<boolean>() ? 'Aktif' : 'Tidak Aktif'}
    </div>  ,
    },
    {
        accessorKey: 'description',
        header: 'Deskripsi',
        cell: ({ getValue }) => getValue<string>() ?? '-',
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
