import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type PeriodeAcademicType = {
    id?: number;
    
    academic_year: {
        academic_year: string;
    };
    semester: string;
    name: string;
    short_name: string;
    start_date: Date;
    end_date: Date;
    start_midterm_exam: Date;
    end_midterm_exam: Date;
    start_final_exam: Date;
    end_final_exam: Date;
    number_of_meetings: number;
    min_presence: number;
    is_active: boolean;
    descritpion: Text;
};

export const columns = (onEdit: (row: PeriodeAcademicType) => void, onDelete: (id: string) => void): ColumnDef<PeriodeAcademicType>[] => [
    {
        id: 'rowNumber',
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    {
        header: 'Tahun Ajaran',
        accessorFn: (row) => row.academic_year?.academic_year ?? null,
        id: 'academic_year',
    },
    { accessorKey: 'semester', header: 'Semester' },
    { accessorKey: 'name', header: 'Nama' },
    { accessorKey: 'short_name', header: 'Singkatan' },
    { accessorKey: 'start_date', header: 'Mulai' },
    { accessorKey: 'end_date', header: 'Hingga' },
    { accessorKey: 'start_midterm_exam', header: 'Tanggal Mulai UTS' },
    { accessorKey: 'end_midterm_exam', header: 'Tanggal Selesai UTS' },
    { accessorKey: 'start_final_exam', header: 'Tanggal Mulai UAS' },
    { accessorKey: 'end_final_exam', header: 'Tanggal Selesai UAS' },
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
        cell: ({ getValue }) => <div className="text-center">{getValue<boolean>() ? 'Aktif' : 'Tidak Aktif'}</div>,
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
