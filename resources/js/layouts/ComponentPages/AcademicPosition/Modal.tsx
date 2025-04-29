import { Button } from '@/components/ui/button';
import { FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { AcademicPosition } from './Column';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: AcademicPosition;
};

const schema = z.object({
    academic_position_code: z.string().min(5),
    academic_position_name: z.string(),
    academic_position_types_id: z.number(),
});

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

    useEffect(() => {
        if (defaultValues) {
            reset({
                academic_position_code: defaultValues.academic_position_code || '',
                academic_position_name: defaultValues.academic_position_name || '',
                academic_position_types_id: defaultValues.academic_position_types_id || 1,
            });
        } else {
            reset({
                academic_position_code: '',
                academic_position_name: '',
                academic_position_types_id: 1,
            });
        }
    }, [defaultValues, reset]);

    const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
        await submit(data, defaultValues?.id);
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-hidden p-6">
                <DialogHeader>
                    <DialogTitle>{defaultValues ? 'Edit Academic Position' : 'Add Academic Position'}</DialogTitle>
                </DialogHeader>
                <ScrollArea>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <FormTextInput
                                id="academic_position_code"
                                type="text"
                                label="Academic Position Name"
                                placeholder="Enter Academic Position Name"
                                {...register('academic_position_name')}
                                error={errors.academic_position_name?.message}
                            />
                            <FormTextInput
                                id="academic_position_name"
                                type="text"
                                label="Academic Position Code"
                                placeholder="Enter Academic Position Code"
                                {...register('academic_position_code')}
                                error={errors.academic_position_code?.message}
                            />
                            <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-700 hover:bg-blue-600">
                                {defaultValues ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default ModalForm;
