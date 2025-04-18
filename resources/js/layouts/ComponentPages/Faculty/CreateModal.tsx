import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAxios } from '@/hooks/useAxios';
import { useState, useEffect } from 'react';

type AcademicPeriodType = {
    id: number;
    name: string;
};

type FakultasType = {
    id?: string;
    code: string;
    name: string;
    eng_name: string;
    short_name: string;
    address: string;
    telephone: string;
    academic_period_id: number | null;
    is_active: '1' | '0' | null;
    vision: string;
    mission: string;
    description: string;
};

type FacultyFormProps = {
    formData: Omit<FakultasType, 'id'>;
    setFormData: (data: Omit<FakultasType, 'id'>) => void;
    academicPeriods: AcademicPeriodType[];
    formErrors: Partial<Record<keyof Omit<FakultasType, 'id'>, string>>;
};


const labelMapping: Record<string, string> = {
    code: 'Code Faculty',
    name: 'Name Faculty (IDN)',
    eng_name: 'Name Faculty (EN)',
    short_name: 'Short Name Of Faculty',
    address: 'Faculty Address',
    telephone: 'Faculty Telephone Number',
    academic_period_id: 'Period Academic',
    is_active: 'Status Faculty',
    vision: 'Vision Faculty',
    mission: 'Mission Faculty',
    description: 'Description Faculty',
};


type CreateModalProps = {
    onCreate: (data: Omit<FakultasType, 'id'>) => void;
};

const CreateModal = ({ onCreate }: CreateModalProps) => {
    const { post, get } = useAxios();
    const [open, setOpen] = useState(false); 
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<Partial<Record<keyof Omit<FakultasType, 'id'>, string>>>({});
    const [formData, setFormData] = useState<Omit<FakultasType, 'id'>>({
        code: '',
        name: '',
        eng_name: '',
        short_name: '',
        address: '',
        telephone: '',
        academic_period_id: null,
        is_active: null,
        vision: '',
        mission: '',
        description: '',
    });

    const [academicPeriods, setAcademicPeriods] = useState<AcademicPeriodType[]>([]);

    useEffect(() => {
        const fetchAcademicPeriods = async () => {
            try {
                const res = await get('/academic-period');
                setAcademicPeriods(res.data.data);
            } catch (err) {
                console.error('Gagal fetch academic periods:', err);
            }
        };

        fetchAcademicPeriods();
    }, []);
    const getStatusLabel = (val: string | number): string =>
        val == 1 || val == '1' ? 'AKTIF' : 'NON AKTIF';
    
    const validateform =()=>{
        const errors: Partial<Record<keyof Omit <FakultasType, 'id'>, string>> = {};

        Object.entries(formData).forEach(([key, value]) =>{
            if (
                (typeof value === 'string' && value.trim()=='')||
                (value === null)
            ){
                errors[key as keyof Omit<FakultasType, 'id'>] = `${labelMapping[key]} is required`;
            }
        })
        setFormErrors(errors)
        return Object.keys(errors).length === 0;
    }


    const handleSubmit = async () => {
            if (!validateform()) return;
            try {
                const response = await post('/faculty', formData);
                onCreate(formData);
                setOpen(false);
                setErrorMessage(null);
                setFormErrors({}); 
            } catch (error: any) {
            console.error('Gagal membuat fakultas:', error);
            
            const metaMessage = error?.response?.data?.meta?.message;
            const fields = error?.response?.data?.data?.fields;
            const translatedFields = fields?.map((field: string) => labelMapping[field] || field);
            const cleanedMessage = metaMessage?.replace(/ in:.*$/, '') ?? '';
            const message = cleanedMessage
                ? `${cleanedMessage}${translatedFields ? ' (' + translatedFields.join(', ') + ')' : ''}`
                : 'Terjadi kesalahan';
    
            setErrorMessage(message);
        }
    };
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div className="flex w-full justify-start">
                <DialogTrigger asChild>
                    <Button variant="default" className="bg-blue-600">
                        Add Faculty
                    </Button>
                </DialogTrigger>
            </div>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create Faculty</DialogTitle>
                    <DialogDescription>Add New Faculty</DialogDescription>
                </DialogHeader>
                <FacultyForm
                    formData={formData}
                    setFormData={setFormData}
                    academicPeriods={academicPeriods}
                    formErrors={formErrors}
                />
                <DialogFooter className="flex flex-col items-start">
                    {errorMessage && (
                        <p className="text-red-600 text-sm mb-2">{errorMessage}</p>
                    )}
                    <Button type="button" onClick={handleSubmit}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


const FacultyForm = ({ formData, setFormData, academicPeriods, formErrors }: FacultyFormProps) => {
    const handleChange = (key: keyof Omit<FakultasType, 'id'>, value: string | number | null) => {
        setFormData({ ...formData, [key]: value });
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            <ScrollArea className="h-100 w-140">
                {Object.entries(formData).map(([key, value]) => {
                    if (key === 'is_active') {
                        return (
                            <div key={key} className="col-span-2">
                                <Label>{labelMapping[key]}</Label>
                                <select
                                    className="w-full rounded border p-2"
                                    value={value ?? ''}
                                    onChange={(e) => handleChange(key as keyof Omit<FakultasType, 'id'>, e.target.value)}
                                >
                                    <option className="text-black" value="">Pilih Status</option>
                                    <option className="text-black" value="1">AKTIF</option>
                                    <option className="text-black" value="0">NON AKTIF</option>
                                </select>
                                {formErrors[key as keyof Omit<FakultasType, 'id'>] && (
                                    <p className="text-red-500 text-sm">{formErrors[key as keyof Omit<FakultasType, 'id'>]}</p>
                                )}
                            </div>
                        );
                    }

                    if (key === 'academic_period_id') {
                        return (
                            <div key={key} className="col-span-2">
                                <Label>{labelMapping[key]}</Label>
                                <select
                                    className="w-full rounded border p-2"
                                    value={value ?? ''}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        handleChange(key as keyof Omit<FakultasType, 'id'>, val === '' ? null : parseInt(val));
                                    }}
                                >
                                    <option className="text-black" value="">Pilih Periode Akademik</option>
                                    {academicPeriods.map((period) => (
                                        <option key={period.id} className="text-black" value={period.id}>
                                            {period.name}
                                        </option>
                                    ))}
                                </select>
                                {formErrors[key as keyof Omit<FakultasType, 'id'>] && (
                                    <p className="text-red-500 text-sm">{formErrors[key as keyof Omit<FakultasType, 'id'>]}</p>
                                )}
                            </div>
                        );
                    }

                    if (['vision', 'mission', 'description'].includes(key)) {
                        return (
                            <div key={key} className="col-span-2">
                                <Label>{labelMapping[key]}</Label>
                                <textarea
                                    className="h-24 w-full rounded border p-2"
                                    value={value || ''}
                                    onChange={(e) => handleChange(key as keyof Omit<FakultasType, 'id'>, e.target.value)}
                                />
                                {formErrors[key as keyof Omit<FakultasType, 'id'>] && (
                                    <p className="text-red-500 text-sm">{formErrors[key as keyof Omit<FakultasType, 'id'>]}</p>
                                )}
                            </div>
                        );
                    }

                    return (
                        <div key={key} className="col-span-1">
                            <Label>{labelMapping[key]}</Label>
                            <input
                                type="text"
                                className="w-full rounded border p-2"
                                value={value || ''}
                                onChange={(e) => handleChange(key as keyof Omit<FakultasType, 'id'>, e.target.value)}
                            />
                            {formErrors[key as keyof Omit<FakultasType, 'id'>] && (
                                <p className="text-red-500 text-sm">{formErrors[key as keyof Omit<FakultasType, 'id'>]}</p>
                            )}
                        </div>
                    );
                })}
            </ScrollArea>
        </div>
    );
};

export default CreateModal;
