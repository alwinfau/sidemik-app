import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useState } from 'react';

type ClassType = {
    id?: number;
    code: string;
    name: string;
    description: string;
    is_active: "true" | "false" | null;
};

type CreateModalProps = {
    onCreate: (data: Omit<ClassType, 'id'>) => void;
};

const CreateModal = ({ onCreate }: CreateModalProps) => {
    const [formData, setFormData] = useState<Omit<ClassType, 'id'>>({
        code: '',
        name: '',
        description: '',
        is_active: null,
    });

    const handleSubmit = () => {
        onCreate(formData);
    };

    const handleChange = (key: keyof typeof formData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const labelMapping: Record<string, string> = {
        code: 'Code',
        name: 'Name Class',
        description: 'Description',
        is_active: 'Status Class'
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className='bg-blue-600'>Create</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Class</DialogTitle>
                    <DialogDescription>Add New Class </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    {Object.keys(formData).map((key) => (
                        <div key={key} className="flex flex-col gap-1">
                            <Label>{labelMapping[key] || key.replace('_', ' ').toUpperCase()}</Label>
                            {key === 'is_active' ? (
                                <select
                                    className='rounded border p-2 w-full'
                                    value={formData.is_active || ""}
                                    onChange={(e) => handleChange(key as keyof typeof formData, e.target.value)}
                                >
                                    <option className='text-black' value="" disabled>Select</option>
                                    <option className='text-black' value="true">True</option>
                                    <option className='text-black' value="false">False</option>
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    className='rounded border p-2'
                                    value={formData[key as keyof typeof formData] as string}
                                    onChange={(e) => handleChange(key as keyof typeof formData, e.target.value)}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleSubmit}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateModal;
