import { Button } from '@/components/ui/button';
import { FormTextInput, FormSelectInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectItem } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Proditype } from './Column';

type Option = { label: string; value: string };

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: Proditype;
    faculties: Option[];
    academicPeriods: Option[];
    finalProjectTypes: Option[];
    accreditations: Option[];
    educationLevels: Option[];
};

const schema = z.object({
    idn_sp_name: z.string().min(3),
    eng_short_name: z.string().min(1),
    min_credits_pass: z.coerce.number().min(1),
    min_pass_gpa: z.coerce.number().min(0),
    final_project_req: z.boolean(),
    ukom_req: z.boolean(),
    max_lecturer_advisors: z.coerce.number().min(1),
    max_examiner_lecturers: z.coerce.number().min(1),
    sp_address: z.string(),
    sp_phone: z.string(),
    sp_email_address: z.string().email(),
    sp_web_address: z.string().url(),
    sp_description: z.string(),
    sp_vision: z.string(),
    sp_mission: z.string(),
    sp_competencies: z.string(),
    program_learning_outcomes: z.string(),
    faculty_id: z.coerce.number(),
    academic_periods_id: z.coerce.number(),
    final_project_types_id: z.coerce.number(),
    study_program_accreditations_id: z.coerce.number(),
    univ_education_levels_id: z.coerce.number(),
});

type FormInputs = z.infer<typeof schema>;

const ModalForm = ({ open, onOpenChange, submit, defaultValues, faculties = [], academicPeriods = [], finalProjectTypes = [], accreditations = [], educationLevels = [] }: ModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<FormInputs>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        } else {
            reset({
                idn_sp_name: '',
                eng_short_name: '',
                min_credits_pass: 0,
                min_pass_gpa: 0,
                final_project_req: false,
                ukom_req: false,
                max_lecturer_advisors: 0,
                max_examiner_lecturers: 0,
                sp_address: '',
                sp_phone: '',
                sp_email_address: '',
                sp_web_address: '',
                sp_description: '',
                sp_vision: '',
                sp_mission: '',
                sp_competencies: '',
                program_learning_outcomes: '',
                faculty_id: 0,
                academic_periods_id: 0,
                final_project_types_id: 0,
                study_program_accreditations_id: 0,
                univ_education_levels_id: 0,
            });
        }
    }, [defaultValues, reset]);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        await submit(data, defaultValues?.id);
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
                            <FormTextInput id="idn_sp_name" label="Program Name (ID)" {...register('idn_sp_name')} error={errors.idn_sp_name?.message} />
                            <FormTextInput id="eng_short_name" label="Short Name (ENG)" type="text" {...register('eng_short_name')} error={errors.eng_short_name?.message} />
                            <FormTextInput id="min_credits_pass" label="Min Credits" type="number" {...register('min_credits_pass')} error={errors.min_credits_pass?.message} />
                            <FormTextInput id="min_pass_gpa" label="Min GPA" type="number" step="0.01" {...register('min_pass_gpa')} error={errors.min_pass_gpa?.message} />
                            <Controller control={control} name="final_project_req" render={({ field }) => (
                                <FormSelectInput id="final_project_req" label="Final Project Required" value={String(field.value)} onValueChange={(val) => field.onChange(val === 'true')} error={errors.final_project_req?.message || ''}>
                                    <SelectItem value="true">Yes</SelectItem>
                                    <SelectItem value="false">No</SelectItem>
                                </FormSelectInput>
                            )} />
                            <Controller control={control} name="ukom_req" render={({ field }) => (
                                <FormSelectInput id="ukom_req" label="Ukom Required" value={String(field.value)} onValueChange={(val) => field.onChange(val === 'true')} error={errors.ukom_req?.message || ''}>
                                    <SelectItem value="true">Yes</SelectItem>
                                    <SelectItem value="false">No</SelectItem>
                                </FormSelectInput>
                            )} />
                            <FormTextInput id="max_lecturer_advisors" label="Max Advisors" type="number" {...register('max_lecturer_advisors')} error={errors.max_lecturer_advisors?.message} />
                            <FormTextInput id="max_examiner_lecturers" label="Max Examiners" type="number" {...register('max_examiner_lecturers')} error={errors.max_examiner_lecturers?.message} />
                            <FormTextInput id="sp_address" label="Address" type="text" {...register('sp_address')} error={errors.sp_address?.message} />
                            <FormTextInput id="sp_phone" label="Phone" {...register('sp_phone')} error={errors.sp_phone?.message} />
                            <FormTextInput id="sp_email_address" label="Email" type="email" {...register('sp_email_address')} error={errors.sp_email_address?.message} />
                            <FormTextInput id="sp_web_address" label="Website" type="url" {...register('sp_web_address')} error={errors.sp_web_address?.message} />
                            <FormTextInput id="sp_competencies" label="Competencies" {...register('sp_competencies')} error={errors.sp_competencies?.message} />
                            <FormTextInput id="program_learning_outcomes" label="Learning Outcomes" {...register('program_learning_outcomes')} error={errors.program_learning_outcomes?.message} />
                            <Controller control={control} name="faculty_id" render={({ field }) => (
                                <FormSelectInput id="faculty_id" label="Faculty" value={String(field.value)} onValueChange={(val) => field.onChange(Number(val))} error={errors.faculty_id?.message}>
                                    {faculties.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}
                                </FormSelectInput>
                            )} />
                            <Controller control={control} name="academic_periods_id" render={({ field }) => (
                                <FormSelectInput id="academic_periods_id" label="Academic Period" value={String(field.value)} onValueChange={(val) => field.onChange(Number(val))} error={errors.academic_periods_id?.message}>
                                    {academicPeriods.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}
                                </FormSelectInput>
                            )} />
                            <Controller control={control} name="final_project_types_id" render={({ field }) => (
                                <FormSelectInput id="final_project_types_id" label="Final Project Type" value={String(field.value)} onValueChange={(val) => field.onChange(Number(val))} error={errors.final_project_types_id?.message}>
                                    {finalProjectTypes.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}
                                </FormSelectInput>
                            )} />
                            <Controller control={control} name="study_program_accreditations_id" render={({ field }) => (
                                <FormSelectInput id="study_program_accreditations_id" label="Accreditation" value={String(field.value)} onValueChange={(val) => field.onChange(Number(val))} error={errors.study_program_accreditations_id?.message}>
                                    {accreditations.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}
                                </FormSelectInput>
                            )} />
                            <Controller control={control} name="univ_education_levels_id" render={({ field }) => (
                                <FormSelectInput id="univ_education_levels_id" label="Education Level" value={String(field.value)} onValueChange={(val) => field.onChange(Number(val))} error={errors.univ_education_levels_id?.message}>
                                    {educationLevels.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}
                                </FormSelectInput>
                            )} />
                            <FormTextInput id="sp_vision" label="Vision" type='textarea' {...register('sp_vision')} error={errors.sp_vision?.message} />
                            <FormTextInput id="sp_mission" label="Mission" type='textarea' {...register('sp_mission')} error={errors.sp_mission?.message} />
                            <FormTextInput id="sp_description" label="Description" type='textarea' {...register('sp_description')} error={errors.sp_description?.message} />
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