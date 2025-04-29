import { Button } from '@/components/ui/button';
import { FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { AccreditationagencyType } from './Column';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: AccreditationagencyType;
};

const schema = z.object({
    accreditation_agency_code: z.string().min(3, 'Code Harus Lebih Dari 3 Karakter'),
    accreditation_agency_name: z.string().min(5, 'Nama Harus Lebih Dari 5 Karakter'),
    website_url: z.string().url(),
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
                accreditation_agency_code: defaultValues.accreditation_agency_code || '',
                accreditation_agency_name: defaultValues.accreditation_agency_name || '',
                website_url: defaultValues.website_url || '',
            });
        } else {
            reset({
                accreditation_agency_code: '',
                accreditation_agency_name: '',
                website_url: '',
            });
        }
    }, [defaultValues, reset]);
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const result = await submit(data, defaultValues?.id);
            if (result != null) {
                if (!isSubmitting && !defaultValues) {
                    reset({
                        accreditation_agency_code: '',
                        accreditation_agency_name: '',
                        website_url: '',
                    });
                }
            }
        } catch (error: any) {
            const errorsData = error?.data;
            let lastErrorMessage = '';
            let firstErrorMessage = error?.meta?.message;
            console.log(error);

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
                    <DialogTitle>{defaultValues ? 'Edit Accreditation agency' : 'Add Accreditation agency'}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <FormTextInput
                                id="accreditation_agency_code"
                                label="Code"
                                placeholder="Masukan Code"
                                type="text"
                                {...register('accreditation_agency_code')}
                                error={errors.accreditation_agency_code?.message}
                            />
                            <FormTextInput
                                id="accreditation_agency_name"
                                label="Accreditation Agency Name"
                                placeholder="Masukan nama agensi"
                                type="text"
                                {...register('accreditation_agency_name')}
                                error={errors.accreditation_agency_name?.message}
                            />
                            <FormTextInput
                                id="website_url"
                                label="URL Agency Website"
                                placeholder="Masukan link website"
                                type="text"
                                {...register('website_url')}
                                error={errors.website_url?.message}
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
