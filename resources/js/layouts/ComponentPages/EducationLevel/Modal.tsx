import { Button } from '@/components/ui/button';
import { FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};

const schema = z.object({
    education_level_code: z.string().min(3, 'Code harus lebih dari 3 karakter'),
    education_stages: z.string().min(5, 'Education Stages harus lebih dari 5 karakter'),
    education_stages_name_id: z.string().min(5, 'Nama harus lebih dari 5 karakter'),
    education_stages_name_en: z.string().min(5, 'Nama (EN) harus lebih dari 5 karakter'),
    education_stages_sequence: z.number().min(0),
    university_level: z.boolean(),
    postgraduate: z.boolean(),
    rpl_stages: z.boolean(),
});

type FormInputs = z.infer<typeof schema>;

const ModalForm = ({ open, onOpenChange, submit, defaultValues }: ModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormInputs>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (defaultValues) {
            reset({
                education_level_code: defaultValues.education_level_code || '',
                education_stages: defaultValues.education_stages || '',
                education_stages_name_id: defaultValues.education_stages_name_id || '',
                education_stages_name_en: defaultValues.education_stages_name_en || '',
                education_stages_sequence: defaultValues.education_stages_sequence || 0,
                university_level: Boolean(defaultValues.university_level) || false,
                postgraduate: Boolean(defaultValues.postgraduate) || false,
                rpl_stages: Boolean(defaultValues.rpl_stages) || false,
            });
        } else {
            reset({
                education_level_code: '',
                education_stages: '',
                education_stages_name_id: '',
                education_stages_name_en: '',
                education_stages_sequence: 0,
                university_level: false,
                postgraduate: false,
                rpl_stages: false,
            });
        }
    }, [defaultValues, reset]);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const result = await submit(data, defaultValues?.id);
            if (result != null) {
                if (!isSubmitting && !defaultValues) {
                    reset({
                        education_level_code: '',
                        education_stages: '',
                        education_stages_name_id: '',
                        education_stages_name_en: '',
                        education_stages_sequence: 0,
                        university_level: false,
                        postgraduate: false,
                        rpl_stages: false,
                    });
                }
            }
        } catch (error: any) {
            console.log(error.response.meta.message);
            setError('root', {
                type: 'manual',
                message: error.response.meta.message,
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-hidden p-6">
                <DialogHeader title="Education Level">
                    <DialogTitle>{defaultValues ? 'Edit Education Level' : 'Add Education Level'}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <FormTextInput
                                id="education_level_code"
                                label="Code"
                                type="text"
                                placeholder="Enter Code "
                                {...register('education_level_code')}
                                error={errors.education_level_code?.message}
                            />
                            <FormTextInput
                                id="education_stages"
                                label="Education Stages"
                                type="text"
                                placeholder="Enter Stages"
                                {...register('education_stages')}
                                error={errors.education_stages?.message}
                            />
                            <FormTextInput
                                id="education_stages_name_id"
                                label="Name (ID)"
                                placeholder="Enter Name"
                                type="text"
                                {...register('education_stages_name_id')}
                                error={errors.education_stages_name_id?.message}
                            />
                            <FormTextInput
                                id="education_stages_name_en"
                                label="Name (EN)"
                                placeholder="Enter Name Eng"
                                type="text"
                                {...register('education_stages_name_en')}
                                error={errors.education_stages_name_en?.message}
                            />
                            <FormTextInput
                                id="education_stages_sequence"
                                label="Sequence"
                                placeholder="Enter Sequence"
                                type="number"
                                {...register('education_stages_sequence', { valueAsNumber: true })}
                                error={errors.education_stages_sequence?.message}
                            />
                            <FormTextInput
                                id="university_level"
                                label="University Level"
                                type="checkbox"
                                {...register('university_level')}
                                className="h-4 w-4"
                            />

                            <FormTextInput
                                id="postgraduate"
                                label="Post Graduate"
                                type="checkbox"
                                {...register('postgraduate')}
                                className="h-4 w-4"
                            />

                            <FormTextInput id="rpl_stages" label="RPL Stages" type="checkbox" {...register('rpl_stages')} className="h-4 w-4" />
                            {errors.root && <p className="text-red-600">{errors.root.message}</p>}

                            <Button
                                type="submit"
                                className={`mb-5 rounded px-4 py-2 font-bold text-white ${
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
