import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type StudentType = {
    id?: number;
    nim: string;
    fullname: string;
    midname: string;
    lastname: string;
    idcard: string;
    place_of_bird: string;
    date_of_bird: string;
    gender: 'L' | 'P' | null;
    addres_card: string;
    current_addres: string;
    country: string;
    province_id: string | number;
    regency_id: string | number;
    district_id: string | number;
    village_id: string | number;
    postal_code: string;
    religion: string;
    phone: string;
    email: string;
    hobby: string;
    student_path: string;
    status: boolean | null;
    img_path: string;

}

export const columns = (onEdit: (row: StudentType) => void, onDelete: (id: string) => void): ColumnDef<StudentType>[] => [
    {
        id: 'rowNumber',
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    { accessorKey: 'nim', header: 'Nim' },
    { accessorKey: 'fullname', header: 'Full Name' },
    { accessorKey: 'midname', header: 'Mid Name' },
    { accessorKey: 'lastname', header: 'Last Name' },
    { accessorKey: 'idcard', header: 'ID Card' },
    { accessorKey: 'place_of_bird', header: 'POB(Place Of Bird)' },
    { accessorKey: 'date_of_bird', header: 'DOB(Date of Bird)' },
    { accessorKey: 'gender', header: 'Gender' },
    { accessorKey: 'addres_card', header: 'Address Card' },
    { accessorKey: 'current_addres', header: 'Current Addres' },
    { accessorKey: 'country', header: 'Country' },
    { accessorKey: 'province_id', header: 'province' },
    { accessorKey: 'regency_id', header: 'Regency' },
    { accessorKey: 'district_id', header: 'District' },
    { accessorKey: 'village_id', header: 'Village' },
    { accessorKey: 'postal_code', header: 'Code Post' },
    { accessorKey: 'religion', header: 'Religion' },
    { accessorKey: 'phone', header: 'Phone' },
    { accessorKey: 'email', header: 'email' },
    { accessorKey: 'hobby', header: 'Hobby' },
    { accessorKey: 'student_path', header: 'Student Path' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'img_path', header: 'Image' },

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
