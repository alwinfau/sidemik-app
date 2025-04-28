import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type Proditype = {
    id?: number;
    idn_sp_name: string;
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
    sp_description: Text;
    sp_vision: Text;
    sp_mission: Text;
    sp_competencies: Text;
    program_learning_outcomes: string;
    faculty_id: number;
    academic_periods_id: number;
    final_project_types_id: number;
    study_program_accreditations_id: number;
    univ_education_levels_id: number;
};

export const columns = (
    onEdit: (row: Proditype) => void,
    onDelete: (id: string) => void
    ): ColumnDef<Proditype>[] => [
    {
        id: 'rowNumber',
        header: () => <div className="text-center">No</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    { accessorKey: 'idn_sp_name', header: 'Program Name (IDN)' },
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
        cell: ({ row }) => (
        <div className="line-clamp-2 max-w-[200px] text-sm text-muted-foreground">
            {row.original.sp_description.toString()}
        </div>
        ),
    },
    {
        accessorKey: 'sp_vision',
        header: 'Vision',
        cell: ({ row }) => (
        <div className="line-clamp-2 max-w-[200px] text-sm text-muted-foreground">
            {row.original.sp_vision.toString()}
        </div>
        ),
    },
    {
        accessorKey: 'sp_mission',
        header: 'Mission',
        cell: ({ row }) => (
        <div className="line-clamp-2 max-w-[200px] text-sm text-muted-foreground">
            {row.original.sp_mission.toString()}
        </div>
        ),
    },
    {
        accessorKey: 'sp_competencies',
        header: 'Competencies',
        cell: ({ row }) => (
        <div className="line-clamp-2 max-w-[200px] text-sm text-muted-foreground">
            {row.original.sp_competencies.toString()}
        </div>
        ),
    },
    {
        accessorKey: 'program_learning_outcomes',
        header: 'Learning Outcomes',
        cell: ({ row }) => (
        <div className="line-clamp-2 max-w-[200px] text-sm text-muted-foreground">
            {row.original.program_learning_outcomes}
        </div>
        ),
    },
    { accessorKey: 'faculty_id', header: 'Faculty ID' },
    { accessorKey: 'academic_periods_id', header: 'Academic Period ID' },
    { accessorKey: 'final_project_types_id', header: 'Final Project Type ID' },
    { accessorKey: 'study_program_accreditations_id', header: 'Accreditation ID' },
    { accessorKey: 'univ_education_levels_id', header: 'Education Level ID' },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
        <div className="flex gap-2">
            <Button
            className="bg-blue-700 hover:bg-blue-600"
            size="sm"
            onClick={() => onEdit(row.original)}
            >
            <Pencil/>
            </Button>
            <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(row.original.id!.toString())}
            >
            <Trash2 />
            </Button>
        </div>
        ),
    },
];
