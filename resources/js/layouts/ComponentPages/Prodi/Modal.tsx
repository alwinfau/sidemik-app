import { Button } from '@/components/ui/button';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/swicth';
import { useAxios } from '@/hooks/useAxios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useStudyProgram } from './useStudy-program';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};
const schema = z.object({
    sp_code: z.string().min(1),
    idn_sp_name: z.string().min(3),
    eng_sp_name: z.string().min(3),
    sp_short_name: z.string().min(1),
    sp_address: z.string().nullable(),
    sp_phone: z.string().nullable(),
    sp_email_address: z.string().nullable(),
    sp_web_address: z.string().nullable(),
    sp_description: z.string().nullable(),
    sp_vision: z.string().nullable(),
    sp_mission: z.string().nullable(),
    sp_competencies: z.string().nullable(),
    program_learning_outcomes: z.string().nullable(),
    max_semester: z.number().positive(),
    faculty_id: z.string(),
    academic_periods_id: z.string(),
    final_project_types_id: z.string(),
    status: z.boolean()
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

    useEffect(() => {
        if (defaultValues) {
            reset({
                sp_code: defaultValues.sp_code || '',
                idn_sp_name: defaultValues.idn_sp_name || '',
                eng_sp_name: defaultValues.eng_sp_name || '',
                sp_short_name: defaultValues.sp_short_name || '',
                sp_address: defaultValues.sp_address || '',
                sp_phone: defaultValues.sp_phone || '',
                sp_email_address: defaultValues.sp_email_address || '',
                sp_web_address: defaultValues.sp_web_address || '',
                sp_description: defaultValues.sp_description || '',
                sp_vision: defaultValues.sp_vision || '',
                sp_mission: defaultValues.sp_mission || '',
                sp_competencies: defaultValues.sp_competencies || '',
                program_learning_outcomes: defaultValues.program_learning_outcomes || '',
                max_semester: defaultValues.max_semester || 0,
                faculty_id: String(defaultValues.faculty_id) || '',
                academic_periods_id: String(defaultValues.academic_periods_id) || '',
                final_project_types_id: String(defaultValues.final_project_types_id) || '',
                status: Boolean(defaultValues.status)
            });
        } else {
            reset({
                sp_code: '',
                idn_sp_name: '',
                eng_sp_name: '',
                sp_short_name: '',
                sp_address: '',
                sp_phone: '',
                sp_email_address: '',
                sp_web_address: '',
                sp_description: '',
                sp_vision: '',
                sp_mission: '',
                sp_competencies: '',
                program_learning_outcomes: '',
                max_semester: 0,
                faculty_id: '',
                academic_periods_id: '',
                final_project_types_id: '',
                status: false
            });
        }
    }, [defaultValues, reset]);

    const {Facultas, AcademicPeriod,  fecthRelasi} = useStudyProgram();

    useEffect(() => {
        fecthRelasi();
    }, []);

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
                    <DialogTitle>{defaultValues ? 'Edit Study-Program' : 'Add Study-Program'}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4 px-2">
                            <FormTextInput id="sp_code" label="code" {...register('sp_code')} error={errors.sp_code?.message} />
                            <FormTextInput
                                id="idn_sp_name"
                                label="Program Name (ID)"
                                {...register('idn_sp_name')}
                                error={errors.idn_sp_name?.message}
                            />
                            <FormTextInput
                                id="eng_sp_name"
                                label="Program Name (eng)"
                                {...register('eng_sp_name')}
                                error={errors.eng_sp_name?.message}
                            />
                            <FormTextInput
                                id="sp_short_name"
                                label="Short Name (ENG)"
                                type="text"
                                {...register('sp_short_name')}
                                error={errors.sp_short_name?.message}
                            />
                            {/* <FormTextInput
                                id="sp_address"
                                label="Address"
                                type="text"
                                {...register('sp_address')}
                                error={errors.sp_address?.message}
                            />
                            <FormTextInput id="sp_phone" label="Phone" {...register('sp_phone')} error={errors.sp_phone?.message} />
                            <FormTextInput
                                id="sp_email_address"
                                label="Email"
                                type="email"
                                {...register('sp_email_address')}
                                error={errors.sp_email_address?.message}
                            />
                            <FormTextInput
                                id="sp_web_address"
                                label="Website"
                                type="url"
                                {...register('sp_web_address')}
                                error={errors.sp_web_address?.message}
                            />
                            <FormTextInput
                                id="sp_competencies"
                                label="Competencies"
                                {...register('sp_competencies')}
                                error={errors.sp_competencies?.message}
                            />
                            <FormTextInput
                                id="program_learning_outcomes"
                                label="Learning Outcomes"
                                {...register('program_learning_outcomes')}
                                error={errors.program_learning_outcomes?.message}
                            /> */}
                            <FormTextInput
                                id="max_semester"
                                label="Maximal Semeter"
                                type="number"
                                {...register('max_semester', { valueAsNumber: true })}
                                error={errors.max_semester?.message}
                            />
                            <Controller
                                name="faculty_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="faculty_id"
                                        label="Fakultas"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.faculty_id?.message}
                                    >
                                        {Facultas.map((Fakultas: any) => (
                                            <SelectItem key={Fakultas.id} value={String(Fakultas.id)}>
                                                {Fakultas.name}
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
                                        label="Periode Akademik"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.academic_periods_id?.message}
                                    >
                                        {AcademicPeriod.map((Academic: any) => (
                                            <SelectItem key={Academic.id} value={String(Academic.id)}>
                                                {Academic.name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />
                            {/* <FormTextInput
                                id="sp_vision"
                                label="Vissi"
                                type="textarea"
                                {...register('sp_vision')}
                                error={errors.sp_vision?.message}
                            />
                            <FormTextInput
                                id="sp_mission"
                                label="Missi"
                                type="textarea"
                                {...register('sp_mission')}
                                error={errors.sp_mission?.message}
                            />
                            <FormTextInput
                                id="sp_description"
                                label="Keterangan"
                                type="textarea"
                                {...register('sp_description')}
                                error={errors.sp_description?.message}
                            /> */}
                            <div className="pt-2">
                                <Label>Status</Label>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="flex items-center gap-4">
                                            <Switch checked={field.value} onCheckedChange={field.onChange} id="status" />
                                            <Label htmlFor="status">{field.value ? 'Active' : 'Non Aktif'}</Label>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button
                                type="submit"
                                className={`rounded px-4 py-2 font-bold text-white ${defaultValues ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-500 hover:bg-green-600'}`}
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
