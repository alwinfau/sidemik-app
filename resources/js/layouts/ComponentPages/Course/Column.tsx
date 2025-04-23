import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type CourseType = {
    id?: number;
    code: string;
    name_idn: string;
    name_eng:string;
    course_desc: string;
    theory_sks: number;
    practice_sks: number;
    simulation_sks: number;
    sks_total: number
    general_courses: boolean;
    sap_ada: boolean;
    syllabus_ada: boolean;
    course_materials_ada:boolean;
    diktat_ada: boolean;
    course_type: {
        name: string
    }
    course_group: {
        name: string
    }
}
export const columns = (onEdit: (row: CourseType) => void, onDelete: (id: string) => void): ColumnDef<CourseType>[] => [
    { id: 'rowNumber', header: 'No', cell: ({ row }) => <div className="text-center">{row.index + 1}</div> },
    { accessorKey: 'code', header: 'Code' },
    { accessorKey: 'name_idn', header: 'Name (ID)' },
    { accessorKey: 'name_eng', header: 'Name (ENG)' },
    { accessorKey: 'course_desc', header: 'Course Desc' },
    { accessorKey: 'practice_sks', header: 'SKS Pracetice' },
    { accessorKey: 'simulation_sks', header: 'SKS Simaulation' },
    { accessorKey: 'sks_total', header: 'SKS Total' },
    {
        id: 'general_courses',
        header: 'General Course',
        cell: ({ row }) => <div>{row.original.general_courses ? 'Iya' : 'Tidak'}</div>
    },
    {
    id: 'sap_ada',
    header: 'Sap',
    cell: ({ row }) => <div>{row.original.sap_ada ? 'Iya' : 'Tidak'}</div>
    },
    {
    id: 'syllabus_ada',
    header: 'Syllabus',
    cell: ({ row }) => <div>{row.original.syllabus_ada ? 'Iya' : 'Tidak'}</div>
    },
    {
    id: 'course_materials_ada',
    header: 'Course Material',
    cell: ({ row }) => <div>{row.original.course_materials_ada ? 'Iya' : 'Tidak'}</div>
    },
    {
    id: 'diktat_ada',
    header: 'Diktat',
    cell: ({ row }) => <div>{row.original.diktat_ada ? 'Iya' : 'Tidak'}</div>
    },
    
    { 
        header: 'Type Course',
        accessorFn: (row) => row.course_type?.name?? null,
        id: 'course_types'
    },
    { 
        header: 'Course Group',
        accessorFn: (row) => row.course_group?.name?? null,
        id: 'course_group'
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
export default columns