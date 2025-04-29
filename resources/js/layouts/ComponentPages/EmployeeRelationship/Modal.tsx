import { Button } from '@/components/ui/button';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectItem } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { EmployeeRelationship } from './Column';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: EmployeeRelationship;
};

const schema = z.object({
    code: z.string().min(5),
    name: z.string(),
    employee_relationship_status: z.enum(['True', 'False']),
    pns_status: z.enum(['True', 'False']),
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
                code: defaultValues.code || '',
                name: defaultValues.name || '',
                employee_relationship_status: defaultValues.employee_relationship_status || 'True',
                pns_status: defaultValues.pns_status || 'True',
            });
        } else {
            reset({
                code: '',
                name: '',
                employee_relationship_status: 'True',
                pns_status: 'True',
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
                    <DialogTitle>Employee Relationship</DialogTitle>
                </DialogHeader>
                <ScrollArea>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4 px-2">
                            <FormTextInput id="code" type="text" label="Code" placeholder="Code" {...register('code')} error={errors.code?.message} />
                            <FormTextInput id="name" type="text" label="Name" placeholder="Name" {...register('name')} error={errors.name?.message} />

                            <Controller
                                control={control}
                                name="employee_relationship_status"
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="employee_relationship_status"
                                        label="Employee Relationship Status"
                                        value={String(field.value)}
                                        onValueChange={(val) => field.onChange(val === 'true')}
                                        error={errors.employee_relationship_status?.message || ''}
                                    >
                                        <SelectItem value="true">True</SelectItem>
                                        <SelectItem value="false">False</SelectItem>
                                    </FormSelectInput>
                                )}
                            />
                            <Controller
                                control={control}
                                name="pns_status"
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="pns_status"
                                        label="PNS Status"
                                        value={String(field.value)}
                                        onValueChange={(val) => field.onChange(val === 'true')}
                                        error={errors.pns_status?.message || ''}
                                    >
                                        <SelectItem value="true">True</SelectItem>
                                        <SelectItem value="false">False</SelectItem>
                                    </FormSelectInput>
                                )}
                            />
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button
                                type="submit"
                                className={`rounded px-4 py-2 font-bold text-white ${defaultValues ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-500 hover:bg-green-600'}`}
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
// export default ModalForm;a
