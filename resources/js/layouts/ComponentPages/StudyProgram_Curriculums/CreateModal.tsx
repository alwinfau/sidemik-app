import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";
import { useAxios } from "@/hooks/useAxios";

type Curriculum_ProdiProps = {
    id:string,
    curriculum_year_id: number,
    course_id: number,
    code: string,
    level_semester: string,
    min_scores:string,
    requaired_courses: 'true' | 'false',
    course_package: 'true' | 'false',
    study_program_desc: string
};

type Curriculum_ProdiProps = {
    FormData: Omit<Curriculum_ProdiProps, 'id'>;
    setFormData: (data: Omit<Curriculum_ProdiProps, 'id'>) => void;
}

const labelMapping: Record<string, string> = {
    curriculum_year_id: 'Curriculum Year ID',
    course_id: 'Course ID',
    code: 'Code',
    level_semester: 'Level Semester',
    min_scores: 'Min Scores',
    requaired_courses: 'Requaired Courses',
    course_package: 'Course Package',
    study_program_desc: 'Study Program Description',
};

type CreateModalProps = {
    onCreate: (data: Omit<Curriculum_ProdiProps, 'id'>) => void
};

const CreateModal = ({ onCreate }: CreateModalProps) => {
    const { post, get } = useAxios();
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<Partial<Record<keyof Omit<Curriculum_ProdiProps, 'id'>, string>>>({});
    const [FormData, setFormData] = useState<Omit<Curriculum_ProdiProps, 'id'>>({
        curriculum_year_id: null,
        course_id: null,
        code: '',
        level_semester: '',
        min_scores:'',
        requaired_courses: 'true',
        course_package: 'true',
        study_program_desc: ''
    });

    const [curriculum_years, setCurriculumYears] = useState<Curriculum_ProdiProps[]>([]);
}