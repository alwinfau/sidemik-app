import { Button } from '@/components/ui/button';
import DateInput from '@/components/ui/Components_1/DateInput';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Switch } from '@/components/ui/swicth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAcademicPriod } from './useAcademicPeriod';
import { PeriodeAcademicType } from './Column';
import { SelectItem } from '@/components/ui/select';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: PeriodeAcademicType;
};

const schema = z.object({
    academic_year_id: z.string().min(1, 'Tahun Ajaran wajib diisi'),
    semester: z.string({ message: 'Semester wajib diisi' }),
    name: z.string({ message: 'Nama wajib diisi' }).min(1, 'Name harus lebih dari 1 karakter'),
    start_date: z.string().nullable(),
    end_date: z.string().nullable(),
    start_midterm_exam: z.string().nullable(),
    end_midterm_exam: z.string().nullable(),
    start_final_exam: z.string().nullable(),
    end_final_exam: z.string().nullable(),
    number_of_meetings: z.number().nullable(),
    min_presence: z.number().nullable(),
    is_active: z.boolean(),
    description: z.string().nullable(),
});

type FormInputs = z.infer<typeof schema>;

const ModalForm = ({ open, onOpenChange, submit, defaultValues }: ModalProps) => {
const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    watch,
    formState: { errors, isSubmitting },
    } = useForm<FormInputs>({
    resolver: zodResolver(schema),
});

const { AcademicYears, fecthAcademicYears } = useAcademicPriod();

useEffect(() => {
    fecthAcademicYears();
}, []);

    useEffect(() => {
    if (defaultValues) {
    reset({
        academic_year_id: String(defaultValues.academic_year_id),
        semester: defaultValues.semester,
        name: defaultValues.name || '',
        start_date: defaultValues.start_date,
        end_date: defaultValues.end_date,
        start_midterm_exam: defaultValues.start_midterm_exam,
        end_midterm_exam: defaultValues.end_midterm_exam,
        start_final_exam: defaultValues.start_final_exam,
        end_final_exam: defaultValues.end_final_exam,
        number_of_meetings: defaultValues.number_of_meetings || null,
        min_presence: defaultValues.min_presence || null,
        is_active: defaultValues.is_active ?? true,
        description: defaultValues.description || '',
    });
    } else {
        reset({
                academic_year_id: '',
                semester: '',
                name: '',
                start_date: '',
                end_date: '',
                start_midterm_exam: '',
                end_midterm_exam: '',
                start_final_exam: '',
                end_final_exam: '',
                number_of_meetings: null,
                min_presence: null,
                is_active: true,
                description: '',
            });
        }
    }, [defaultValues, reset]);

    
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
        const result = await submit(data, defaultValues?.id);
        if (result != null && !isSubmitting && !defaultValues) {
            reset({
            academic_year_id: '',
            semester: '',
            name: '',
            start_date: '',
            end_date: '',
            start_midterm_exam: '',
            end_midterm_exam: '',
            start_final_exam: '',
            end_final_exam: '',
            number_of_meetings: 0,
            min_presence: 0,
            is_active: true,
            description: '',
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
    useEffect(() => {
        const selectedYear = AcademicYears.find((ay: any) => String(ay.id) === String(watch('academic_year_id')));
        if (selectedYear && selectedYear.name) {
            const [startYearStr, endYearStr] = selectedYear.name.split('/');
            const startYear = parseInt(startYearStr);
            const endYear = parseInt(endYearStr);
    
            if (!isNaN(startYear) && !isNaN(endYear)) {
                setValue('start_date', `${startYear}-08-01`);
                setValue('start_midterm_exam', `${startYear}-10-15`);
                setValue('end_midterm_exam', `${startYear}-10-20`);
                setValue('start_final_exam', `${startYear}-12-10`);
                setValue('end_final_exam', `${startYear}-12-20`);
                setValue('end_date', `${endYear}-01-01`);
            }
        }
    }, [watch('academic_year_id'), AcademicYears, setValue]);
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-hidden p-6">
            <DialogHeader>
            <DialogTitle>{defaultValues ? 'Edit Academic Period' : 'Add Academic Period'}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh] pr-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                <Controller
                    name="semester"
                    control={control}
                    render={({ field }) => (
                    <FormSelectInput
                        id="semester"
                        label={<> Semester <span className="text-red-500">*</span></>}
                        value={field.value}
                        onValueChange={field.onChange}
                        error={errors.semester?.message}
                    >
                        <SelectItem value="#" disabled>
                        Pilih Semester
                        </SelectItem>
                        <SelectItem value="Ganjil">Semester Ganjil</SelectItem>
                        <SelectItem value="Genap">Semester Genap</SelectItem>
                    </FormSelectInput>
                    )}
                />

                <Controller
                    name="academic_year_id"
                    control={control}
                    rules={{ required: 'Tahun Akademik wajib diisi' }}
                    render={({ field }) => (
                    <FormSelectInput
                        id="academic_year_id"
                        label={<> tahun akademik <span className="text-red-500">*</span></>}
                        value={String(field.value)}
                        onValueChange={field.onChange}
                        error={errors.academic_year_id?.message}
                    >
                        
                        {AcademicYears.filter((ay: any) => ay.is_active).map((ay: any) => (
                        <SelectItem key={ay.id} value={String(ay.id)}>
                            {ay.name}
                        </SelectItem>
                        ))}
                    </FormSelectInput>
                    )}
                />

                <FormTextInput
                    id="name"
                    label={<> Nama <span className="text-red-500">*</span></>}
                    placeholder="Masukan nama periode akademik"
                    type="text"
                    {...register('name')}
                    error={errors.name?.message}
                />
                <DateInput
                    label="Tanggal Mulai"
                    id="start_date"
                    placeholder="Enter Start Date"
                    register={register('start_date')}
                    error={errors.start_date}
                />
                <DateInput
                    label="Tanggal UTS"
                    id="start_midterm_exam"
                    placeholder="Enter UTS Date"
                    register={register('start_midterm_exam')}
                    error={errors.start_midterm_exam}
                />
                <DateInput
                    label="Tanggal UTS berakhir"
                    id="end_midterm_exam"
                    placeholder="Enter UTS Final Date"
                    register={register('end_midterm_exam')}
                    error={errors.end_midterm_exam}
                />
                <DateInput
                    label="Tanggal UAS"
                    id="start_final_exam"
                    placeholder="Enter Start UAS Date"
                    register={register('start_final_exam')}
                    error={errors.start_final_exam}
                />
                <DateInput
                    label="Tanggal UAS berakhir"
                    id="end_final_exam"
                    placeholder="Enter End UAS Date"
                    register={register('end_final_exam')}
                    error={errors.end_final_exam}
                />
                <DateInput
                    label="Tanggal Selesai"
                    id="end_date"
                    placeholder="Enter End Date"
                    register={register('end_date')}
                    error={errors.end_date}
                />
                <FormTextInput
                    id="number_of_meetings"
                    label="Jumlah Pertemuan"
                    placeholder="Masukan jumlah pertemuan"
                    type="number"
                    {...register('number_of_meetings', { valueAsNumber: true })}
                    error={errors.number_of_meetings?.message}
                />
                <FormTextInput
                    id="min_presence"
                    label="Minimal Jumlah Presensi"
                    type="number"
                    placeholder="Masukan minimal Presensi"
                    {...register('min_presence', { valueAsNumber: true })}
                    error={errors.min_presence?.message}
                />
                <FormTextInput
                    id="description"
                    placeholder="Masukan deskripsi akademik periode"
                    label="Description"
                    type="text"
                    {...register('description')}
                    error={errors.description?.message}
                />
                <div className="pt-2">
                    <Label>Status</Label>
                    <Controller
                    name="is_active"
                    control={control}
                    render={({ field }) => (
                        <div className="flex items-center gap-4">
                        <Switch checked={field.value} onCheckedChange={field.onChange} id="is_active" />
                        <Label htmlFor="is_active">{field.value ? 'Active' : 'Non Aktif'}</Label>
                        </div>
                    )}
                    />
                </div>
                {errors.root && <p className="text-red-600">{errors.root.message}</p>}

                <Button
                    type="submit"
                    className={`mt-4 rounded px-4 py-2 font-bold text-white ${
                    defaultValues ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-500 hover:bg-green-600'
                    }`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Loading...' : defaultValues ? 'Update' : 'Create'}
                </Button>
                </div>
            </form>
            </ScrollArea>
        </DialogContent>
        </Dialog>
    );
};

export default ModalForm;
