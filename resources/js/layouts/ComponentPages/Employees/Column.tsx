import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type EmployeesType = {
    id?: number;
    emp_nip: string;
    emp_full_name: string;
    emp_front_title: string;
    emp_back_title: string;
    emp_gender: string;
    emp_religion: string;
    emp_birth_place: string;
    emp_birth_date: string;
    emp_married_status: string;
    study_programs_id: number;
    active_statuses_id: number;
    employments_relationships_id: number;
    academic_positions_id: number;
    emp_institution_origin: string;
    emp_areas_expertise: string;
    emp_collage_email: string;
    finger_account_number: string;
    sinta_id: string;
    orchid_id: string;
    scopus_id: string;
    nidn: string;
    nuptk: string;
    nitk: string;
    nidk: string;
    nupn: string;
    nbm: string;
    lecturer_certification_date: string;
    lecturer_certification_number: string;
};

export const columns = (onEdit: (row: EmployeesType) => void, onDelete: (id: string) => void): ColumnDef<EmployeesType>[] => [

    { accessorKey: 'emp_nip', header: 'NIP' },
    { accessorKey: 'emp_full_name', header: 'Full Name' },
    { accessorKey: 'emp_front_title', header: 'Front Title' },
    { accessorKey: 'emp_back_title', header: 'Back Title' },
    { accessorKey: 'emp_gender', header: 'Gender' },
    { accessorKey: 'emp_religion', header: 'Religion' },
    { accessorKey: 'emp_birth_place', header: 'Birth Place' },
    { accessorKey: 'emp_birth_date', header: 'Birth Date' },
    { accessorKey: 'emp_married_status', header: 'Married Status' },
    { accessorKey: 'study_programs_id', header: 'Study Program' },
    { accessorKey: 'active_statuses_id', header: 'Active Status' },
    { accessorKey: 'employments_relationships_id', header: 'Employment Relationship' },
    { accessorKey: 'academic_positions_id', header: 'Academic Position' },
    { accessorKey: 'emp_institution_origin', header: 'Institution Origin' },
    { accessorKey: 'emp_areas_expertise', header: 'Areas of Expertise' },
    { accessorKey: 'emp_collage_email', header: 'Collage Email' },
    { accessorKey: 'finger_account_number', header: 'Finger Account Number' },
    { accessorKey: 'sinta_id', header: 'Sinta ID' },
    { accessorKey: 'orchid_id', header: 'Orchid ID' },
    { accessorKey: 'scopus_id', header: 'Scopus ID' },
    { accessorKey: 'nidn', header: 'NIDN' },
    { accessorKey: 'nuptk', header: 'NUPTK' },
    { accessorKey: 'nitk', header: 'NITK' },
    { accessorKey: 'nidk', header: 'NIDK' },
    { accessorKey: 'nupn', header: 'NUPN' },
    { accessorKey: 'nbm', header: 'NBM' },
    { accessorKey: 'lecturer_certification_date', header: 'Lecturer Certification Date' },
    { accessorKey: 'lecturer_certification_number', header: 'Lecturer Certification Number' },
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
