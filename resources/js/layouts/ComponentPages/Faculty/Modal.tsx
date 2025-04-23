import { Button } from '@/components/ui/button';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
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
    name: z.string().min(5, 'Name harus lebih dari 5 karakter'),
    eng_name: z.string().min(5, 'English Name harus lebih dari 5 karakter'),
    short_name: z.string().min(3, 'Short Name harus lebih dari 5 karakter'),
    address: z.string(),
    telephone: z.string().max(15, 'Telephone harus kurang dari 15 karakter'),
    academic_period_id: z.string(),
    is_active: z.boolean(),
    vision: z.string(),
    mission: z.string(),
    description: z.string(),
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
                code: defaultValues.code || '',
                name: defaultValues.name || '',
                eng_name: defaultValues.eng_name || '',
                short_name: defaultValues.short_name || '',
                address: defaultValues.address || '',
                telephone: defaultValues.telephone || '',
                academic_period_id: String(defaultValues.academic_period_id) || '0',
                is_active: defaultValues.is_active || false,
                vision: defaultValues.vision || '',
                mission: defaultValues.mission || '',
                description: defaultValues.description || '',
            });
        } else {
            reset({
                code: '',
                name: '',
                eng_name: '',
                short_name: '',
                address: '',
                telephone: '',
                academic_period_id: '',
                is_active: false,
                vision: '',
                mission: '',
                description: '',
            });
        }
    }, [defaultValues, reset]);

    const { get } = useAxios();
    const [academicPeriods, setAcademicPeriods] = useState<any[]>([]);

    const fetchAcademicPeriods = async () => {
        try {
            const res: any = await get('/academic-period');
            setAcademicPeriods(res.data.data);
        } catch (err) {
            console.error('Error fetching academic periods:', err);
        }
    };
    useEffect(() => {
        fetchAcademicPeriods();
    }, []);
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const result = await submit(data, defaultValues?.id);
            if (result != null && !isSubmitting && !defaultValues) {
                reset({
                    code: '',
                    name: '',
                    eng_name: '',
                    short_name: '',
                    address: '',
                    telephone: '',
                    academic_period_id: '',
                    is_active: false,
                    vision: '',
                    mission: '',
                    description: '',
                });
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
                    <DialogTitle>{defaultValues ? 'Edit Faculty' : 'Add Faculty'}</DialogTitle>
                </DialogHeader>
                <DialogDescription>Silakan isi data fakultas secara lengkap dan akurat.</DialogDescription>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mx-3 space-y-4">
                            <FormTextInput id="code" label="Faculty Code" {...register('code')} error={errors.code?.message} />
                            <FormTextInput id="name" label="Faculty Name" {...register('name')} error={errors.name?.message} />
                            <FormTextInput id="eng_name" label="English Name" {...register('eng_name')} error={errors.eng_name?.message} />
                            <FormTextInput id="short_name" label="Short Name" {...register('short_name')} error={errors.short_name?.message} />
                            <FormTextInput id="address" label="Address" {...register('address')} error={errors.address?.message} />
                            <FormTextInput id="telephone" label="Telephone" {...register('telephone')} error={errors.telephone?.message} />
                            
                            <Controller
                                name="academic_period_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="academic_period_id"
                                        label="Academic Period"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.academic_period_id?.message}
                                    >
                                        {academicPeriods.map((period: any) => (
                                            <SelectItem key={period.id} value={String(period.id)}>
                                                {period.name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />

                            <div className="flex items-center space-x-4">
                                <Label htmlFor="is_active">Active</Label>
                                <Controller
                                    name="is_active"
                                    control={control}
                                    render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                                />
                            </div>

                            <FormTextInput id="vision" type='textarea' label="Vision" {...register('vision')} error={errors.vision?.message} />
                            <FormTextInput id="mission" type='textarea' label="Mission" {...register('mission')} error={errors.mission?.message} />
                            <FormTextInput id="description" type='textarea' label="Description" {...register('description')} error={errors.description?.message} />

                            {errors.root && <p className="text-red-600">{errors.root.message}</p>}

                            <Button
                                type="submit"
                                className={`mb-5 rounded px-4 py-2 font-bold text-white ${
                                    defaultValues ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-500 hover:bg-green-600'
                                }`}
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
