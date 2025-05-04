import { Button } from '@/components/ui/button';
import { FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/swicth';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};

const schema = z.object({
    code: z.string().min(5),
    name: z.string(),
    employment_relationship_status: z.boolean(),
    pns_status: z.boolean(),
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

    useEffect(() => {
        if (defaultValues) {
            reset({
                code: defaultValues.code || '',
                name: defaultValues.name || '',
                employment_relationship_status: Boolean(defaultValues.employment_relationship_status) || false,
                pns_status: Boolean(defaultValues.pns_status) || false,
            });
        } else {
            reset({
                code: '',
                name: '',
                employment_relationship_status: false,
                pns_status: false,
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
                        employment_relationship_status: false,
                        pns_status: false,
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
                    <DialogTitle>Employee Relationship</DialogTitle>
                </DialogHeader>
                <ScrollArea>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4 px-2">
                            <FormTextInput id="code" type="text" label="Code" placeholder="Code" {...register('code')} error={errors.code?.message} />
                            <FormTextInput id="name" type="text" label="Name" placeholder="Name" {...register('name')} error={errors.name?.message} />

                            <Controller
                                defaultValue={false}
                                name="employment_relationship_status"
                                control={control}
                                render={({ field }) => <Switch checked={field.value} onCheckedChange={(checked) => field.onChange(checked)} />}
                            />

                            <Controller
                                defaultValue={false}
                                name="pns_status"
                                control={control}
                                render={({ field }) => <Switch checked={field.value} onCheckedChange={(checked) => field.onChange(checked)} />}
                            />
                        </div>
                        <div className="flex gap-3 pt-2">
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
