import { Button } from '@/components/ui/button';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectItem } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { DocumentType } from './Column';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: DocumentType;
};

const schema = z.object({
    document_type_code: z.string().min(5),
    document_name: z.string().min(5),
    document_type: z.string(),
    document_descrtiption: z.string().min(5),
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
                document_type_code: defaultValues.document_type_code || '',
                document_name: defaultValues.document_name || '',
                document_type: defaultValues.document_type || '',
                document_descrtiption: defaultValues.document_descrtiption || '',
            });
        } else {
            reset({
                document_type_code: '',
                document_name: '',
                document_type: '',
                document_descrtiption: '',
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
                    <DialogTitle>{defaultValues ? 'Edit Document Type' : 'Add Document Type'}</DialogTitle>
                </DialogHeader>
                <ScrollArea>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4 px-2">
                            <FormTextInput
                                id="document_type_code"
                                type="text"
                                label="Document Type Code"
                                placeholder="Document Type Code"
                                error={errors.document_type_code?.message}
                                {...register('document_type_code')}
                            />
                            <FormTextInput
                                id="document_name"
                                type="text"
                                label="Document Type Name"
                                placeholder="Document Type Name"
                                error={errors.document_name?.message}
                                {...register('document_name')}
                            />
                            <Controller
                                control={control}
                                name="document_type"
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="type"
                                        label="Document Type"
                                        error={errors.document_type?.message}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectItem value="PDF">PDF</SelectItem>
                                        <SelectItem value="Word">Word</SelectItem>
                                        <SelectItem value="Excel">Excel</SelectItem>
                                    </FormSelectInput>
                                )}
                            />
                            <FormTextInput
                                id="document_descrtiption"
                                type="text"
                                label="Description"
                                placeholder="Description"
                                error={errors.document_descrtiption?.message}
                                {...register('document_descrtiption')}
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
