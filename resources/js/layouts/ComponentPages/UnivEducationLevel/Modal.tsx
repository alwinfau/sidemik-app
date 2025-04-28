import { Button } from '@/components/ui/button';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectItem } from '@/components/ui/select';
import { useAxios } from '@/hooks/useAxios';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};


const schema = z.object({
    edu_level_code: z.string().min(3, 'Code harus lebih dari 3 Karakter'),
    edu_study_period: z.string().min(3, 'Education Study harus lebih dari 3 Karakter'),
    max_cuti_in_sem: z.coerce.number().positive('Nomor Harus lebih dari 0'),
    max_studi_in_sem: z.coerce.number().positive('Nomor Harus lebih dari 0'),
    univ_edulevel_description: z.string().min(5, 'Description Harus Lebih dari 5 karakter'),
    education_levels_id: z.string()
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

    const { get } = useAxios();

    const [Level, setLevel] = useState<any>([]);

    const fecthLevel = async () => {
        try {
            const res: any = await get('/education-level');
            setLevel(res.data.data);
        } catch (err) {
            console.error('Error fetching:', err);
        }
    }
    useEffect(() => {
        fecthLevel();
    },)
    useEffect(() =>{
        if(defaultValues){
            reset({
                edu_level_code: defaultValues.edu_level_code || '',
                edu_study_period: defaultValues.edu_study_period || '',
                max_cuti_in_sem: defaultValues.max_cuti_in_sem || 0,
                max_studi_in_sem: defaultValues.max_studi_in_sem || 0,
                univ_edulevel_description: defaultValues.univ_edulevel_description || '',
                education_levels_id: String(defaultValues.education_levels_id) || '0',
            })
        }else {
            reset({
                edu_level_code: '',
                edu_study_period: '',
                max_cuti_in_sem: 0,
                max_studi_in_sem: 0,
                univ_edulevel_description: '',
                education_levels_id: '',
            })
        }
    }, [defaultValues, reset])
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const result = await submit(data, defaultValues?.id);
            console.log(data)
            if (result != null) {
                if (!isSubmitting && !defaultValues) {
                    reset({
                    edu_level_code: '',
                    edu_study_period: '',
                    max_cuti_in_sem: 0,
                    max_studi_in_sem: 0,
                    univ_edulevel_description: '',
                    education_levels_id: '',
                    });
                }
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
                    <DialogTitle>{defaultValues ? 'Edit Univ Education Level' : 'Add Univ Education Level'}</DialogTitle>
                </DialogHeader>
                <DialogDescription>Silakan isi data Univ Edu Level dengan lengkap dan sesuai dokumen resmi.</DialogDescription>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mx-3 space-y-4">
                            <FormTextInput
                                id="edu_level_code"
                                label=" Code"
                                type="text"
                                {...register('edu_level_code')}
                                error={errors.edu_level_code?.message}
                            />
                                <FormTextInput
                                id="edu_study_period"
                                label=" Edu Study Period"
                                type="text"
                                {...register('edu_study_period')}
                                error={errors.edu_study_period?.message}
                            />
                               <FormTextInput id="max_cuti_in_sem" label="Max Cuti" type="number" {...register('max_cuti_in_sem')} error={errors.max_cuti_in_sem?.message} />

                                <FormTextInput
                                id="max_studi_in_sem"
                                label="Max Studi"
                                type="number"
                                {...register('max_studi_in_sem')}
                                error={errors.max_studi_in_sem?.message}
                            />
                                <FormTextInput
                                id="univ_edulevel_description"
                                label="Description"
                                type="textarea"
                                {...register('univ_edulevel_description')}
                                error={errors.univ_edulevel_description?.message}
                            />

                            <Controller
                                name="education_levels_id"
                                control={control}
                                rules={{ required: 'Education Level is required' }}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="education_levels_id"
                                        label="Education Level"
                                        value={String(field.value)}
                                        onValueChange={field.onChange}
                                        error={errors.education_levels_id?.message}
                                    >
                                        {Level.map((Level: any) => (
                                            <SelectItem key={Level.id} value={String(Level.id)}>
                                                {Level.education_stages}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />

                            {errors.root && <p className="text-red-600">{errors.root.message}</p>}
                            <Button
                                type="submit"
                                className={`mb-5 rounded px-4 py-2 font-bold text-white ${defaultValues ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-500 hover:bg-green-600'} `}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : defaultValues ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
export default ModalForm
