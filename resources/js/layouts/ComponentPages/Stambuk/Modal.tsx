import { Button } from '@/components/ui/button';
import DateInput from '@/components/ui/Components_1/DateInput';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectItem } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
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
    ukt: z.number({ message: 'Masukan jumlah UKT' }),
    description: z.string().nullable(),
    curriculums_id: z.string(),
    study_programs_id: z.string(),
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
                curriculums_id: String(defaultValues.curriculums_id) || '0',
                study_programs_id: String(defaultValues.study_programs_id) || '0',
            });
        } else {
            reset({
                year: '',
                name: '',
                ukt: 0,
                description: '',
                curriculums_id: '',
                study_programs_id: '',
            });
        }
    }, [defaultValues, reset]);
    const { Curriculum, Prodi, fectRelasi } = useStambuk();

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

                            <FormTextInput
                                id="name"
                                label="Nama Stambuk"
                                placeholder="Masukan nama stambuk"
                                {...register('name')}
                                error={errors.name?.message}
                            />
                            <Controller
                                name="study_programs_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="study_programs_id"
                                        label="Prodi"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.study_programs_id?.message}
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
                                id="ukt"
                                label="UKT"
                                placeholder="Masukan Jumlah Ukt"
                                type="number"
                                {...register('ukt', { valueAsNumber: true })}
                                error={errors.ukt?.message}
                            />
                            <Controller
                                name="curriculums_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="curriculums_id"
                                        label="Tahun Kurikulum"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.curriculums_id?.message}
                                    >
                                        {Curriculum.map((Curi: any) => (
                                            <SelectItem key={Curi.id} value={String(Curi.id)}>
                                                {Curi.code}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />
                            {/* <FormTextInput
                                    id="description"
                                    label="Keterangan"
                                    type="textarea"
                                    {...register('description')}
                                    error={errors.description?.message}
                                /> */}
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
