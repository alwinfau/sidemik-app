import { Button } from '@/components/ui/button';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectItem } from '@/components/ui/select';

import { useAxios } from '@/hooks/useAxios';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};

const schema = z.object({
    code: z.string({ message: 'Code wajib diisi' }).min(3, 'Code harus lebih dari 3 karakter'),
    level_semester: z.string({ message: 'Level Semester wajib diisi' }).min(1, 'Level Semester harus lebih dari 1'),
    min_scores: z.number({ message: 'Minimal Score wajib diisi' }).refine((val) => !isNaN(val), 'Minimal skor tidak valid'),
    required_courses: z.boolean({ message: 'required wajib diisi' }),
    course_package: z.boolean({ message: 'Course wajib diisi' }),
    study_program_desc: z.string().min(5, 'Deskripsi harus lebih dari 5 karakter'),
    curriculum_years_id: z.string().min(1, 'Curriculum Year wajib dipilih'),
    courses_id: z.string().min(1, 'Course wajib dipilih'),
});

type FormInputs = z.infer<typeof schema>;

const ModalForm = ({ open, onOpenChange, submit, defaultValues }: ModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        control,
        formState: { errors, isSubmitting },
    } = useForm<FormInputs>({
        resolver: zodResolver(schema),
    });

    const { get } = useAxios();
    const [curriculumYears, setCurriculumYears] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);

    const fetchData = async () => {
        try {
            const resYears: any = await get('/curriculum-year');
            setCurriculumYears(resYears.data.data);

            const resCourses: any = await get('/course');
            setCourses(resCourses.data.data);
        } catch (err) {
            console.error('Error fetching:', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log('defaultValues:', defaultValues);

        if (defaultValues) {
            reset({
                code: defaultValues.code || '',
                level_semester: defaultValues.level_semester || '',
                min_scores: Number(defaultValues.min_scores) || 0,
                required_courses: Boolean(defaultValues.required_courses) || false,
                course_package: Boolean(defaultValues.course_package) || false,
                study_program_desc: defaultValues.study_program_desc || '',
                curriculum_years_id: String(defaultValues.curriculum_years_id) || '',
                courses_id: String(defaultValues.courses_id) || '',
            });
        } else {
            reset({
                code: '',
                level_semester: '',
                min_scores: 0,
                required_courses: false,
                course_package: false,
                study_program_desc: '',
                curriculum_years_id: '',
                courses_id: '',
            });
        }
    }, [defaultValues, reset]);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        console.log('Data yang dikirim:', data);
        try {
            const result = await submit(data, defaultValues?.id);
            if (result != null && !isSubmitting && !defaultValues) {
                reset();
            }
        } catch (error: any) {
            setError('root', {
                type: 'manual',
                message: error?.response?.data?.meta?.message || 'Something went wrong',
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-hidden p-6">
                <DialogHeader>
                    <DialogTitle>{defaultValues ? 'Edit Curriculum Prodi' : 'Add Curriculum Prodi'}</DialogTitle>
                </DialogHeader>
                <DialogDescription>Silakan isi data Curriculum Prodi dengan lengkap dan valid.</DialogDescription>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mx-3 space-y-4">
                            <FormTextInput id="code" label="Code" type="text" {...register('code')} error={errors.code?.message} />
                            <FormTextInput
                                id="level_semester"
                                label="Level Semester"
                                type="text"
                                {...register('level_semester')}
                                error={errors.level_semester?.message}
                            />
                            <FormTextInput
                                id="min_scores"
                                label="Minimum Score"
                                type="number"
                                {...register('min_scores', { valueAsNumber: true })}
                                error={errors.min_scores?.message}
                            />

                            <Controller
                                name="required_courses"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="required_courses"
                                        label="Required Courses"
                                        value={field.value ? 'true' : 'false'}
                                        onValueChange={(value) => field.onChange(value === 'true')}
                                        error={errors.required_courses?.message}
                                    >
                                        <SelectItem value="true">Yes</SelectItem>
                                        <SelectItem value="false">No</SelectItem>
                                    </FormSelectInput>
                                )}
                            />

                            <Controller
                                name="course_package"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="course_package"
                                        label="Course Package"
                                        value={field.value ? 'true' : 'false'}
                                        onValueChange={(value) => field.onChange(value === 'true')}
                                        error={errors.course_package?.message}
                                    >
                                        <SelectItem value="true">Yes</SelectItem>
                                        <SelectItem value="false">No</SelectItem>
                                    </FormSelectInput>
                                )}
                            />
                            <Controller
                                name="curriculum_years_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="curriculum_years_id"
                                        label="Curriculum Year"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.curriculum_years_id?.message}
                                    >
                                        {curriculumYears.map((item: any) => (
                                            <SelectItem key={item.id} value={String(item.id)}>
                                                {item.curriculum_years_name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />

                            <Controller
                                name="courses_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="courses_id"
                                        label="Course"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.courses_id?.message}
                                    >
                                        {courses.map((item: any) => (
                                            <SelectItem key={item.id} value={String(item.id)}>
                                                {item.name_idn}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />

                            <FormTextInput
                                id="study_program_desc"
                                label="Study Program Description"
                                type="textarea"
                                {...register('study_program_desc')}
                                error={errors.study_program_desc?.message}
                            />

                            {errors.root && <p className="text-red-600">{errors.root.message}</p>}

                            <Button
                                type="submit"
                                className={`mb-5 rounded px-4 py-2 font-bold text-white ${defaultValues ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-500 hover:bg-green-600'}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : defaultValues ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default ModalForm;
