import { Button } from '@/components/ui/button';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { SelectItem } from '@/components/ui/select';
import { useAxios } from '@/hooks/useAxios';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};

const schema = z.object({
    curriculum_years_code: z.string().min(3, 'Code harus lebih dari 3 karakter'),
    curriculum_years_name: z.string().min(3, 'Code harus lebih dari 3 karakter'),
    curriculum_years_desc: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    study_programs_id: z.string(),
    academic_periods_id: z.string(),
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

    const [prodi, setProdi] = useState<any>([]);
    const [academicperiod, setAcademicPeriod] = useState<any>([]);

    const fetchData = async () => {
        try {
            const resProdi: any = await get('/study-program');
            setProdi(resProdi.data.data);

            const resAcademic: any = await get('/academic-period');
            setAcademicPeriod(resAcademic.data.data);
        } catch (err) {
            console.error('Error fetching:', err);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        if (defaultValues) {
            reset({
                curriculum_years_code: defaultValues.curriculum_years_code || '',
                curriculum_years_name: defaultValues.curriculum_years_name || '',
                curriculum_years_desc: defaultValues.curriculum_years_desc || '',
                start_date: defaultValues.start_date || '',
                end_date: defaultValues.end_date || '',
                study_programs_id: String(defaultValues.study_programs_id) || '0',
                academic_periods_id: String(defaultValues.academic_periods_id) || '0',
            });
        } else {
            reset({
                curriculum_years_code: '',
                curriculum_years_name: '',
                curriculum_years_desc: '',
                start_date: '',
                end_date: '',
                study_programs_id: '',
                academic_periods_id: '',
            });
        }
    }, [defaultValues, reset]);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const result = await submit(data, defaultValues?.id);
            if (result != null) {
                if (!isSubmitting && !defaultValues) {
                    reset({
                        curriculum_years_code: '',
                        curriculum_years_name: '',
                        curriculum_years_desc: '',
                        start_date: '',
                        end_date: '',
                        study_programs_id: '',
                        academic_periods_id: '',
                    });
                }
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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-hidden p-6">
                <DialogHeader>
                    <DialogTitle>{defaultValues ? 'Edit Curiculum Years' : 'Add Academic Years'}</DialogTitle>
                </DialogHeader>
                <DialogDescription>Silakan isi data Curiculum Years dengan lengkap dan sesuai dokumen resmi.</DialogDescription>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mx-3 space-y-4">
                            <Controller
                                name="study_programs_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="study_programs_id"
                                        label="Study Program"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.study_programs_id?.message}
                                    >
                                        {prodi.map((Prodi: any) => (
                                            // <SelectItem key={Prodi.id} value={String(Prodi.id)}>
                                            //     {Prodi.idn_sp_name}
                                            // </SelectItem>
                                            <SelectItem key={Prodi.id} value={String(Prodi.id)}>
                                                {Prodi.idn_sp_name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />
                            <Controller
                                name="academic_periods_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="academic_periods_id"
                                        label="Academic Period"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.academic_periods_id?.message}
                                    >
                                        {academicperiod.map((Academic: any) => (
                                            <SelectItem key={Academic.id} value={String(Academic.id)}>
                                                {Academic.name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />

                            <FormTextInput
                                id="curriculum_years_code"
                                label="Curiculum Code"
                                type="text"
                                {...register('curriculum_years_code')}
                                error={errors.curriculum_years_code?.message}
                            />
                            <FormTextInput
                                id="curriculum_years_name"
                                label="Curiculum Years"
                                type="text"
                                {...register('curriculum_years_name')}
                                error={errors.curriculum_years_name?.message}
                            />
                            <FormTextInput
                                id="curriculum_years_desc"
                                label="Description"
                                type="textarea"
                                {...register('curriculum_years_desc')}
                                error={errors.curriculum_years_desc?.message}
                            />
                            <div>
                                <div className="mb-2">
                                    <label htmlFor="start_date">Start Date</label>
                                </div>
                                <div className="rounded border p-3">
                                    <input type="date" {...register('start_date')} id="accr_cert_date" aria-label="accr_cert_date" />
                                </div>
                                {errors.start_date?.message}
                            </div>
                            <div>
                                <div className="mb-2">
                                    <label htmlFor="end_date">Start Date</label>
                                </div>
                                <div className="rounded border p-3">
                                    <input type="date" {...register('end_date')} id="accr_cert_date" aria-label="accr_cert_date" />
                                </div>
                            </div>
                            {errors.end_date?.message}
                            <Button
                                type="submit"
                                className={`mb-5 rounded px-4 py-2 font-bold text-white ${defaultValues ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-500 hover:bg-green-600'} `}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? `Loading...` : defaultValues ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
export default ModalForm;
