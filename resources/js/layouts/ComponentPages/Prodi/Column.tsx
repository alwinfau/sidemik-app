import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type Proditype = {
    id?: number;
    sp_code: string
    idn_sp_name: string;
    eng_sp_name: string;
    idn_short_name: string;
    eng_short_name: string;
    min_credits_pass: number;
    min_pass_gpa: number;
    final_project_req: boolean;
    ukom_req: boolean;
    max_lecturer_advisors: number;
    max_examiner_lecturers: number;
    sp_address: string;
    sp_phone: string;
    sp_email_address: string;
    sp_web_address: string;
    sp_description: string;
    sp_vision: string;
    sp_mission: string;
    sp_competencies: string;
    program_learning_outcomes: string;
    faculty: {
        name: string;
    };
    academic_period: {
        name: string;
    };
    final_project_type: {
        name: string;
    };
    study_program_accreditations: {
        accreditation_score: string;
    };
    univ_education_level: {
        edu_study_period: string;
    };
};

export const columns = (onEdit: (row: Proditype) => void, onDelete: (id: string) => void): ColumnDef<Proditype>[] => [
    {
        id: 'rowNumber',
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    { accessorKey: 'sp_code', header: 'Code ' },
    { accessorKey: 'idn_sp_name', header: 'Program Name (IDN)' },
    { accessorKey: 'eng_sp_name', header: 'Program Name (ENG)' },
    { accessorKey: 'idn_short_name', header: 'Short Name (IDN)' },
    { accessorKey: 'eng_short_name', header: 'Short Name (ENG)' },
    { accessorKey: 'min_credits_pass', header: 'Min Credits to Pass' },
    { accessorKey: 'min_pass_gpa', header: 'Min GPA to Pass' },
    {
        accessorKey: 'final_project_req',
        header: 'Final Project Required',
        cell: ({ row }) => <span>{row.original.final_project_req ? 'Yes' : 'No'}</span>,
    },
    {
        accessorKey: 'ukom_req',
        header: 'Ukom Required',
        cell: ({ row }) => <span>{row.original.ukom_req ? 'Yes' : 'No'}</span>,
    },
    { accessorKey: 'max_lecturer_advisors', header: 'Max Lecturer Advisors' },
    { accessorKey: 'max_examiner_lecturers', header: 'Max Examiner Lecturers' },
    { accessorKey: 'sp_address', header: 'Address' },
    { accessorKey: 'sp_phone', header: 'Phone' },
    { accessorKey: 'sp_email_address', header: 'Email' },
    { accessorKey: 'sp_web_address', header: 'Website' },
    {
        accessorKey: 'sp_description',
        header: 'Description',
        cell: ({ row }) => <div className="text-muted-foreground line-clamp-2 max-w-[200px] text-sm">{row.original.sp_description.toString()}</div>,
    },
    {
        accessorKey: 'sp_vision',
        header: 'Vision',
        cell: ({ row }) => <div className="text-muted-foreground line-clamp-2 max-w-[200px] text-sm">{row.original.sp_vision.toString()}</div>,
    },
    {
        accessorKey: 'sp_mission',
        header: 'Mission',
        cell: ({ row }) => <div className="text-muted-foreground line-clamp-2 max-w-[200px] text-sm">{row.original.sp_mission.toString()}</div>,
    },
    {
        accessorKey: 'sp_competencies',
        header: 'Competencies',
        cell: ({ row }) => <div className="text-muted-foreground line-clamp-2 max-w-[200px] text-sm">{row.original.sp_competencies.toString()}</div>,
    },
    {
        accessorKey: 'program_learning_outcomes',
        header: 'Learning Outcomes',
        cell: ({ row }) => <div className="text-muted-foreground line-clamp-2 max-w-[200px] text-sm">{row.original.program_learning_outcomes}</div>,
    },
    { header: 'Fakultas',
        accessorFn: (row) => row.faculty?.name ?? null,
        id: 'faculty',
    },
    { header: 'Academic Period',
        accessorFn: (row) => row.academic_period?.name ?? null,
        id: 'academic_period',
    },
    { header: 'Final Project',
        accessorFn: (row) => row.final_project_type?.name ?? null,
        id: 'final_project',
    },
    { header: 'Akreditasi Prodi',
        accessorFn: (row) => row.study_program_accreditations?.accreditation_score ?? null,
        id: 'study_program_accreditation',
    },
    { header: 'Tingkat Pendidikan Univ',
        accessorFn: (row) => row.univ_education_level?.edu_study_period ?? null,
        id: 'univ_education_levels',
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
