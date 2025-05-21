import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type CourseType = {
    id?: number;
    code: string;
    semester: string;
    name_idn: string;
    name_eng: string;
    theory_sks: number;
    practical_sks: number;
    fieldwork_sks: number;
    course_desc: string;
    prereq_courses_1: string;
    prereq_courses_2: string;
    course_type: {
        name: string;
    };
    course_group: {
        name: string;
    };
    curriculumns: {
        curriculum_year: string;
    };
    elective_course_group: {
        name: string;
    };
};
export const columns = (onEdit: (row: CourseType) => void, onDelete: (id: string) => void): ColumnDef<CourseType>[] => [
    { id: 'rowNumber', header: 'No', cell: ({ row }) => <div className="text-center">{row.index + 1}</div> },
    {
        header: 'Kurikulum',
        accessorFn: (row) => row.curriculumns.curriculum_year,
        id: 'curriculum',
    },
    { accessorKey: 'code', header: () => <div className="w-10">Kode</div>, 
        cell: ({ row }) => <div className="w-20 truncate">{row.getValue('code')}</div>  },
    { accessorKey: 'semester', header: 'Semester' },
    { accessorKey: 'name_idn', header: 'Nama Matakuliah' },
    { accessorKey: 'name_eng', header: 'Course' },
    { accessorKey: 'theory_sks', header: 'Teori SKS' },
    { accessorKey: 'practical_sks', header: 'SKS Praktek' },
    { accessorKey: 'fieldwork_sks', header: 'SKS Lapangan' },
    // { accessorKey: 'course_desc', header: 'Course Desc' },
    // { accessorKey: 'prereq_courses_1', header: 'SKS Total' },
    // { accessorKey: 'prereq_courses_2', header: 'SKS Total' },

    {
        header: 'Jenis Mata Kuliah',
        accessorFn: (row) => row.course_type?.name ?? null,
        id: 'course_types',
    },
    {
        header: 'Kelompok Mata Kuliah',
        accessorFn: (row) => row.course_group?.name ?? null,
        id: 'course_group',
    },

    {
        header: 'Mata Kuliah Pilihan',
        accessorFn: (row) => row.elective_course_group?.name ?? null,
        id: 'elective_course_group',
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
export default columns;
