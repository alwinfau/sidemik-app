import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type Curiculumtype = {
    id?: number;
    code: string;
    level_semester: string;
    min_scores: number;
    required_courses: boolean;
    course_package: boolean;
    study_program_desc: string;
    curriculum_years_id: {
        curriculum_years_name: string;
    };
    courses_id: {
        name_idn: string;
    };
};

export const columns = (onEdit: (row: Curiculumtype) => void, onDelete: (id: string) => void): ColumnDef<Curiculumtype>[] => [
    {
        id: 'rowNumber',
        header: 'No',
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    {
        accessorKey: 'code',
        header: 'Code',
    },
    {
        accessorKey: 'level_semester',
        header: 'Level / Semester',
    },
    {
        accessorKey: 'min_scores',
        header: 'Minimum Score',
    },
    {
        accessorKey: 'required_courses',
        header: 'Required?',
        cell: ({ row }) => <div className="text-center">{row.original.required_courses ? 'Yes' : 'No'}</div>,
    },
    {
        accessorKey: 'course_package',
        header: 'Course Package?',
        cell: ({ row }) => <div className="text-center">{row.original.course_package ? 'Yes' : 'No'}</div>,
    },
    {
        accessorKey: 'study_program_desc',
        header: 'Study Program Description',
        cell: ({ row }) => <div>{String(row.original.study_program_desc)}</div>,
    },
    {
        accessorKey: 'curriculum_years_id',
        header: 'Curriculum Year',
        cell: ({ row }) => <div>{row.original.curriculum_years_id?.curriculum_years_name}</div>,
    },
    {
        accessorKey: 'courses_id',
        header: 'Course Name (IDN)',
        cell: ({ row }) => <div>{row.original.courses_id?.name_idn}</div>,
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => onEdit(row.original)}>
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => onDelete(String(row.original.id))}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        ),
    },
];
