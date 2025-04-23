import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { string, z } from 'zod';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/swicth';
import { useAxios } from '@/hooks/useAxios';
import { SelectItem } from '@/components/ui/select';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};

const schema = z.object({
    code: z.string().min(3, 'Code harus lebih dari 3 karakter'),
    academic_year_id: z.string().min(1, 'Academic Year wajib diisi'),
    academic_period: z.string().nullable(),
    name: z.string().min(5, 'Name harus lebih dari 5 karakter'),
    short_name: z.string().min(3, 'Short Name harus lebih dari 3 karakter'),
    start_date: z.string().nullable(),
    end_date: z.string().nullable(),
    start_midterm_exam: z.string().nullable(),
    end_midterm_exam: z.string().nullable(),
    start_final_exam: z.string().nullable(),
    end_final_exam: z.string().nullable(),
    number_of_meetings: z
        .number({ invalid_type_error: 'Harus berupa angka' })
        .positive('Angka harus di atas 0'),
    min_number_of_meetings: z
        .number({ invalid_type_error: 'Harus berupa angka' })
        .positive('Angka harus di atas 0'),
    is_active: z.boolean(),
    description: z.string().nullable(),
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

    const {get} = useAxios();

    const [AcademicYears, setAcademicYears] = useState<any>([]);

    const fecthAcademicYears = async () => {
        try {
            const res: any = await get('/academic-year');
            console.log(res.data.data);     
            if (Array.isArray(res.data.data)) {
                setAcademicYears(res.data.data);
            } else {
                console.error('Data tidak valid:', res.data.data);
            }
        } catch (err) {
            console.error('Error fetching', err);
        }
    };
    
    
    useEffect(() => {
        fecthAcademicYears();
    }, []);


    useEffect(() => {
        if (defaultValues) {
            reset({
                code: defaultValues.code || '',
                academic_year_id: String(defaultValues.academic_year_id) || '0',
                academic_period: '',
                name: defaultValues.name || '',
                short_name: defaultValues.short_name || '',
                start_date: '',
                end_date: '',
                start_midterm_exam: '',
                end_midterm_exam: '',
                start_final_exam: '',
                end_final_exam: '',
                number_of_meetings: defaultValues.number_of_meetings || 0,
                min_number_of_meetings: defaultValues.min_number_of_meetings || 0,
                is_active: defaultValues.is_active || false,
                description: defaultValues.description || '',
            });
        } else {
            reset({
                code: '',
                academic_year_id: '',
                academic_period: '',
                name: '',
                short_name: '',
                start_date: '',
                end_date: '',
                start_midterm_exam: '',
                end_midterm_exam: '',
                start_final_exam: '',
                end_final_exam: '',
                number_of_meetings: 0,
                min_number_of_meetings: 0,
                is_active: false,
                description: '',
            });
            }
        }, [defaultValues, reset]);      

        const onSubmit: SubmitHandler<FormInputs> = async (data) => {
            try {
            const payload = {
                ...data,
                is_active: data.is_active ? 1 : 0,
                academic_period: data.academic_period || null,
                start_date: data.start_date || null,
                end_date: data.end_date || null,
                start_midterm_exam: data.start_midterm_exam || null,
                end_midterm_exam: data.end_midterm_exam || null,
                start_final_exam: data.start_final_exam || null,
                end_final_exam: data.end_final_exam || null,
                description: data.description || null,
            };
        
            console.log('Kirim ke server:', payload);
        
            const result = await submit(payload, defaultValues?.id);
            if (result != null && !isSubmitting && !defaultValues) {
                reset({
                code: '',
                academic_year_id: '',
                academic_period: '',
                name: '',
                short_name: '',
                start_date: '',
                end_date: '',
                start_midterm_exam: '',
                end_midterm_exam: '',
                start_final_exam: '',
                end_final_exam: '',
                number_of_meetings: 0,
                min_number_of_meetings: 0,
                is_active: false,
                description: '',
                });
            }
            } catch (error: any) {
            console.error('Submit error:', error.response?.data || error.message);
            setError('root', {
                type: 'manual',
                message: error.response?.data?.message || 'Terjadi kesalahan saat mengirim data',
            });
            }
        };
        

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-hidden p-6">
                <DialogHeader title='Academic Period'>
                    <DialogTitle>{defaultValues ? 'Edit Academic Period' : 'Add Academic Period'}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <FormTextInput
                                id="code"
                                label="Code"
                                type="text"
                                {...register('code')}
                                error={errors.code?.message}
                            />

                            <Controller
                                name="academic_period"
                                control={control}
                                render={({ field }) => (
                                    <FormTextInput 
                                        id='academic_period'
                                        label="Academic Period" 
                                        type="date" {...field} 
                                        error={errors.academic_period?.message} 
                                    />
                                )}
                            />
                            <FormTextInput 
                                id="name" 
                                label="Name" 
                                type="text" 
                                {...register('name')} 
                                error={errors.name?.message} 
                            />
                            <FormTextInput id="short_name" label="Short Name" type="text" {...register('short_name')} error={errors.short_name?.message} />

                            <div className="grid grid-cols-2 gap-4">
                                <Controller
                                    name="start_date"
                                    control={control}
                                    render={({ field }) => (
                                        <FormTextInput 
                                            label="Start Date" 
                                            type="date" {...field} 
                                            error={errors.start_date?.message} 
                                            id='start_date'
                                            />
                                    )}
                                />
                                <Controller
                                    name="end_date"
                                    control={control}
                                        render={({ field }) => (
                                            <FormTextInput 
                                            label="End Date" 
                                            type="date" {...field} 
                                            id = 'end_date'
                                            error={errors.end_date?.message} 
                                        />
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Controller
                                    name="start_midterm_exam"
                                    control={control}
                                    render={({ field }) => (
                                        <FormTextInput 
                                            label="UTS Start" 
                                            id='start_midterm_exam'
                                            type="date" {...field} 
                                            error={errors.start_midterm_exam?.message} 
                                        />
                                    )}
                                />
                                <Controller
                                    name="end_midterm_exam"
                                    control={control}
                                    render={({ field }) => (
                                        <FormTextInput id='end_midterm_exam' label="UTS End" type="date" {...field} error={errors.end_midterm_exam?.message} />
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Controller
                                    name="start_final_exam"
                                    control={control}
                                    render={({ field }) => (
                                        <FormTextInput id='start_final_exam' label="UAS Start" type="date" {...field} error={errors.start_final_exam?.message} />
                                    )}
                                    />
                                <Controller
                                    name="end_final_exam"
                                    control={control}
                                    render={({ field }) => (
                                        <FormTextInput id='end_final_exam' label="UAS End" type="date" {...field} error={errors.end_final_exam?.message} />
                                    )}
                                />
                            </div>

                            <FormTextInput
                                id="number_of_meetings"
                                label="Number Of Meetings"
                                type="number"
                                {...register('number_of_meetings', { valueAsNumber: true })}
                                error={errors.number_of_meetings?.message}
                            />
                            <FormTextInput
                                id="min_number_of_meetings"
                                label="Min Number Of Meetings"
                                type="number"
                                {...register('min_number_of_meetings', { valueAsNumber: true })}
                                error={errors.min_number_of_meetings?.message}
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

                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <FormTextInput
                                        id='description'
                                        label="Description"
                                        type="textarea"
                                        placeholder="Enter a description"
                                        {...field}
                                        error={errors.description?.message}
                                        />
                                )}
                            />

                            <Controller
                                name="academic_year_id"
                                control={control}
                                rules={{ required: 'Academic is required' }}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="academic_year_id"
                                        label="Academic Year"
                                        value={String(field.value)}
                                        onValueChange={field.onChange}
                                        error={errors.academic_year_id?.message}
                                    >
                                        {AcademicYears.map((AcademicYears: any) => (
                                            <SelectItem key={AcademicYears.id} value={String(AcademicYears.id)}>
                                                {AcademicYears.name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
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
