import { Button } from '@/components/ui/button';
import { FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { FakultasType } from './Column';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/swicth';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<FakultasType, 'id'>, id?: number) => void;
    defaultValues?: FakultasType;
};

const schema = z.object({
    code: z.string().min(4, 'Kode minimal 4 karakter'),
    name: z.string().min(5, 'Nama minimal 5 karakter'),
    eng_name: z.string().min(5, 'Nama Inggris minimal 5 karakter'),
    short_name: z.string().min(3, 'Singkatan minimal 3 karakter'),
    address: z.string().min(5, 'Alamat minimal 5 karakter'),
    telephone: z.string().max(13, 'Nomor telepon maksimal 13 digit'),
    is_active: z.boolean(),
    vision: z.string().min(10, 'Visi minimal 10 karakter'),
    mission: z.string().min(10, 'Misi minimal 10 karakter'),
    description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
});

type FormInputs = z.infer<typeof schema>;

const ModalForm = ({ open, onOpenChange, submit, defaultValues }: ModalProps) => {
    const [status, setStatus] = useState<boolean>(defaultValues?.is_active ?? false);

    const {
        register,
        reset,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormInputs>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
            setStatus(defaultValues.is_active);
        } else {
            reset({
                code: '',
                name: '',
                eng_name: '',
                short_name: '',
                address: '',
                telephone: '',
                is_active: false,
                vision: '',
                mission: '',
                description: '',
            });
            setStatus(false);
        }
    }, [defaultValues, reset]);

    useEffect(() => {
        
        setValue('is_active', status);
    }, [status, setValue]);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        
        const formData = {
            ...data,
            is_active: status, 
        };
        console.log('Form submitted with data:', formData); 
        await submit(formData, defaultValues?.id); 
        onOpenChange(false); 
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-hidden p-6">
                <DialogHeader>
                    <DialogTitle>{defaultValues ? 'Edit Fakultas' : 'Tambah Fakultas'}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4 px-2">
                            <FormTextInput id="code" label="Kode Fakultas" {...register('code')} error={errors.code?.message} />
                            <FormTextInput id="name" label="Nama Fakultas" {...register('name')} error={errors.name?.message} />
                            <FormTextInput id="eng_name" label="Nama Inggris" {...register('eng_name')} error={errors.eng_name?.message} />
                            <FormTextInput id="short_name" label="Singkatan" {...register('short_name')} error={errors.short_name?.message} />
                            <FormTextInput id="address" label="Alamat" {...register('address')} error={errors.address?.message} />
                            <FormTextInput id="telephone" label="No Telepon" {...register('telephone')} error={errors.telephone?.message} />

                            <Label>Status</Label>
                            <div className="flex items-center gap-4">
                                <Switch checked={status} onCheckedChange={setStatus} id="is_active" />
                                <Label htmlFor="is_active">{status ? 'Aktif' : 'Non Aktif'}</Label>
                            </div>

                            <FormTextInput id="vision" label="Visi" type="textarea" {...register('vision')} error={errors.vision?.message} />
                            <FormTextInput id="mission" label="Misi" type="textarea" {...register('mission')} error={errors.mission?.message} />
                            <FormTextInput id="description" label="Deskripsi" type="textarea" {...register('description')} error={errors.description?.message} />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button
                                type="submit"
                                className={`rounded px-4 py-2 font-bold text-white ${
                                    defaultValues ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-600 hover:bg-green-500'
                                }`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? defaultValues
                                        ? 'Updating...'
                                        : 'Creating...'
                                    : defaultValues
                                    ? 'Update'
                                    : 'Create'}
                            </Button>
                        </div>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default ModalForm;
