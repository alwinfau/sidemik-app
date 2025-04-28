import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/swicth';
import { PeriodeAcademicType } from './Column';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type AcademicYearOption = {
    id: string;
    name: string;
};

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: PeriodeAcademicType;
    academicYearOptions: AcademicYearOption[];
};

const schema = z.object({
    academic_year_id: z.string(),
    academic_period: z.date(),
    name: z.string().min(1),
    short_name: z.string().min(1),
    start_date: z.date(),
    end_date: z.date(),
    start_midterm_exam: z.date(),
    end_midterm_exam: z.date(),
    start_final_exam: z.date(),
    end_final_exam: z.date(),
    number_of_meetings: z.number(),
    min_number_of_meetings: z.number(),
    is_active: z.boolean(),
    description: z.string().nullable(),
});

type FormInputs = z.infer<typeof schema>;

const ModalForm = ({ open, onOpenChange, submit, defaultValues, academicYearOptions }: ModalProps) => {
    const {
        control,
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormInputs>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        } else {
            reset({
                academic_year_id: '',
                academic_period: new Date(),
                name: '',
                short_name: '',
                start_date: new Date(),
                end_date: new Date(),
                start_midterm_exam: new Date(),
                end_midterm_exam: new Date(),
                start_final_exam: new Date(),
                end_final_exam: new Date(),
                number_of_meetings: 0,
                min_number_of_meetings: 0,
                is_active: false,
                description: '',
            });
        }
    }, [defaultValues, reset]);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            await submit(data, defaultValues?.id);
        } catch (error: any) {
            console.error(error);
            setError('root', {
                type: 'manual',
                message: error.response?.meta?.message || 'Submit error',
            });
        }
    };

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
                                name="academic_period"
                                control={control}
                                render={({ field }) => (
                                    <FormTextInput label="Academic Period" type="date" {...field} error={errors.academic_period?.message} />
                                )}
                            />
                            <FormTextInput id="name" label="Name" type="text" {...register('name')} error={errors.name?.message} />
                            <FormTextInput id="short_name" label="Short Name" type="text" {...register('short_name')} error={errors.short_name?.message} />

                            <div className="grid grid-cols-2 gap-4">
                                <Controller
                                    name="start_date"
                                    control={control}
                                    render={({ field }) => (
                                        <FormTextInput label="Start Date" type="date" {...field} error={errors.start_date?.message} />
                                    )}
                                />
                                <Controller
                                    name="end_date"
                                    control={control}
                                    render={({ field }) => (
                                        <FormTextInput label="End Date" type="date" {...field} error={errors.end_date?.message} />
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Controller
                                    name="start_midterm_exam"
                                    control={control}
                                    render={({ field }) => (
                                        <FormTextInput label="UTS Start" type="date" {...field} error={errors.start_midterm_exam?.message} />
                                    )}
                                />
                                <Controller
                                    name="end_midterm_exam"
                                    control={control}
                                    render={({ field }) => (
                                        <FormTextInput label="UTS End" type="date" {...field} error={errors.end_midterm_exam?.message} />
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Controller
                                    name="start_final_exam"
                                    control={control}
                                    render={({ field }) => (
                                        <FormTextInput label="UAS Start" type="date" {...field} error={errors.start_final_exam?.message} />
                                    )}
                                />
                                <Controller
                                    name="end_final_exam"
                                    control={control}
                                    render={({ field }) => (
                                        <FormTextInput label="UAS End" type="date" {...field} error={errors.end_final_exam?.message} />
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Controller
                                    name="number_of_meetings"
                                    control={control}
                                    render={({ field }) => (
                                        <FormTextInput label="Total Meetings" type="number" {...field} error={errors.number_of_meetings?.message} />
                                    )}
                                />
                                <Controller
                                    name="min_number_of_meetings"
                                    control={control}
                                    render={({ field }) => (
                                        <FormTextInput label="Min Meetings" type="number" {...field} error={errors.min_number_of_meetings?.message} />
                                    )}
                                />
                            </div>

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

                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <FormTextInput
                                        label="Description"
                                        type="textarea"
                                        placeholder="Enter a description"
                                        {...field}
                                        error={errors.description?.message}
                                    />
                                )}
                            />

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
