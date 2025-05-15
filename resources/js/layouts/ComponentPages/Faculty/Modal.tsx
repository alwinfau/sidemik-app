import { Button } from '@/components/ui/button';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/swicth';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useFakultas } from './useFakultas';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};

const schema = z.object({
    code: z.string({message: 'Kode harus diisi'}).min(1, 'Code harus lebih dari 3 karakter'),
    name: z.string({message: 'Nama harus diisi'}).min(5, 'Name harus lebih dari 5 karakter'),
    eng_name: z.string({message: 'Nama harus diisi'}).min(5, 'English Name harus lebih dari 5 karakter'),
    short_name: z.string({message: 'Singkatan Wajib diisi'}),
    address: z.string().nullable(),
    telephone: z.string().max(15, 'Telephone harus kurang dari 15 karakter').nullable(),
    academic_period_id: z.string(),
    is_active: z.boolean(),
    vision: z.string().nullable(),
    mission: z.string().nullable(),
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
                is_active: Boolean(defaultValues.is_active) || true,
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
                is_active: true,
                vision: '',
                mission: '',
                description: '',
            });
        }
    }, [defaultValues, reset]);

    const { academicPeriods, fetchAcademicPeriods } = useFakultas();

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
                    is_active: true,
                    vision: '',
                    mission: '',
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
                            <Controller
                                name="academic_period_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="academic_period_id"
                                        label="Periode Akademik"
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
                            <FormTextInput
                                placeholder="Masukan Kode Fakultas"
                                id="code"
                                label="Fakultas Kode"
                                {...register('code')}
                                error={errors.code?.message}
                            />
                            <FormTextInput
                                placeholder="Masukan Nama Fakultas"
                                id="name"
                                label="Nama Fakultas"
                                {...register('name')}
                                error={errors.name?.message}
                            />
                            <FormTextInput
                                placeholder="Masukan Nama Fakultas (ENG)"
                                id="eng_name"
                                label="Nama Fakultas(ENG)"
                                {...register('eng_name')}
                                error={errors.eng_name?.message}
                            />
                            <FormTextInput
                                placeholder="Nama Singkat Fakultas"
                                id="short_name"
                                label="Singkatan Fakultas"
                                {...register('short_name')}
                                error={errors.short_name?.message}
                            />
                            <FormTextInput
                                placeholder="Masukan Alamat Fakultas"
                                id="address"
                                label="Alamat"
                                {...register('address')}
                                error={errors.address?.message}
                            />
                            <FormTextInput
                                placeholder="Masukan No telpon Fakultas"
                                id="telephone"
                                label="No Telphone"
                                {...register('telephone')}
                                error={errors.telephone?.message}
                            />

                            <FormTextInput
                                placeholder="Masukan Visi Fakultas"
                                id="vision"
                                type="textarea"
                                label="Visi"
                                {...register('vision')}
                                error={errors.vision?.message}
                            />
                            <FormTextInput
                                placeholder="Masukan Missi Fakultas"
                                id="mission"
                                type="textarea"
                                label="Missi"
                                {...register('mission')}
                                error={errors.mission?.message}
                            />
                            <FormTextInput
                                placeholder="Masukan Keterangan Fakultas"
                                id="description"
                                type="textarea"
                                label="Keterangan"
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
