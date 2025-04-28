import { Button } from '@/components/ui/button';
import { FormTextInput, FormSelectInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectItem } from '@/components/ui/select';
import { useAxios } from '@/hooks/useAxios';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { Controller, Form, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { EmployeeDocumentType } from './Column';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: EmployeeDocumentType;
};

const schema = z.object({
    document_type_id: z.string(),
    employee_id: z.string(),
    document_url: z.string().url(),
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
    const [documentTypes, setDocumentTypes] = useState<any>([]);
    const [employees, setEmployees] = useState<any>([]);
    const fetchDocumentTypes = async () => {
        try {
            const res: any = await get('/document-types');
            setDocumentTypes(res.data.data);
        } catch (err) {
            console.error('Error fetching document types:', err);
        }
    };
    
    const fetchEmployees = async () => {
        try {
            const res: any = await get('/employees');
            setEmployees(res.data.data);
        } catch (err) {
            console.error('Error fetching employees:', err);
        }
    };
    
    
    useEffect(() => {
        fetchDocumentTypes();
        fetchEmployees();
    }, []);

    useEffect(() => {
        if (defaultValues) {
            reset({
                document_type_id:String(defaultValues.document_type_id) || '',
                employee_id: String(defaultValues.employee_id) || '',
                document_url: defaultValues.document_url || '',
            });
        } else {
            reset({
                document_type_id: '',
                employee_id: '',
                document_url: '',
            });
        }
    }, [defaultValues, reset]);

    const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
        try {
            const result = await submit(data, defaultValues?.id);
            if (result != null) {
                if (!isSubmitting && !defaultValues) {
                    reset({
                        document_type_id: '',
                        employee_id: '',
                        document_url: '',
                    });
                }
            }
        } catch (error: any) {
            setError('root', 
                { type: 'manual',
               message: error.response.data.message || 'Failed to submit data' },            
            );
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-hidden p-6">
                
                <DialogHeader>
                    <DialogTitle>{defaultValues ? "Edit Employee Document" : "Add Employee Document"}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="mx-3 space-y-4">

                            <FormTextInput
                                id='document_type_id'
                                type='text'
                                label="Document URL"
                                placeholder="Document URL"
                                error={errors.document_url?.message}
                                {...register('document_url')}
                            />

                            <Controller
                                control={control}
                                name="document_type_id"
                                rules={{ required: "Document Type is required" }}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="document_type_id"
                                        label="Document Type"
                                        value={String(field.value)}
                                        onValueChange={field.onChange}
                                        error={errors.document_type_id?.message}
                                    >
                                        {documentTypes.map((DocumentType:any) => (
                                            <SelectItem key={DocumentType.id} value={String(DocumentType.id)}>
                                                {DocumentType.document_name}
                                            </SelectItem>
                                        ))}

                                    </FormSelectInput>

                                )}
                            />

                            <Controller
                                control={control}
                                name="employee_id"
                                rules={{ required: "Employee is required" }}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="employee_id"
                                        label="Employee"
                                        value={String(field.value)}
                                        onValueChange={field.onChange}
                                        error={errors.employee_id?.message}
                                    >
                                        {employees.map((Employee:any) => (
                                            <SelectItem key={Employee.id} value={String(Employee.id)}>
                                                {Employee.name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />

                            {errors.root && (
                                <div className="text-red-500 text-sm">
                                    {errors.root.message}
                                </div>
                            )}
                            <Button
                                type="submit"
                                className={`mb-5 rounded px-4 py-2 font-bold text-white ${defaultValues ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-500 hover:bg-green-600'} `}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <LoaderCircle className=" h-4 w-4 animate-spin" /> : defaultValues ? "Update" : "Create"}
                            </Button>

                        </div>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

export default ModalForm;
              
                      
    