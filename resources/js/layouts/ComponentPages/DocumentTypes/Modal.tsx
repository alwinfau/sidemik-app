import { Button } from '@/components/ui/button';
import { FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { DocumentType } from './Column';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};

const schema = z.object({
    document_type_code: z.string().min(3, 'Code harus lebih dari 3 karakter'),
    document_name: z.string().min(5, 'Nama harus lebih dari 5 karakter'),
    document_type: z.string().min(3, 'Tipe dokumen harus lebih dari 3 karakter'),
    document_description: z.string().nullable().optional(),
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
                document_type_code: defaultValues.document_type_code || '',
                document_name: defaultValues.document_name || '',
                document_type: defaultValues.document_type || '',
                document_description: defaultValues.document_description || '',
            });
        } else {
            reset({
                document_type_code:'',
                    document_name: '',
                    document_type:'',
                    document_description:  '',
            });
        }
    }, [defaultValues, reset]);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
        const result = await submit(data, defaultValues?.id);
            if (result != null) {
                if (!isSubmitting && !defaultValues) {
                    reset({
                        document_type_code:'',
                        document_name: '',
                        document_type:'',
                        document_description:  '',
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
                    <DialogTitle>{defaultValues ? 'Edit Course Group' : 'Add Course Group'}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                        <FormTextInput
                                id="document_type_code"
                                label="Document Type Code"
                                type="text"
                                {...register('document_type_code')}
                                error={errors.document_type_code?.message}
                            />
                            <FormTextInput
                                id="document_name"
                                label="Document Name"
                                type="text"
                                {...register('document_name')}
                                error={errors.document_name?.message}
                            />
                            <FormTextInput
                                id="document_type"
                                label="Document Type"
                                type="text"
                                {...register('document_type')}
                                error={errors.document_type?.message}
                            />
                            <FormTextInput
                                id="document_description"
                                label="Document Description"
                                type="textarea"
                                {...register('document_description')}
                                error={errors.document_description?.message}
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