import { Button } from '@/components/ui/button';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/swicth';
import { useAxios } from '@/hooks/useAxios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCurriculum } from './useCurriculum';
import DateInput from '@/components/ui/Components_1/DateInput';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};

const schema = z.object({
    code: z.string({message: 'Code Harus Diisi'}).min(1, 'Code Harus lebih dari 1 karakter'),
    curriculum_year: z.string({message: 'Tahun Kurikulum Wajib Diisi'}),
    sks_required: z.number({message: 'SKS wajib Diisi'}).positive('SKS harus diisi dengan bilangan positive'),
    sks_elective: z.number({message: 'SKS wajib Diisi'}).positive('SKS harus diisi dengan bilangan positive'),
    // description: z.string().nullable(),
    study_programs_id: z.string({message: 'Prodi wajib diisi'})
})

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
        if(defaultValues){
            reset({
                code: defaultValues.code || '',
                curriculum_year: defaultValues.curriculum_year || '',
                sks_required: defaultValues.sks_required || 0,
                sks_elective:defaultValues.sks_elective || 0,
                // description: defaultValues.description || '',
                study_programs_id: String(defaultValues.study_programs_id) || ''
            })
        }else{
            reset({
                code: '',
                curriculum_year: '',
                sks_required: 0,
                sks_elective: 0,
                // description: '',
                study_programs_id: ''
            })
        }
    }, [defaultValues,reset])

    const {Prodi,  fecthRelasi} = useCurriculum();

    useEffect(() => {
        fecthRelasi();
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

    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-hidden p-6">
                <DialogHeader>
                    <DialogTitle>{defaultValues ? 'Edit Kurikulum' : 'Add Kurikulum'}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4 px-2">
                            <FormTextInput
                                id="code"
                                placeholder='Masukan Kode Kurikulum'
                                label="code"
                                {...register('code')}
                                error={errors.code?.message}
                            />
                                <DateInput
                                label="Tahun Kurikulum"
                                id="curriculum_year"
                                placeholder="Masukan Tahun Kurikulum"
                                register={register('curriculum_year')}
                                error={errors.curriculum_year}
                            />
                            <FormTextInput
                                id="sks_required"
                                label="SKS Wajib"
                                type="number"
                                {...register('sks_required', { valueAsNumber: true })}
                                error={errors.sks_required?.message}
                            />
                            <FormTextInput
                                id="sks_elective"
                                label="SKS Pilihan"
                                type="number"
                                {...register('sks_elective', { valueAsNumber: true })}
                                error={errors.sks_elective?.message}
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
                            {/* <FormTextInput
                                id="description"
                                label="Keterangan"
                                type="textarea"
                                {...register('description')}
                                error={errors.description?.message}
                            />  */}
                            
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
    )
}
export default ModalForm;