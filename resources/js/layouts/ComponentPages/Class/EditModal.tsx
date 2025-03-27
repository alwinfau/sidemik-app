import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

type ClassType = {
    id: number;
    code: string;
    name: string;
    description: string;
    is_active: 'true' | 'false' | null;
};

type EditModalProps = {
    data: ClassType;
    onUpdated: (updatedData: ClassType) => void;
};

const EditModal = ({ data, onUpdated }: EditModalProps) => {
    const [formData, setFormData] = useState<ClassType>(data);

    const handleChange = (key: keyof ClassType, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = () => {
        onUpdated(formData);
    };

    const labelMapping: Record<string, string> = {
        code: 'Code',
        name: 'Name Class',
        description: 'Description',
        is_active: 'Status Class',
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="bg-yellow-600">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Class</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    {Object.keys(formData).map((key) => (
                        <div key={key} className="flex flex-col gap-1">
                            <Label>{labelMapping[key] || key.replace('_', ' ').toUpperCase()}</Label>

                            {key === 'is_active' ? (
                                <select
                                    className="w-full rounded border p-2"
                                    value={formData.is_active || ''}
                                    onChange={(e) => handleChange(key as keyof ClassType, e.target.value)}
                                >
                                    <option className="text-black" value="" disabled>
                                        Select
                                    </option>
                                    <option className="text-black" value="true">
                                        True
                                    </option>
                                    <option className="text-black" value="false">
                                        False
                                    </option>
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    className="rounded border p-2"
                                    value={formData[key as keyof ClassType] as string}
                                    onChange={(e) => handleChange(key as keyof ClassType, e.target.value)}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleSubmit}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditModal;
