import { Button } from '@/components/ui/button';
import { FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { LoaderCircle } from 'lucide-react';
import { CourseType } from './Column';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: CourseType;
};

const schema = z.object({
    code: z.string({ message: 'Kode Harus diisi' }).min(1, 'Code harus lebih dari 1 Krakter'),
    name: z.string({ message: 'Jenis Mata Kuliah Harus diisi' }),
    description: z.string().nullable(),
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
                code: defaultValues.code || '',
                name: defaultValues.name || '',
                description: defaultValues.description || '',
            });
        } else {
            reset({
                code: '',
                name: '',
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
                        code: '',
                        name: '',
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
                <DialogHeader title="Jenis Mata Kuliah">
                    <DialogTitle>{defaultValues ? 'Edit Jenis Mata Kuliah' : 'Add Jenis Mata Kuliah'}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <FormTextInput
                                id="code"
                                placeholder="Masukan Kode Jenis Mata Kuliah"
                                label={<> Kode <span className="text-red-500">*</span></>}
                                type="text"
                                {...register('code')}
                                error={errors.code?.message}
                            />
                            <FormTextInput
                                id="name"
                                placeholder="Masukan Jenis Mata Kuliah"
                                label={<> Jenis Mata Kuliah <span className="text-red-500">*</span></>}
                                type="text"
                                {...register('name')}
                                error={errors.name?.message}
                            />
                            {/* <FormTextInput
                                id="description"
                                label="description"
                                type="textarea"
                                {...register('description')}
                                error={errors.description?.message}
                            /> */}

                            {errors.root && <p className="text-red-600">{errors.root.message}</p>}

                            <Button
                                type="submit"
                                className={`mb-5 rounded px-4 py-2 font-bold text-white ${
                                    defaultValues ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-500 hover:bg-green-600'
                                }`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : defaultValues ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default ModalForm;
