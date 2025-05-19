import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type EmployeesType = {
    id?: number;
    nip: string;
    name: string;
    foto: null;
    front_title: string;
    back_title: string;
    gender: string;
    religion: string;
    birth_place: string;
    birth_date: string;
    email_pt: string;
    phone: string;
    emergency_phone: string;
    relationship_1: string;
    emergency_phone_2: string;
    relationship_2: string;
    status: boolean;
    type: string;
    staff_status?: {
        name: string;
    };
    study_programs?: {
        name: string;
    };
    nidn: string;
    nuptk: string;
    nitk: string;
    nidk: string;
    functional_positons?: {
        name: string;
    };
    pns_rank: string;
    struktural_positions?: {
        name: string;
    };
    staff_division?: {
        name: string;
    };
    lecture_status?: {
        name: string;
    };
    lecture_status_id?: number;
    staff_status_id?: number;
    funtional_position_id?: number;
    struktural_position_id?: number;
    staff_divisions_id?: number;
    study_programs_id?: number;
};

export const columns = (onEdit: (row: EmployeesType) => void, onDelete: (id: string) => void): ColumnDef<EmployeesType>[] => [
    {
        id: 'rowNumber',
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    { accessorKey: 'nip', header: 'NIP' },
    { accessorKey: 'name', header: 'Nama' },
    {
        accessorKey: 'foto',
        header: () => <div className="w-28">Foto</div>,
        cell: ({ row }) => {
            const path = row.original.foto;
            return path ? (
                <img src={`http://127.0.0.1:8080${path}`} alt="Foto Pegawai" className="h-16 w-16 rounded object-cover" />
            ) : (
                <div className="text-center text-sm text-gray-400">Tidak ada foto</div>
            );
        },
    },
    { accessorKey: 'front_title', header: 'Gelar Depan', cell: ({ getValue }) => getValue() ?? '-' },
    { accessorKey: 'back_title', header: 'Gelar Belakang' },
    {
        accessorKey: 'gender',
        header: 'Jenis Kelamin',
        cell: ({ getValue }) => <div className="text-center">{getValue<boolean>() ? 'Laki-laki' : 'Perempuan'}</div>,
    },
    { accessorKey: 'religion', header: 'Agama' },
    { accessorKey: 'birth_place', header: 'Tempat Lahir' },
    { accessorKey: 'birth_date', header: 'Tanggal Lahir' },
    { accessorKey: 'email_pt', header: 'Email PT' },
    { accessorKey: 'phone', header: 'Handphone' },
    { accessorKey: 'emergency_phone', header: 'Handphone Darurat', cell: ({ getValue }) => getValue() ?? '-' },
    { accessorKey: 'relationship_1', header: 'Hubungan 1', cell: ({ getValue }) => getValue() ?? '-' },
    { accessorKey: 'emergency_phone_2', header: 'Handphone Darurat 2', cell: ({ getValue }) => getValue() ?? '-' },
    { accessorKey: 'relationship_2', header: 'Hubungan 2', cell: ({ getValue }) => getValue() ?? '-' },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => <div className="text-center">{getValue<boolean>() ? 'Aktif' : 'Tidak Aktif'}</div>,
    },
    { accessorKey: 'type', header: 'Jenis' },
    { accessorKey: 'pns_rank', header: 'Golongan', cell: ({ getValue }) => getValue() ?? '-' },
    { accessorKey: 'nidn', header: 'NIDN', cell: ({ getValue }) => getValue() ?? '-' },
    { accessorKey: 'nuptk', header: 'NUPTK' },
    { accessorKey: 'nitk', header: 'NITK', cell: ({ getValue }) => getValue() ?? '-' },
    { accessorKey: 'nidk', header: 'NIDK', cell: ({ getValue }) => getValue() ?? '-' },
    {
        header: 'Status Dosen',
        accessorFn: (row) => row.lecture_status?.name ?? null,
        id: 'lecture_status',
        cell: ({ getValue }) => getValue() ?? '-',
    },
    {
        header: 'Status Tendik',
        accessorFn: (row) => row.staff_status?.name ?? null,
        id: 'staff_status',
        cell: ({ getValue }) => getValue() ?? '-',
    },
    {
        header: 'Divisi Tendik',
        accessorFn: (row) => row.staff_division?.name ?? null,
        id: 'staff_division',
        cell: ({ getValue }) => getValue() ?? '-',
    },
    {
        header: 'Jabatan Struktural ',
        accessorFn: (row) => row.struktural_positions?.name ?? null,
        id: 'struktural_positions',
        cell: ({ getValue }) => getValue() ?? '-',
    },
    {
        header: 'Jabatan Functional',
        accessorFn: (row) => row.functional_positons?.name ?? null,
        id: 'functional_positons',
        cell: ({ getValue }) => getValue() ?? '-',
    },
    {
        header: 'Program Studi',
        accessorFn: (row) => row.study_programs?.name ?? null,
        id: 'study_programs',
        cell: ({ getValue }) => getValue() ?? '-',
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