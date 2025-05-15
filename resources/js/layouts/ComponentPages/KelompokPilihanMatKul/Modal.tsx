import { Button } from '@/components/ui/button';
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
import { useMatkulPilihan } from './usePilihanMatKul';
import { LoaderCircle } from 'lucide-react';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};

const schema = z.object({
    code: z.string({ message: 'Kode harus diisi' }).min(1, 'Code harus lebih dari 1 kata'),
    name: z.string({ message: 'Nama harus diisi' }),
    is_active: z.boolean(),
    description: z.string().nullable(),
    study_program_id: z.string(),
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
                description: defaultValues.description || '',
                is_active: Boolean(defaultValues.is_active) || true,
                study_program_id: String(defaultValues.study_program_id) || '',
            });
        } else {
            reset({
                code: '',
                name: '',
                description: '',
                is_active: true,
                study_program_id: '',
            });
        }
    }, [defaultValues, reset]);

    const { Prodi, fecthRelasi } = useMatkulPilihan();

    useEffect(() => {
        fecthRelasi();
    }, []);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const result = await submit(data, defaultValues?.id);
            if (result != null && !isSubmitting && !defaultValues) {
                reset({
                    code: '',
                    name: '',
                    description: '',
                    is_active: true,
                    study_program_id: '',
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
                    <DialogTitle>{defaultValues ? 'Edit Mata Kuliah Pilihan' : 'Add Mata Kuliah Pilihan'}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <Controller
                                name="study_program_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="study_program_id"
                                        label="Prodi"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.study_program_id?.message}
                                    >
                                        {Prodi.map((Study: any) => (
                                            <SelectItem key={Study.id} value={String(Study.id)}>
                                                {Study.idn_sp_name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />
                            <FormTextInput
                                id="code"
                                label="Kode"
                                placeholder="Masukan Kode Matkul pilihan"
                                {...register('code')}
                                error={errors.code?.message}
                            />
                            <FormTextInput
                                id="name"
                                label="Nama Mata Kuliah Pilihan"
                                placeholder="Masukan Nama kelompok Mata Kuliah Pilihan"
                                {...register('name')}
                                error={errors.name?.message}
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
