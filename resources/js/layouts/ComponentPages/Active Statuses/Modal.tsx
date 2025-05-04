import { Button } from '@/components/ui/button';
import { FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { Switch } from '@/components/ui/swicth';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Label } from '@/components/ui/label';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};

const schema = z.object({
    active_status_code: z.string().min(5),
    active_status_name: z.boolean(),
    active_status_description: z.string(),
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
                active_status_code: defaultValues.active_status_code || '',
                active_status_name: Boolean (defaultValues.active_status_name) || false,
                active_status_description: defaultValues.active_status_description || '',
            });
        } else {
            reset({
                active_status_code: '',
                active_status_name: false,
                active_status_description: '',
            });
        }
    }, [defaultValues, reset]);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const result = await submit(data, defaultValues?.id);
            if (result != null) {
                if (!isSubmitting && !defaultValues) {
                    reset({
                        active_status_code: '',
                        active_status_name: false,
                        active_status_description: '',
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
                    <DialogTitle>{defaultValues ? 'Edit Academic Years' : 'Add Academic Years'}</DialogTitle>
                </DialogHeader>
                <DialogDescription>Silakan isi status active.</DialogDescription>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mx-3 space-y-4">
                            <FormTextInput
                                id="active_status_code"
                                label="Active Status Code"
                                type="text"
                                {...register('active_status_code')}
                                error={errors.active_status_code?.message}
                            />

                            <FormTextInput
                                id="active_status_description"
                                label="Active Status Description"
                                type="text"
                                {...register('active_status_description')}
                                error={errors.active_status_description?.message}
                            />

                            <div className="flex items-center space-x-4">
                                <Label htmlFor='active_status_name'>Status Active</Label>
                                <Controller
                                    defaultValue={false}
                                    name="active_status_name"
                                    control={control}
                                    render={({ field }) => <Switch checked={field.value} onCheckedChange={(checked) => field.onChange(checked)} />}
                                />
                            </div>

                            {errors.root && <p className="text-red-600">{errors.root.message}</p>}

                            <Button
                                type="submit"
                                className={`mb-3 rounded px-4 py-2 font-bold text-white ${defaultValues ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-500 hover:bg-green-600'} `}
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

// import { Button } from "@/components/ui/button";
