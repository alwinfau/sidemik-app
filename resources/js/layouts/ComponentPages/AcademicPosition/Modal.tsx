import { Button } from '@/components/ui/button';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectItem } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAcademicPosition } from './useAcademicPosition';
type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};

const schema = z.object({
    academic_position_code: z.string().min(3),
    academic_position_name: z.string().min(5),
    academic_positions_types_id: z.string(),
    
});

type FormInputs = z.infer<typeof schema>;

const ModalForm = ({ open, onOpenChange, submit, defaultValues }: ModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const { AcademicPositionType, fetchAcademicPositionTypes } = useAcademicPosition();

    useEffect(() => {
        fetchAcademicPositionTypes();
        
    }, []);

    useEffect(() => {
        if (defaultValues) {
            reset({
                academic_position_code: defaultValues.academic_position_code || '',
                academic_position_name: defaultValues.academic_position_name || '',
                academic_positions_types_id: String(defaultValues.academic_positions_types_id) || '1',
            });
        } else {
            reset({
                academic_position_code: '',
                academic_position_name: '',
                academic_positions_types_id: '',

            });
        }
    }, [defaultValues, reset]);


    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const result = await submit(data, defaultValues?.id);
            if (result != null) {
                if (!isSubmitting && !defaultValues) {
                    reset({
                        academic_position_code: '',
                        academic_position_name: '',
                        academic_positions_types_id: '',  
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
                    <DialogTitle>{defaultValues ? 'Edit Academic Position' : 'Add Academic Position'}</DialogTitle>
                    <DialogTitle>{defaultValues ? 'Edit Academic Position' : 'Add Academic Position'}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mx-3 space-y-4">
                            <FormTextInput
                                id="academic_position_code"
                                label="code position academic"
                                type='text'
                                {...register('academic_position_code')}
                                error={errors.academic_position_code?.message}
                               
                            />
                            <FormTextInput
                                id="academic_position_name"
                                label="name position academic"
                                type='text'
                                {...register('academic_position_name')}
                                error={errors.academic_position_name?.message}
                               
                            />

                            <Controller
                                name='academic_positions_types_id'
                                control={control}
                                rules={{ required: 'academic_positions_type_id is required' }}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id='academic_positions_type_id'
                                        label='type position academic'
                                        value={String(field.value)}
                                        onValueChange={field.onChange}
                                        error={errors.academic_positions_types_id?.message}
                                    >
                                        {AcademicPositionType.map((AcademicPositionTypesPages: any) => (
                                            <SelectItem key={AcademicPositionTypesPages.id} value={String(AcademicPositionTypesPages.id)}>
                                                {AcademicPositionTypesPages.job_type_name}
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
                                {isSubmitting ? `Loading...` : defaultValues ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default ModalForm;

