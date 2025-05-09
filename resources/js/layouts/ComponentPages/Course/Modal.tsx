import { Button } from '@/components/ui/button';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectItem } from '@/components/ui/select';
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
    code: z.string({message: 'Kode harus diisi'}).min(2, 'Code harus lebih dari 2 karakter'),
    semester: z.coerce.number({message:'Semester Wajib diisi'}).min(1, 'Semester wajib diisi lebih dari 0').max(14, 'Maximal Semester hanya 14'),
    name_idn: z.string({message: 'Mata Kuliah Wajib Diisi'}).min(5, 'Nama harus lebih dari 5 karakter'),
    name_eng: z.string({message: 'Course Wajib Diisi'}).min(5, 'Name harus lebih dari 5 karakter'),
    theory_sks: z.coerce.number({message: 'Teori Wajib diisi'}).positive('Nilai harus melebebihi angka 1'),
    practical_sks: z.coerce.number({message: 'Praktek Wajib diisi'}),
    fieldwork_sks: z.coerce.number(),
    course_desc: z.string().nullable(),
    is_scheduled: z.boolean(),
    prereq_courses_1: z.number().nullable(),
    prereq_courses_2: z.number().nullable(),
    course_types_id: z.string({message: 'Jenis Mata Kuliah Wajib diisi'}),
    course_groups_id: z.string({message: 'Kelompok Mata Kuliah Wajib diisi'}),
    curriculums_id: z.string({message: 'Kurikulum Wajib diisi'}),
    elective_course_groups_id: z.string().nullable(),
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

    const { courseTypes, courseGroups, curriculum, MatkulPil, fectRelasi } = useCourse();

    useEffect(() => {
        fectRelasi();
    }, []);

    useEffect(() => {
        if (defaultValues) {
            reset({
                code: defaultValues.code || '',
                semester: defaultValues.semester || 0,
                name_idn: defaultValues.name_idn || '',
                name_eng: defaultValues.name_eng || '',
                course_desc: defaultValues.course_desc || '',
                theory_sks: defaultValues.theory_sks || 0,
                practical_sks: defaultValues.practical_sks || 0,
                fieldwork_sks: defaultValues.fieldwork_sks || '',
                is_scheduled: Boolean(defaultValues.is_scheduled) || true,
                prereq_courses_1: defaultValues.prereq_courses_1 || null,
                prereq_courses_2: defaultValues.prereq_courses_2 || null,
                course_types_id: String(defaultValues.course_types_id) || '',
                course_groups_id: String(defaultValues.course_groups_id) || '',
                curriculums_id: String(defaultValues.curriculums_id) || '',
                elective_course_groups_id: String(defaultValues.elective_course_groups_id) ?? null,
            });
        } else {
            reset({
                code: '',
                semester: 0,
                name_idn: '',
                name_eng: '',
                course_desc: '',
                theory_sks: 0,
                practical_sks: 0,
                fieldwork_sks: 0,
                is_scheduled: true,
                prereq_courses_1: null,
                prereq_courses_2: null,
                course_types_id: '',
                course_groups_id: '',
                curriculums_id: '',
                elective_course_groups_id: '',
            });
        }
    }, [defaultValues, reset]);

    const [showElectiveCourse, setShowElectiveCourse] = useState(false);

    const handleCourseTypeChange = (value: string) => {
        // Temukan ID dari tipe mata kuliah "Peminatan" 
        const peminatanType = courseTypes.find((type: any) => type.name === "Peminatan");
    
        // Cek apakah value dari jenis mata kuliah sesuai dengan ID peminatan
        setShowElectiveCourse(value === String(peminatanType?.id));
    };
    
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
                            <FormTextInput 
                                id="code" 
                                label="Kode" 
                                placeholder='Isi Kode Mata Kuliah'
                                type="text" {...register('code')} 
                                error={errors.code?.message} 
                            />
                            <FormTextInput
                                id="semester"
                                label="Semester"
                                type="number"
                                {...register('semester')}
                                error={errors.semester?.message}
                            />
                            <FormTextInput 
                                id="name_idn" 
                                label="Mata Kuliah" 
                                placeholder='Masukan Nama Mata Kuliah'
                                type="text" 
                                {...register('name_idn')} 
                                error={errors.name_idn?.message} 
                            />
                            <FormTextInput 
                                id="name_eng" 
                                label="Course" 
                                placeholder='Masukan Nama Matkul Dalam B.Ing'
                                type="text" {...register('name_eng')} 
                                error={errors.name_eng?.message} 
                            />
                            <FormTextInput
                                id="theory_sks"
                                label="SKS Teori"
                                type="number"
                                {...register('theory_sks')}
                                error={errors.theory_sks?.message}
                            />
                            <FormTextInput
                                id="practical_sks"
                                label="SKS Praktek"
                                type="number"
                                {...register('practical_sks')}
                                error={errors.practical_sks?.message}
                            />
                            <FormTextInput
                                id="fieldwork_sks"
                                label="SKS Lapangan"
                                type="number"
                                {...register('fieldwork_sks')}
                                error={errors.fieldwork_sks?.message}
                            />
                            <Controller
                                name="is_scheduled"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="is_scheduled"
                                        label="Terjadwal"
                                        value={field.value ? 'true' : 'false'}
                                        onValueChange={(val) => field.onChange(val === 'true')}
                                        error={errors.is_scheduled?.message}
                                    >
                                        <SelectItem value="true">Terjadwal</SelectItem>
                                        <SelectItem value="false">Tidak Terjadwal</SelectItem>
                                    </FormSelectInput>
                                )}
                            />
                            <Controller
                                name="course_types_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="course_types_id"
                                        label="Jenis Mata Kuliah"
                                        value={field.value}
                                        onValueChange={(val) => {
                                            field.onChange(val);
                                            handleCourseTypeChange(val); 
                                        }}
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
                                        label="Kelompok Mata Kuliah"
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

                            <Controller
                                name="curriculums_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="curriculums_id"
                                        label="Kurirkulum"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.curriculums_id?.message}
                                    >
                                        {curriculum.map((Curr: any) => (
                                            <SelectItem key={Curr.id} value={String(Curr.id)}>
                                                {Curr.curriculum_year}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />

                            {showElectiveCourse && (
                                <Controller
                                    name="elective_course_groups_id"
                                    control={control}
                                    render={({ field }) => (
                                        <FormSelectInput
                                            id="elective_course_groups_id"
                                            label="Mata Kuliah Pilihan"
                                            value={field.value ?? ''}
                                            onValueChange={field.onChange}
                                            error={errors.elective_course_groups_id?.message}
                                        >
                                            {MatkulPil.map((Matkul: any) => (
                                                <SelectItem key={Matkul.id} value={String(Matkul.id)}>
                                                    {Matkul.name}
                                                </SelectItem>
                                            ))}
                                        </FormSelectInput>
                                    )}
                                />
                            )}


                            {/* <FormTextInput
                                id="course_desc"
                                label="Course Description"
                                type="textarea"
                                {...register('course_desc')}
                                error={errors.course_desc?.message}
                            /> */}

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
