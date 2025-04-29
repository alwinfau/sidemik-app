import { Button } from '@/components/ui/button';
import { FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ActiveStatus } from './Column';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: ActiveStatus;
};

const schema = z.object({
    active_status_code: z.string().min(5),
    active_status_name: z.string(),
    active_status_description: z.string().nullable(),
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
                active_status_code: defaultValues.active_status_code || '',
                active_status_name: defaultValues.active_status_name || '',
                active_status_description: defaultValues.active_status_description || '',
            });
        } else {
            reset({
                active_status_code: '',
                active_status_name: '',
                active_status_description: '',
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
                    <DialogTitle>{defaultValues ? 'Edit Active Status' : 'Create Active Status'}</DialogTitle>
                </DialogHeader>
                <ScrollArea>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4 px-2">
                            <FormTextInput
                                id="active_status_code"
                                type="text"
                                label="Active Status Code"
                                placeholder="Enter Active Status Code"
                                {...register('active_status_code')}
                                error={errors.active_status_code?.message}
                            />
                            <FormTextInput
                                id="active_status_name"
                                type="text"
                                label="Active Status Name"
                                placeholder="Enter Active Status Name"
                                {...register('active_status_name')}
                                error={errors.active_status_name?.message}
                            />
                            <FormTextInput
                                id="active_status_description"
                                type="text"
                                label="Active Status Description"
                                placeholder="Enter Active Status Description"
                                {...register('active_status_description')}
                                error={errors.active_status_description?.message}
                            />

                            <Button
                                type="submit"
                                className={`mb-5 rounded px-4 py-2 font-bold text-white ${defaultValues ? 'bg-blue-600 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}`}
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
