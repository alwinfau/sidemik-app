import { Button } from '@/components/ui/button';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectItem } from '@/components/ui/select';
import { useAxios } from '@/hooks/useAxios';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};

const schema = z.object({
    accreditation_code: z.string(),
    accreditation_name: z.string().min(1),
    accreditation_score: z.string(),
    accr_cert_number: z.string(),
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

    const { get } = useAxios();

    const [agencies, setAgencies] = useState<any>([]);

    const fetchAgency = async () => {
        try {
            const res: any = await get('/accreditation-agency');
            setAgencies(res.data.data);
        } catch (err) {
            console.error('Error fetching:', err);
        }
    };

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
            setError('root', {
                type: 'manual',
                message: error?.response?.meta?.message || 'Something went wrong',
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-hidden p-6">
                <DialogHeader>
                    <DialogTitle>{defaultValues ? 'Edit Academic Years' : 'Add Academic Years'}</DialogTitle>
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
                            />

                            <FormTextInput
                                id="accreditation_name"
                                label="Accreditation Name"
                                type="text"
                                {...register('accreditation_name')}
                                error={errors.accreditation_name?.message}
                            />

                            <FormTextInput
                                id="accreditation_score"
                                label="Accreditation Score"
                                type="text"
                                {...register('accreditation_score')}
                                error={errors.accreditation_score?.message}
                            />

                            <FormTextInput
                                id="accr_cert_number"
                                label="Certificate Number"
                                type="text"
                                {...register('accr_cert_number')}
                                error={errors.accr_cert_number?.message}
                            />

                            <div>
                                <div className="mb-2">
                                    <label htmlFor="accr_cert_date">Accreditation Date</label>
                                </div>
                                <div className="rounded border p-3">
                                    <input type="date" {...register('accr_cert_date')} id="accr_cert_date" aria-label="accr_cert_date" />
                                </div>
                                {errors.accr_cert_date?.message}
                            </div>

                            <div>
                                <div className="mb-2">
                                    <label htmlFor="valid_from">Valid From</label>
                                </div>
                                <div className="rounded border p-3">
                                    <input type="date" {...register('valid_from')} id="valid_from" aria-label="valid_from" />
                                </div>
                                {errors.valid_from?.message}
                            </div>

                            <div>
                                <div className="mb-2">
                                    <label htmlFor="valid_until">Valid Until</label>
                                </div>
                                <div className="rounded border p-3">
                                    <input type="date" {...register('valid_until')} id="valid_until" aria-label="valid_until" />
                                </div>
                                {errors.valid_until?.message}
                            </div>

                            <FormTextInput
                                id="certificate_url"
                                label="Certificate URL"
                                type="text"
                                {...register('certificate_url')}
                                error={errors.certificate_url?.message}
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
