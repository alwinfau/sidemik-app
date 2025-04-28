import { Button } from '@/components/ui/button';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectItem } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import type { StudentType } from './Column';
import { Switch } from '@/components/ui/swicth';
import { Label } from '@/components/ui/label';

const ModalForm = ({
    open,
    onOpenChange,
    onSubmit,
    defaultValues,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: Omit<StudentType, 'id'>, id?: number) => void;
    defaultValues?: StudentType;
}) => {
    const [formData, setFormData] = useState<Omit<StudentType, 'id'>>({
        nim: '',
        fullname: '',
        midname: '',
        lastname: '',
        idcard: '',
        place_of_bird: '',
        date_of_bird: '',
        gender: null,
        addres_card: '',
        current_addres: '',
        country: '',
        province_id: '',
        regency_id: '',
        district_id: '',
        village_id: '',
        postal_code: '',
        religion: '',
        phone: '',
        email: '',
        hobby: '',
        student_path: '',
        status: null ,
        img_path: '',
    });

    useEffect(() => {
        if (defaultValues) {
            const { id, ...rest } = defaultValues;
            setFormData(rest);
        } else {
            setFormData({
                nim: '',
                fullname: '',
                midname: '',
                lastname: '',
                idcard: '',
                place_of_bird: '',
                date_of_bird: '',
                gender: null,
                addres_card: '',
                current_addres: '',
                country: '',
                province_id: '',
                regency_id: '',
                district_id: '',
                village_id: '',
                postal_code: '',
                religion: '',
                phone: '',
                email: '',
                hobby: '',
                student_path: '',
                status: null,
                img_path: '',
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

    const [enabled, setDisabled] = useState(false);

    const handleSwhichChange = (val: boolean) => {
    const statusValue = val ? 1 : 0;
    handleChange('status', statusValue);
    console.log('value: ', statusValue);
};


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-hidden p-6">
                <DialogHeader>
                    <DialogTitle>{defaultValues ? 'Edit Student' : 'Add Student'}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {/* Field lainnya */}
                            {Object.entries(formData).map(([key, value]) => {
                                if (key === 'gender' || key === 'status' || key === 'date_of_bird') return null;

                                let inputType: 'text' | 'number' = 'text';
                                if (typeof value === 'number') inputType = 'number';

                                return (
                                    <FormTextInput
                                        key={key}
                                        id={key}
                                        name={key}
                                        label={key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                                        type={inputType}
                                        value={value?.toString()}
                                        onChange={(value) => handleChange(key, value)}
                                        placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                                    />
                                );
                            })}
                            {/* Form Date Of Bird */}
                            <FormTextInput
                                id="date_of_bird"
                                name="date_of_bird"
                                label="Date of Birth"
                                type="date"
                                value={formData.date_of_bird}
                                onChange={(value) => handleChange('date_of_bird', value)}
                                placeholder="Select Date of Birth"
                            />

                            {/* Gender Select */}
                            <FormSelectInput
                                id="status"
                                name="Gender"
                                placeholder="Select Gender"
                                onChange={(value) => handleChange('gender', value)}
                                label='Gender'
                            >
                                <SelectItem value="L">Laki-Laki</SelectItem>
                                <SelectItem value="P">Prempuan</SelectItem>
                            </FormSelectInput>

                            {/* Status Switch */}
                            <Label>Status</Label>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="airplane-mode"
                                    checked={formData.status === 1}
                                    onCheckedChange={handleSwhichChange}
                                />
                                <Label htmlFor="airplane-mode">
                                    {formData.status === 1 ? "Aktif" : "Non Aktif"}
                                </Label>
                            </div>


                            <Button
                                type="submit"
                                className={`mb-5 rounded px-4 py-2 font-bold text-white ${
                                    defaultValues ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-700 hover:bg-green-600'
                                }`}
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
