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
import { useCourse } from './useCourse';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};

const schema = z.object({
    code: z.string().min(3, 'Code harus lebih dari 3 karakter'),
    name_idn: z.string().min(5, 'Nama harus lebih dari 5 karakter'),
    name_eng: z.string().min(5, 'Name harus lebih dari 5 karakter'),
    course_desc: z.string().min(5, 'Course Desc harus lebih dari 5 karakter'),
    theory_sks: z.coerce.number().positive('Nilai harus melebebihi angka 1'),
    practice_sks: z.coerce.number().positive('Nilai harus melebebihi angka 1'),
    simulation_sks: z.coerce.number().positive('Nilai harus melebebihi angka 1'),
    sks_total: z.coerce.number().min(0),
    general_courses: z.boolean(),
    sap_ada: z.boolean(),
    syllabus_ada: z.boolean(),
    course_materials_ada: z.boolean(),
    diktat_ada: z.boolean(),
    course_types_id: z.string(),
    course_groups_id: z.string(),
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

    const {courseTypes, courseGroups ,fectRelasi} = useCourse();

    useEffect(() => {
        fectRelasi();
    }, []);

    useEffect(() => {
        if (defaultValues) {
            reset({
                code: defaultValues.code || '',
                name_idn: defaultValues.name_idn || '',
                name_eng: defaultValues.name_eng || '',
                course_desc: defaultValues.course_desc || '',
                theory_sks: defaultValues.theory_sks || 0,
                practice_sks: defaultValues.practice_sks || 0,
                simulation_sks: defaultValues.simulation_sks || 0,
                sks_total: defaultValues.sks_total || 0,
                general_courses: Boolean(defaultValues.general_courses),
                sap_ada: Boolean(defaultValues.sap_ada),
                syllabus_ada: Boolean(defaultValues.syllabus_ada),
                course_materials_ada: Boolean(defaultValues.course_materials_ada),
                diktat_ada: Boolean(defaultValues.diktat_ada),
                course_types_id: String(defaultValues.course_types_id) || '',
                course_groups_id: String(defaultValues.course_groups_id) || '',
            });
        } else {
            reset({
                code: '',
                name_idn: '',
                name_eng: '',
                course_desc: '',
                theory_sks: 0,
                practice_sks: 0,
                simulation_sks: 0,
                sks_total: 0,
                general_courses: false,
                sap_ada: false,
                syllabus_ada: false,
                course_materials_ada: false,
                diktat_ada: false,
                course_types_id: '',
                course_groups_id: '',
            });
        }
    }, [defaultValues, reset]);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const result = await submit(data, defaultValues?.id);
            if (result != null && !isSubmitting && !defaultValues) {
                reset();
            }
        } catch (error: any) {
            setError('root', {
                type: 'manual',
                message: error?.response?.meta?.message || 'Something went wrong',
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-hidden p-6">
                <DialogHeader>
                    <DialogTitle>{defaultValues ? 'Edit Course' : 'Add Course'}</DialogTitle>
                </DialogHeader>
                <DialogDescription>Silakan isi data mata kuliah dengan lengkap dan valid.</DialogDescription>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mx-3 space-y-4">
                            <FormTextInput id="code" label="Code" type="text" {...register('code')} error={errors.code?.message} />
                            <FormTextInput id="name_idn" label="Nama (IDN)" type="text" {...register('name_idn')} error={errors.name_idn?.message} />
                            <FormTextInput id="name_eng" label="Name (ENG)" type="text" {...register('name_eng')} error={errors.name_eng?.message} />
                            <FormTextInput
                                id="theory_sks"
                                label="Theory SKS"
                                type="number"
                                {...register('theory_sks')}
                                error={errors.theory_sks?.message}
                            />
                            <FormTextInput
                                id="practice_sks"
                                label="Practice SKS"
                                type="number"
                                {...register('practice_sks')}
                                error={errors.practice_sks?.message}
                            />
                            <FormTextInput
                                id="simulation_sks"
                                label="Simulation SKS"
                                type="number"
                                {...register('simulation_sks')}
                                error={errors.simulation_sks?.message}
                            />
                            <FormTextInput
                                id="sks_total"
                                label="Total SKS"
                                type="number"
                                {...register('sks_total')}
                                error={errors.sks_total?.message}
                            />

                            <Controller
                                name="general_courses"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="general_courses"
                                        label="General Courses"
                                        value={field.value ? 'true' : 'false'}
                                        onValueChange={(val) => field.onChange(val === 'true')}
                                        error={errors.general_courses?.message}
                                    >
                                        <SelectItem value="true">Ya</SelectItem>
                                        <SelectItem value="false">Tidak</SelectItem>
                                    </FormSelectInput>
                                )}
                            />

                            <Controller
                                name="sap_ada"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="sap_ada"
                                        label="SAP "
                                        value={field.value ? 'true' : 'false'}
                                        onValueChange={(val) => field.onChange(val === 'true')}
                                        error={errors.sap_ada?.message}
                                    >
                                        <SelectItem value="true">Ya</SelectItem>
                                        <SelectItem value="false">Tidak</SelectItem>
                                    </FormSelectInput>
                                )}
                            />

                            <Controller
                                name="syllabus_ada"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="syllabus_ada"
                                        label="Syllabus "
                                        value={field.value ? 'true' : 'false'}
                                        onValueChange={(val) => field.onChange(val === 'true')}
                                        error={errors.syllabus_ada?.message}
                                    >
                                        <SelectItem value="true">Ya</SelectItem>
                                        <SelectItem value="false">Tidak</SelectItem>
                                    </FormSelectInput>
                                )}
                            />

                            <Controller
                                name="course_materials_ada"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="course_materials_ada"
                                        label="Course Materials "
                                        value={field.value ? 'true' : 'false'}
                                        onValueChange={(val) => field.onChange(val === 'true')}
                                        error={errors.course_materials_ada?.message}
                                    >
                                        <SelectItem value="true">Ya</SelectItem>
                                        <SelectItem value="false">Tidak</SelectItem>
                                    </FormSelectInput>
                                )}
                            />

                            <Controller
                                name="diktat_ada"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="diktat_ada"
                                        label="Diktat "
                                        value={field.value ? 'true' : 'false'}
                                        onValueChange={(val) => field.onChange(val === 'true')}
                                        error={errors.diktat_ada?.message}
                                    >
                                        <SelectItem value="true">Ya</SelectItem>
                                        <SelectItem value="false">Tidak</SelectItem>
                                    </FormSelectInput>
                                )}
                            />

                            <Controller
                                name="course_types_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="course_types_id"
                                        label="Course Type"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.course_types_id?.message}
                                    >
                                        {courseTypes.map((type: any) => (
                                            <SelectItem key={type.id} value={String(type.id)}>
                                                {type.name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />

                            <Controller
                                name="course_groups_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="course_groups_id"
                                        label="Course Group"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.course_groups_id?.message}
                                    >
                                        {courseGroups.map((group: any) => (
                                            <SelectItem key={group.id} value={String(group.id)}>
                                                {group.name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />

                            <FormTextInput
                                id="course_desc"
                                label="Course Description"
                                type="textarea"
                                {...register('course_desc')}
                                error={errors.course_desc?.message}
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
