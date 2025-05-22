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
    code: z.string({ message: 'Kode harus diisi' }),
    semester: z.coerce.number({ message: 'Semester Wajib diisi' }).min(1, 'Semester wajib diisi lebih dari 0').max(14, 'Maximal Semester hanya 14'),
    name_idn: z.string({ message: 'Mata Kuliah Wajib Diisi' }),
    name_eng: z.string({ message: 'Course Wajib Diisi' }),
    theory_sks: z.coerce.number({ message: 'Teori Wajib diisi' }).positive('Nilai harus melebebihi angka 1'),
    practical_sks: z.coerce.number({ message: 'Praktek Wajib diisi' }),
    fieldwork_sks: z.coerce.number(),
    course_desc: z.string().nullable(),
    
    prereq_courses_1: z.number().nullable(),
    prereq_courses_2: z.number().nullable(),
    course_types_id: z.string({ message: 'Jenis Mata Kuliah Wajib diisi' }),
    course_groups_id: z.string({ message: 'Kelompok Mata Kuliah Wajib diisi' }),
    curriculums_id: z.string({ message: 'Kurikulum Wajib diisi' }),
    elective_course_groups_id: z.string().nullable(),
});

type FormInputs = z.infer<typeof schema>;

const ModalForm = ({ open, onOpenChange, submit, defaultValues }: ModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        setValue,
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
                semester: defaultValues.semester || null,
                name_idn: defaultValues.name_idn || '',
                name_eng: defaultValues.name_eng || '',
                course_desc: defaultValues.course_desc || '',
                theory_sks: defaultValues.theory_sks || null,
                practical_sks: defaultValues.practical_sks || null,
                fieldwork_sks: defaultValues.fieldwork_sks || '',
                
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
                semester: null,
                name_idn: '',
                name_eng: '',
                course_desc: '',
                theory_sks: null,
                practical_sks: null,
                fieldwork_sks: null,
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
    const [filteredGroups, setFilteredGroups] = useState(courseGroups);

    const handleCourseTypeChange = (value: string) => {
        const peminatanType = courseTypes.find((type: any) => type.name === 'Pilihan');
        const isElective = value === String(peminatanType?.id);
        if (!isElective && !defaultValues) {
            setValue('elective_course_groups_id', null);
        }
        setShowElectiveCourse(isElective);
    };

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const result = await submit(data, defaultValues?.id);
            if (result != null && !isSubmitting && !defaultValues) {
                reset({
                    code: '',
                    semester: null,
                    name_idn: '',
                    name_eng: '',
                    course_desc: '',
                    theory_sks: null,
                    practical_sks: null,
                    fieldwork_sks: null,
                    prereq_courses_1: null,
                    prereq_courses_2: null,
                    course_types_id: '',
                    course_groups_id: '',
                    curriculums_id: '',
                    elective_course_groups_id: '',
                });
            }
        } catch (error: any) {
            const errorsData = error?.data;
            let lastErrorMessage = '';
            let firstErrorMessage = error.meta.message;
            
            Object.entries(errorsData).forEach(([field, messages], index) => {
                const messageText = (messages as string[])[0];
                lastErrorMessage = messageText;
            });
            
            let finalErrorMessage = firstErrorMessage.includes('Duplicate record') ? firstErrorMessage : lastErrorMessage;
            
            setError('root', {
                type: 'manual',
                message: finalErrorMessage,
            });
        }
    };
    
    const [filterMatkulPil, setFilterMatkulPil] = useState<any[]>([]);
    
    const getProdiFromCurri = (curriculums_id: string) => {
        const selectedCurriculum = curriculum.find((item: any) => item.id === Number(curriculums_id));
        return selectedCurriculum.study_program.id;
    };
    const [selectedStudyProgramId, setSelectedStudyProgramId] = useState<string | null>(null);
    
    const handleCurriculumChange = (curriculums_id: string) => {
        setValue('curriculums_id', curriculums_id);
        const selectedCurriculum = curriculum.find((item: any) => item.id === Number(curriculums_id));
        if (selectedCurriculum) {
            const studyProgramId = selectedCurriculum.study_programs_id?.id;
            setSelectedStudyProgramId(studyProgramId ? String(studyProgramId) : null);
            const filtered = MatkulPil.filter((matkul: any) => 
                String(matkul.study_programs_id.id) === String(studyProgramId)
            );
            setFilterMatkulPil(filtered);
        } else {
            setSelectedStudyProgramId(null);
            setFilterMatkulPil([]);
        }
    };
    

    // Fungsi untuk mendapatkan prefix dari kode
    const getCoddeprefix = (code: string) => {
        // Ambil prefix dari kode (huruf kapital)
        const match = code.match(/^[A-Z]+/);
        return match ? match[0] : '';
    };

    const handleCodeChange = (value: string) => {
        const uppercaseValue = value.toUpperCase();
        setValue('code', uppercaseValue);

        // Ekstrak prefix kode
        const prefix = getCoddeprefix(uppercaseValue);

        // Filter kelompok mata kuliah berdasarkan kode yang mengandung prefix
        const newFilteredGroups = courseGroups.filter(
            (group: any) => group.code?.toUpperCase().includes(prefix) || group.name.toUpperCase().includes(prefix),
        );

        setFilteredGroups(newFilteredGroups);

        // Jika ada satu kelompok yang cocok, langsung set value-nya
        if (newFilteredGroups.length === 1) {
            setValue('course_groups_id', String(newFilteredGroups[0].id));
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
                            <Controller
                                name="curriculums_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="curriculums_id"
                                        label={
                                            <>
                                            Kurikulum <span style={{color: 'red'}}>*</span>
                                            </>
                                        }
                                        value={field.value}
                                        onValueChange={(val) => {
                                            field.onChange(val);
                                            handleCurriculumChange(val);
                                        }}
                                        error={errors.curriculums_id?.message}
                                    >
                                        {curriculum.map((Curr: any) => (
                                            <SelectItem key={Curr.id} value={String(Curr.id)}>
                                                {`Kurikulum ${Curr.curriculum_year} - ${Curr.study_program.idn_sp_name}`}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />
                            <FormTextInput
                                id="code"
                                label={
                                    <>
                                    Kode <span style={{color: 'red'}}>*</span>
                                    </>
                                }
                                placeholder="Isi Kode Mata Kuliah"
                                type="text"
                                {...register('code', {
                                    onChange: (e) => handleCodeChange(e.target.value), // Panggil fungsi saat berubah
                                })}
                                error={errors.code?.message}
                            />
                            <FormTextInput
                                id="semester"
                                label={
                                    <>
                                    Semester <span style={{color: 'red'}}>*</span>
                                    </>
                                }
                                type="number"
                                {...register('semester')}
                                placeholder="Masukan Jumlah Semester"
                                error={errors.semester?.message}
                            />
                            <FormTextInput
                                id="name_idn"
                                label={
                                    <>
                                    MataKuliah <span style={{color: 'red'}}>*</span>
                                    </>
                                }
                                placeholder="Masukan Nama Mata Kuliah"
                                type="text"
                                {...register('name_idn')}
                                error={errors.name_idn?.message}
                            />
                            <FormTextInput
                                id="name_eng"
                                label={
                                    <>
                                    Mata Kuliah(ENG) <span style={{color: 'red'}}>*</span>
                                    </>
                                }
                                placeholder="Masukan Nama Matkul Dalam B.Ing"
                                type="text"
                                {...register('name_eng')}
                                error={errors.name_eng?.message}
                            />
                            <FormTextInput
                                id="theory_sks"
                                label={
                                    <>
                                    SKS Teori <span style={{color: 'red'}}>*</span>
                                    </>
                                }
                                type="number"
                                placeholder="Masukan Jumlah SKS teori"
                                {...register('theory_sks')}
                                error={errors.theory_sks?.message}
                            />
                            <FormTextInput
                                id="practical_sks"
                                placeholder="Masukan Jumlah SKS Praktek"
                                label={
                                    <>
                                    SKS Praktik <span style={{color: 'red'}}>*</span>
                                    </>
                                }
                                type="number"
                                {...register('practical_sks')}
                                error={errors.practical_sks?.message}
                            />
                            <FormTextInput
                                id="fieldwork_sks"
                                label="SKS Lapangan"
                                placeholder="Masukan Jumlah SKS Lapangan"
                                type="number"
                                {...register('fieldwork_sks')}
                                error={errors.fieldwork_sks?.message}
                            />
                            <Controller
                                name="course_types_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="course_types_id"
                                        label={
                                            <>
                                            Jenis Mata Kuliah <span style={{color: 'red'}}>*</span>
                                            </>
                                        }
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
                                        label={
                                            <>
                                            Kelompok Mata Kuliah <span style={{color: 'red'}}>*</span>
                                            </>
                                        }
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.course_groups_id?.message}
                                    >
                                        {filteredGroups.map((group: any) => (
                                            <SelectItem key={group.id} value={String(group.id)}>
                                                {group.name}
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
                                            label={
                                                <>
                                                Mata Kuliah Peminatan <span style={{color: 'red'}}>*</span>
                                                </>
                                            }
                                            value={field.value ?? ''}
                                            onValueChange={field.onChange}
                                            error={errors.elective_course_groups_id?.message}
                                        >
                                            {filterMatkulPil.map((matkul: any) => (
                                                <SelectItem key={matkul.id} value={String(matkul.id)}>
                                                    {matkul.name}
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
