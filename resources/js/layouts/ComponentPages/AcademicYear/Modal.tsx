import { Button } from '@/components/ui/button';
import { FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { AcademicYearType } from './Column';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: AcademicYearType;
};

const schema = z.object({
    academic_year: z.string(),
    name: z.string().min(5, "Nama harus lebih dari 5 karakterz"),
    start_date: z.string(),
    end_date: z.string(),
    description: z.string(),
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
                academic_year: defaultValues.academic_year || '',
                name: defaultValues.name || '',
                start_date: defaultValues.start_date || '',
                end_date: defaultValues.end_date || '',
                description: defaultValues.description || '',
            });
        } else {
            reset({
                academic_year: '',
                name: '',
                start_date: '',
                end_date: '',
                description: '',
            });
        }
    }, [defaultValues, reset]);
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const result = await submit(data, defaultValues?.id);
            if (result != null) {
                if (!isSubmitting && !defaultValues) {
                    reset({
                        academic_year: '',
                        name: '',
                        start_date: '',
                        end_date: '',
                        description: '',
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
                <DialogHeader>
                    <DialogTitle>{defaultValues ? 'Edit Academic Years' : 'Add Academic Years'}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <FormTextInput
                                id="academic_year"
                                label="Academic Year"
                                type="text"
                                {...register('academic_year')}
                                error={errors.name?.message}
                            />

                            <FormTextInput id="name" label="name" type="text" {...register('name')} error={errors.name?.message} />

                            {/* SEMENTARA INPUT DATE */}
                            <div>
                                <div className="mb-2">
                                    <label htmlFor="start_date">Start Date</label>
                                </div>
                                <div className="rounded border p-3">
                                    <input type="date" {...register('start_date')} id="start_date" aria-label="start_date" />
                                </div>
                            </div>

                            {/* SEMENTARA INPUT DATE */}
                            <div>
                                <div className="mb-2">
                                    <label htmlFor="end_date">End Date</label>
                                </div>
                                <div className="rounded border p-3">
                                    <input type="date" {...register('end_date')} id="end_date" aria-label="end_date" />
                                </div>
                            </div>

                            <FormTextInput
                                id="description"
                                label="description"
                                type="textarea"
                                {...register('description')}
                                error={errors.description?.message}
                            />

                            {errors.root && <p className="text-red-600">{errors.root.message}</p>}

                            <Button
                                type="submit"
                                className={`mb-5 rounded px-4 py-2 font-bold text-white ${defaultValues ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-500 hover:bg-green-600'} `}
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