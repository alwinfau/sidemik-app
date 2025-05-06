import DateInput from '@/components/ui/Components_1/DateInput';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useStambuk } from './useStambuk';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};
const schema = z.object({
    year: z.string(),
    name: z.string({ message: 'Nama Wajib diisi' }).min(3, 'Nama wajib lebih dari 3 kata'),
    ukt: z.string(),
    description: z.string().nullable(),
    curriculum_years_id: z.string(),
    studi_programs_id: z.string()
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
                year: defaultValues.year || '',
                name: defaultValues.name || '',
                ukt: defaultValues.ukt || '',
                description: defaultValues.description || '',
                curriculum_years_id: String(defaultValues.curriculum_years_id) || '0',
                studi_programs_id: String(defaultValues.studi_programs_id) || '0',
            });
        } else {
            reset({
                year: '',
                name: '',
                ukt: '',
                description: '',
                curriculum_years_id: '',
                studi_programs_id: ''
            });
        }
    }, [defaultValues, reset]);
    const { CuriculumYears, Prodi, fectRelasi } = useStambuk();

    useEffect(() => {
        fectRelasi();
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
                    <DialogTitle>{defaultValues ? 'Edit Stambuk' : 'Add Stambuk'}</DialogTitle>
                </DialogHeader>
                <DialogDescription>Silakan isi data Stambuk dengan lengkap dan valid.</DialogDescription>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mx-3 space-y-4">
                            <DateInput
                                label="Tahun Stambuk"
                                id="year"
                                placeholder="Masukan Tahun Stambuk"
                                register={register('year')}
                                error={errors.year}
                            />
                        </div>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
