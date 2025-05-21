import { Button } from '@/components/ui/button';
import { FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import DateInput from '@/components/ui/Components_1/DateInput';
import dayjs from 'dayjs';
import { LoaderCircle } from 'lucide-react';
import { AcademicYearType } from './Column';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/swicth';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: AcademicYearType;
};

const schema = z.object({
    name: z.string().min(2, 'Nama harus lebih dari 2 karakter'),
    start_date: z.string(),
    end_date: z.string(),
    description: z.string().nullable(),
    is_active : z.boolean()
});

type FormInputs = z.infer<typeof schema>;

const ModalForm = ({ open, onOpenChange, submit, defaultValues }: ModalProps) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        control,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormInputs>({
        resolver: zodResolver(schema),
    });

    const name = watch('name');
    useEffect(() => {
        if (name && /^\d{4}\/\d{4}$/.test(name)) {
            const [startYearStr] = name.split('/');
            const startYear = parseInt(startYearStr);
            const startDate = `${startYear}-01-01`;
            const endDate = `${startYear + 1}-01-01`;
            setValue('start_date', startDate);
            setValue('end_date', endDate);
        }
    }, [name, setValue]);
    

    useEffect(() => {
        if (defaultValues) {
            reset({
                name: defaultValues.name || '',
                start_date: defaultValues.start_date,
                end_date: defaultValues.end_date,
                description: defaultValues.description || '',
                is_active: Boolean(defaultValues.is_active) || false
            });
        } else {
            reset({
                name: `${dayjs().year()}/${dayjs().year() + 1}`,
                start_date: '',
                end_date: '',
                description: '',
                is_active: false,
            });
        }
    }, [defaultValues, reset]);
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const result = await submit(data, defaultValues?.id);
            if (result != null) {
                if (!isSubmitting && !defaultValues) {
                    reset({
                        name: '',
                        start_date: '',
                        end_date: '',
                        description: '',
                        is_active: false,
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
                    <DialogTitle>{defaultValues ? 'Edit Tahun Akademik' : 'Tambah Tahun Akademik'}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Tahun ajaran *
                            </label>
                            <Select
                                defaultValue={watch('name') || `${dayjs().year()}/${dayjs().year() + 1}`}
                                onValueChange={(value) => setValue('name', value)}
                            >
                                <SelectTrigger>
                                <SelectValue placeholder="Pilih Tahun Ajaran" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value={`${dayjs().year()}/${dayjs().year() + 1}`}>
                                    {dayjs().year()}/{dayjs().year() + 1}
                                </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
                        </div>

                            <DateInput
                                label="Tanggal Mulai *"
                                id="start_date"
                                placeholder="Enter Certificate Date"
                                register={register('start_date')}
                                error={errors.start_date}
                            />
                            <DateInput
                                label="Tanggal Selesai *"
                                id="end_date"
                                placeholder="Enter Valid From"
                                register={register('end_date')}
                                error={errors.end_date}
                            />
                            <FormTextInput
                                id="description"
                                label="Keterangan"
                                placeholder="Masukan keterangan dari tahun akademik"
                                type="textarea"
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
