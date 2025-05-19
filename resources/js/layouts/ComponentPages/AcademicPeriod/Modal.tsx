import { Button } from '@/components/ui/button';
import DateInput from '@/components/ui/Components_1/DateInput';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

import { SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/swicth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAcademicPriod } from './useAcademicPeriod';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};

const schema = z.object({
    academic_year_id: z.string().min(1, 'Tahun Ajaran wajib diisi'),
    semester: z.string({ message: 'Semester wajib diisi' }),
    name: z.string({ message: 'Nama wajib diisi' }).min(1, 'Name harus lebih dari 1 karakter'),
    short_name: z.string({ message: 'Singkatan wajib diisi' }),
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
        register,
        handleSubmit,
        reset,
        setValue,
        setError,
        control,
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
                academic_year_id: String(defaultValues.academic_year_id) || '0',
                semester: defaultValues.semester,
                name: defaultValues.name || '',
                short_name: defaultValues.short_name || '',
                start_date: defaultValues.start_date,
                end_date: defaultValues.end_date,
                start_midterm_exam: defaultValues.start_midterm_exam,
                end_midterm_exam: defaultValues.end_midterm_exam,
                start_final_exam: defaultValues.start_final_exam,
                end_final_exam: defaultValues.end_final_exam,
                number_of_meetings: defaultValues.number_of_meetings || null,
                min_presence: defaultValues.min_presence || null,
                is_active: Boolean(defaultValues.is_active) || true,
                description: defaultValues.description || '',
            });
        } else {
            reset({
                academic_year_id: '',
                semester: '',
                name: '',
                short_name: '',
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
    useEffect(() => {
        if (defaultValues?.academic_year_id) {
            // Cari tahun akademik yang sesuai berdasarkan ID
            const selectedYear = AcademicYears.find((item: any) => item.id === Number(defaultValues.academic_year_id));
            if (selectedYear) {
                // Contoh: Mengatur tanggal mulai dan berakhir secara otomatis
                const startDate = `${selectedYear.academic_year}`; // Format tanggal Anda mungkin berbeda
                const endDate = `${selectedYear.academic_year}`;
                const UTS = `${selectedYear.academic_year}`;
                const UTSselesai = `${selectedYear.academic_year}`;
                const UAS = `${selectedYear.academic_year}`;
                const UASselesai = `${selectedYear.academic_year}`;
                setValue('start_date', startDate);
                setValue('end_date', endDate);
                setValue('start_midterm_exam', UTS);
                setValue('end_midterm_exam', UTSselesai);
                setValue('start_final_exam', endDate);
                setValue('end_final_exam', UASselesai);
            }
        }
    }, [defaultValues?.academic_year_id, AcademicYears, setValue]);

    useEffect(() => {
        if (defaultValues?.academic_year_id) {
            const selectedYear = AcademicYears.find((item: any) => item.id === Number(defaultValues.academic_year_id));
            if (selectedYear) {
                // Format tanggal dari data update
                const startDate = defaultValues.start_date || `${selectedYear.academic_year}-01-01`;
                const endDate = defaultValues.end_date || `${selectedYear.academic_year}-12-31`;
                const UTS = defaultValues.start_midterm_exam || `${selectedYear.academic_year}-05-15`;
                const UTSselesai = defaultValues.end_midterm_exam || `${selectedYear.academic_year}-05-20`;
                const UAS = defaultValues.start_final_exam || `${selectedYear.academic_year}-12-15`;
                const UASselesai = defaultValues.end_final_exam || `${selectedYear.academic_year}-12-20`;

                // Set nilai ke form
                setValue('start_date', startDate);
                setValue('end_date', endDate);
                setValue('start_midterm_exam', UTS);
                setValue('end_midterm_exam', UTSselesai);
                setValue('start_final_exam', UAS);
                setValue('end_final_exam', UASselesai);
            }
        }
    }, [defaultValues?.academic_year_id, AcademicYears, setValue]);
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const result = await submit(data, defaultValues?.id);
            if (result != null && !isSubmitting && !defaultValues) {
                reset({
                    academic_year_id: '',
                    semester: '',
                    name: '',
                    short_name: '',
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
            let firstErrorMessage = error?.meta?.message;
            console.log(error);

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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-hidden p-6">
                <DialogHeader title="Academic Period">
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
                                        label="Semester"
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
                                        label="Tahun Akademik"
                                        value={String(field.value)}
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            const selectedYear = AcademicYears.find((item: any) => item.id === Number(value));
                                            if (selectedYear) {
                                                const startDate = `${selectedYear.academic_year}-01-01`;
                                                const endDate = `${selectedYear.academic_year}-12-31`;
                                                const UTS = `${selectedYear.academic_year}-12-31`;
                                                const UTSselesai = `${selectedYear.academic_year}-12-31`;
                                                const UAS = `${selectedYear.academic_year}-12-31`;
                                                const UASselesai = `${selectedYear.academic_year}-12-31`;
                                                setValue('start_date', startDate);
                                                setValue('end_date', endDate);
                                                setValue('start_midterm_exam', UTS);
                                                setValue('end_midterm_exam', UTSselesai);
                                                setValue('start_final_exam', UAS);
                                                setValue('end_final_exam', UASselesai);
                                            }
                                        }}
                                        error={errors.academic_year_id?.message}
                                    >
                                        {AcademicYears.map((Academic: any) => (
                                            <SelectItem key={Academic.id} value={String(Academic.id)}>
                                                {Academic.academic_year}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />

                            <FormTextInput
                                id="name"
                                label="Nama"
                                placeholder="Masukan nama periode akadmemik"
                                type="text"
                                {...register('name')}
                                error={errors.name?.message}
                            />
                            <FormTextInput
                                placeholder="Masukan singkatan"
                                id="short_name"
                                label="Nama Singkat"
                                type="text"
                                {...register('short_name')}
                                error={errors.short_name?.message}
                            />
                            <DateInput
                                label="Tanggal Mulai"
                                id="start_date"
                                placeholder="Enter Start Date"
                                register={register('start_date')}
                                error={errors.start_date}
                            />
                            <DateInput
                                label="Tanggal Selesai"
                                id="end_date"
                                placeholder="Enter End Date"
                                register={register('end_date')}
                                error={errors.end_date}
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
                                placeholder="Enter Start Date"
                                register={register('end_final_exam')}
                                error={errors.end_final_exam}
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
                                label="description"
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
