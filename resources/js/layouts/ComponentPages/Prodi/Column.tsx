import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type Proditype = {
    id?: number;
    sp_code: string;
    idn_sp_name: string;
    eng_sp_name: string;
    sp_short_name: string;
    sp_address: string;
    sp_phone: string;
    sp_email_address: string;
    sp_web_address: string;
    sp_description: string;
    sp_vision: string;
    sp_mission: string;
    sp_competencies: string;
    program_learning_outcomes: string;
    max_semester: number;
    faculty: {
        name: string;
    };
    academic_period: {
        name: string;
    };
    final_project_type: {
        name: string;
    };
    status: boolean;
};

export const columns = (onEdit: (row: Proditype) => void, onDelete: (id: string) => void): ColumnDef<Proditype>[] => [
    {
        id: 'rowNumber',
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    { accessorKey: 'sp_code', header: 'Code ' },
    { header: 'Fakultas', accessorFn: (row) => row.faculty?.name ?? null, id: 'faculty' },
    // { header: 'Periode Akademik', accessorFn: (row) => row.academic_period?.name ?? null, id: 'academic_period' },
    // {
    //     accessorKey: 'combined_name',
    //     header: 'Nama Prodi (Singkatan)',
    //     cell: ({ row }) => `${row.original.idn_sp_name} (${row.original.sp_short_name})`,
    // },
    
    { accessorKey: 'idn_sp_name', header: 'Nama Prodi' },
    { accessorKey: 'sp_short_name', header: 'Singkatan' },
    // { accessorKey: 'eng_sp_name', header: 'Nama(ENG)' },
    // { accessorKey: 'sp_address', header: 'Address' },
    // { accessorKey: 'sp_phone', header: 'Telephone' },
    // { accessorKey: 'sp_email_address', header: 'Email' },
    // { accessorKey: 'sp_web_address', header: 'Website' },
    // {
    //     accessorKey: 'sp_description',
    //     header: 'Description',
    // },
    // {
    //     accessorKey: 'sp_vision',
    //     header: 'Vision',
    // },
    // {
    //     accessorKey: 'sp_mission',
    //     header: 'Mission',
    // },
    // {
    //     accessorKey: 'sp_competencies',
    //     header: 'Competencies',
    // },
    // {
    //     accessorKey: 'program_learning_outcomes',
    //     header: 'Learning Outcomes',
    // },
    { accessorKey: 'max_semester', header: 'Max Semester' },
    

    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => <div className="text-center">{getValue<boolean>() ? 'Aktif' : 'Tidak Aktif'}</div>,
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
