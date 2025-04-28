import { Button } from '@/components/ui/button';
import { FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ProvinceType } from './Column';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};

const schema = z.object({
    name: z.string().min(5, 'Nama harus lebih dari 5 karakter'),
    description: z.string().nullable().optional(),
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
                name: defaultValues.name || '',
                description: defaultValues.description || '',
            });
        } else {
            reset({
                    name: '',
                    description:  '',
            });
        }
    }, [defaultValues, reset]);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
        const result = await submit(data, defaultValues?.id);
            if (result != null) {
                if (!isSubmitting && !defaultValues) {
                    reset({
                        name: '',
                        description:  '',
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
    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-hidden p-6">
                <DialogHeader title='Course Type'>
                    <DialogTitle>{defaultValues ? 'Edit Province' : 'Add Province'}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <FormTextInput
                                id="name"
                                label="Name"
                                type="text"
                                {...register('name')}
                                error={errors.name?.message}
                            />
                            <FormTextInput
                                id="description"
                                label="Description"
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
    )
}

export default ModalForm;