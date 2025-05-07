import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type EmployeesType = {
    id?: number;
    nip: string;
    name: string;
    foto: null;
    front_title: number;
    back_title: string;
    gender: boolean;
    religion: string;
    birth_place: string;
    birth_date: Date;
    email_pt: string;
    phone: string;
    emergency_phone: string;
    relationship_1: string;
    emergency_phone_2: null;
    relationship_2: string;
    status: boolean;
    type: string;
    staff_status: {
        name: string;
    };
    study_programs: {
        name: string;
    };
    nidn: null;
    nuptk: null;
    nitk: null;
    nidk: null;
    functional_positons: {
        name: string;
    };
    pns_rank: string;
    struktural_positions: {
        name: string;
    };
    staff_division: {
        name: string;
    };
    lecture_status: {
        name: string;
    };
};

export const columns = (onEdit: (row: EmployeesType) => void, onDelete: (id: string) => void): ColumnDef<EmployeesType>[] => [
    {
        id: 'rowNumber',
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    { accessorKey: 'nip', header: 'NIP' },
    { accessorKey: 'name', header: 'Nama' },
    { accessorKey: 'foto', header: 'Foto' },
    { accessorKey: 'front_title', header: 'Nama Depan' },
    { accessorKey: 'back_title', header: 'Nama Belakang' },
    { accessorKey: 'gender', header: 'Jenis Kelamin' },
    { accessorKey: 'religion', header: 'Agama' },
    { accessorKey: 'birth_place', header: 'Tempat Lahir' },
    { accessorKey: 'birth_date', header: 'Tanggal Lahir' },
    { accessorKey: 'email_pt', header: 'Email PT' },
    { accessorKey: 'phone', header: 'Handphone' },
    { accessorKey: 'emergency_phone', header: 'Handphone Darurat' },
    { accessorKey: 'relationship_1', header: 'Hubungan 1' },
    { accessorKey: 'emergency_phone_2', header: 'Handphone Darurat 2' },
    { accessorKey: 'relationship_2', header: 'Hubungan 2' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'type', header: 'Jenis' },
    { accessorKey: 'pns_rank', header: 'PNS Rank' },
    { accessorKey: 'nidn', header: 'NIDN' },
    { accessorKey: 'nuptk', header: 'NUPTK' },
    { accessorKey: 'nitk', header: 'NITK' },
    { accessorKey: 'nidk', header: 'NIDK' },
    {
        header: 'Status Dosen',
        accessorFn: (row) => row.lecture_status?.name ?? null,
        id: 'lecture_status',
    },
    {
        header: 'Status Tendik',
        accessorFn: (row) => row.staff_status?.name ?? null,
        id: 'staff_status',
    },
    {
        header: 'Divisi Tendik',
        accessorFn: (row) => row.staff_division?.name ?? null,
        id: 'staff_division',
    },
    {
        header: 'Jabatan Struktural ',
        accessorFn: (row) => row.struktural_positions?.name ?? null,
        id: 'struktural_positions',
    },
    {
        header: 'Jabatan Functional',
        accessorFn: (row) => row.functional_positons?.name ?? null,
        id: 'functional_positons',
    },
    {
        header: 'Program Studi',
        accessorFn: (row) => row.study_programs?.name ?? null,
        id: 'study_programs',
    },
    {
        id: 'actions',
        header: 'Aksi',
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
