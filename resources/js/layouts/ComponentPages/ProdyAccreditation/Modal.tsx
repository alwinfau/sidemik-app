import { Button } from '@/components/ui/button';
import DateInput from '@/components/ui/Components_1/DateInput';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectItem } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useProdiAccreditation } from './useProdiAccreditation';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};

const schema = z.object({
    accreditation_code: z.string().min(1),
    accreditation_name: z.string().min(1),
    accreditation_score: z.string().min(1),
    accr_cert_number: z.string().min(1),
    accr_cert_date: z.string(),
    valid_from: z.string(),
    valid_until: z.string(),
    certificate_url: z.string().url(),
    accreditation_agency_id: z.string(),
});

type FormInputs = z.infer<typeof schema>;

const ModalForm = ({ open, onOpenChange, submit, defaultValues }: ModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        control,
        formState: { errors, isSubmitting },
    } = useForm<FormInputs>({
        resolver: zodResolver(schema),
    });

    const { agencies, fetchAgency } = useProdiAccreditation();

    useEffect(() => {
        fetchAgency();
    }, []);

    useEffect(() => {
        if (defaultValues) {
            reset({
                accreditation_code: defaultValues.accreditation_code || '',
                accreditation_name: defaultValues.accreditation_name || '',
                accreditation_score: defaultValues.accreditation_score || '',
                accr_cert_number: defaultValues.accr_cert_number || '',
                accr_cert_date: defaultValues.accr_cert_date || '',
                valid_from: defaultValues.valid_from || '',
                valid_until: defaultValues.valid_until || '',
                certificate_url: defaultValues.certificate_url || '',
                accreditation_agency_id: String(defaultValues.accreditation_agency_id) || '0',
            });
        } else {
            reset({
                accreditation_code: '',
                accreditation_name: '',
                accreditation_score: '',
                accr_cert_number: '',
                accr_cert_date: '',
                valid_from: '',
                valid_until: '',
                certificate_url: '',
                accreditation_agency_id: '',
            });
        }
    }, [defaultValues, reset]);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const result = await submit(data, defaultValues?.id);
            if (result != null) {
                if (!isSubmitting && !defaultValues) {
                    reset({
                        accreditation_code: '',
                        accreditation_name: '',
                        accreditation_score: '',
                        accr_cert_number: '',
                        accr_cert_date: '',
                        valid_from: '',
                        valid_until: '',
                        certificate_url: '',
                        accreditation_agency_id: '',
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
                    <DialogTitle>{defaultValues ? 'Edit Prodi Accreditation' : 'Add Prodi Accreditation'}</DialogTitle>
                </DialogHeader>
                <DialogDescription>Silakan isi data akreditasi program studi dengan lengkap dan sesuai dokumen resmi.</DialogDescription>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mx-3 space-y-4">
                            <FormTextInput
                                id="accreditation_code"
                                label="Accreditation Code"
                                type="text"
                                {...register('accreditation_code')}
                                error={errors.accreditation_code?.message}
                                placeholder="Enter Accreditation Code"
                            />

                            <FormTextInput
                                id="accreditation_name"
                                label="Accreditation Name"
                                type="text"
                                {...register('accreditation_name')}
                                error={errors.accreditation_name?.message}
                                placeholder="Enter Accreditation Name"
                            />

                            <FormTextInput
                                id="accreditation_score"
                                label="Accreditation Score"
                                type="text"
                                {...register('accreditation_score')}
                                error={errors.accreditation_score?.message}
                                placeholder="Enter Accreditation Score"
                            />

                            <FormTextInput
                                id="accr_cert_number"
                                label="Certificate Number"
                                type="text"
                                {...register('accr_cert_number')}
                                error={errors.accr_cert_number?.message}
                                placeholder="Enter Certificate Number"
                            />

                            <DateInput
                                label="Certificate Date"
                                id="accr_cert_date"
                                placeholder="Enter Certificate Date"
                                register={register('accr_cert_date')}
                                error={errors.accr_cert_date}
                            />

                            <DateInput
                                label="Valid From"
                                id="valid_from"
                                placeholder="Enter Valid From"
                                register={register('valid_from')}
                                error={errors.valid_from}
                            />
                            <DateInput
                                label="Valid Until"
                                id="valid_until"
                                placeholder="Enter Valid Until"
                                register={register('valid_until')}
                                error={errors.valid_until}
                            />

                            <FormTextInput
                                id="certificate_url"
                                label="Certificate URL"
                                type="text"
                                {...register('certificate_url')}
                                error={errors.certificate_url?.message}
                                placeholder="Enter Certificate URL"
                            />

                            <Controller
                                name="accreditation_agency_id"
                                control={control}
                                rules={{ required: 'Agency is required' }}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="accreditation_agency_id"
                                        label="Accreditation Agency"
                                        value={String(field.value)}
                                        onValueChange={field.onChange}
                                        error={errors.accreditation_agency_id?.message}
                                    >
                                        {agencies.map((agency: any) => (
                                            <SelectItem key={agency.id} value={String(agency.id)}>
                                                {agency.accreditation_agency_name}
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
