import { Button } from '@/components/ui/button';
import { FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useState } from 'react';
import { EmployeeDocumentType } from './Column';

const ModalForm = ({
    open,
    onOpenChange,
    onSubmit,
    defaultValues,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: Omit<EmployeeDocumentType, 'id'>, id?: number) => void;
    defaultValues?: EmployeeDocumentType;
}) => {
    const [formData, setFormData] = useState({
        document_type_id: 0,
        employee_id: 0,
        document_url: '',
    });

    useEffect(() => {
        if (defaultValues) {
            const { id, ...rest } = defaultValues;
            setFormData(rest);
        } else {
            setFormData({
                document_type_id: 0,
                employee_id: 0,
                document_url: '',
            });
        }
    }, [defaultValues, open]);

    const handleChange = (name: string, value: string | number) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData, defaultValues?.id);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max=h-[90vh] overflow-hidden p-6">
                <DialogHeader>
                    <DialogTitle>{defaultValues ? 'Edit Document' : 'Add Document'}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <FormTextInput
                                id="document_type_id"
                                name="document_type_id"
                                type="number"
                                label="Document Type ID"
                                value={formData.document_type_id}
                                onChange={(value) => handleChange('document_type_id', value)}
                                placeholder="Document Type ID"
                            />
                            <FormTextInput
                                id="employee_id"
                                name="employee_id"
                                type="text"
                                label="Employee ID"
                                value={formData.employee_id}
                                onChange={(value) => handleChange('employee_id', value)}
                                placeholder="Employee ID"
                            />
                            <FormTextInput
                                id="document_url"
                                name="document_url"
                                type="text"
                                label="Document URL"
                                value={formData.document_url}
                                onChange={(value) => handleChange('document_url', value)}
                                placeholder="Document URL"
                            />

                            <Button
                                type="submit"
                                className={`mb-5 rounded px-4 py-2 font-bold text-white ${defaultValues ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-600'} `}
                            >
                                {defaultValues ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default ModalForm;
