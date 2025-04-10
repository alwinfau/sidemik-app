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
import { useState, useEffect } from 'react';
import { useAxios } from '@/hooks/useAxios';

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
    vission: string;
    mission: string;
    description: string;
};

type EditModalProps = {
    data: FakultasType;
    onUpdate: (data: FakultasType) => void;
};

const labelMapping: Record<string, string> = {
    code: 'Code Faculty',
    name: 'Name Faculty',
    eng_name: 'Name Faculty (EN)',
    short_name: 'Short Name Of Faculty',
    address: 'Faculty Address',
    telephone: 'Faculty Telephone Number',
    academic_period_id: 'Period Academic',
    is_active: 'Status Faculty',
    vission: 'Vision Faculty',
    mission: 'Mission Faculty',
    description: 'Description Faculty',
};

const EditModal = ({ data, onUpdate }: EditModalProps) => {
    const { put, get } = useAxios();
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<FakultasType>(data);
    const [academicPeriods, setAcademicPeriods] = useState<AcademicPeriodType[]>([]);

    useEffect(() => {
        setFormData(data); 
    }, [data]);

    const handleChange = (key: keyof FakultasType, value: any) => {
        setFormData((prev) => ({
        ...prev,
        [key]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
        if (!formData.id) {
            throw new Error('ID fakultas tidak ditemukan');
        }

        const payload = {
            code: formData.code,
            name: formData.name,
            eng_name: formData.eng_name,
            short_name: formData.short_name,
            address: formData.address,
            telephone: formData.telephone,
            academic_period_id: formData.academic_period_id ? Number(formData.academic_period_id) : null,
            is_active: formData.is_active === '1' ? 1 : 0,
            vission: formData.vission,
            mission: formData.mission,
            description: formData.description,
        };
        await put(`/faculty/${formData.id}`, payload);
        onUpdate(formData);
        setOpen(false);
        } catch (error: any) {
            console.error('Gagal update fakultas:', error?.response?.data || error.message || error);
        }
    };

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

    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="default" className="bg-yellow-600">
            Edit
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
            <DialogTitle>Edit Faculty</DialogTitle>
            <DialogDescription>Update Faculty Information</DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-100 w-140">
            {Object.entries(formData)
                .filter(([key]) => key in labelMapping)
                .map(([key, value]) => {
                if (key === 'is_active') {
                    return (
                    <div key={key} className="col-span-2">
                        <Label>{labelMapping[key]}</Label>
                        <select
                        className="w-full rounded border p-2"
                        value={value ?? ''}
                        onChange={(e) => handleChange(key as keyof FakultasType, e.target.value)}
                        >
                        <option value="">Pilih Status</option>
                        <option value="1">AKTIF</option>
                        <option value="0">NON AKTIF</option>
                        </select>
                    </div>
                    );
                }

                if (key === 'academic_period_id') {
                    return (
                    <div key={key}>
                        <Label>{labelMapping[key]}</Label>
                        <select
                        className="w-full rounded border p-2"
                        value={value ?? ''}
                        onChange={(e) =>
                            handleChange(key as keyof FakultasType, parseInt(e.target.value) || null)
                        }
                        >
                        <option value="">Pilih Periode Akademik</option>
                        {academicPeriods.map((period) => (
                            <option key={period.id} value={period.id}>
                            {period.name}
                            </option>
                        ))}
                        </select>
                    </div>
                    );
                }

                if (['vission', 'mission', 'description'].includes(key)) {
                    return (
                    <div key={key} className="col-span-2">
                        <Label>{labelMapping[key]}</Label>
                        <textarea
                        className="h-24 w-full rounded border p-2"
                        value={value || ''}
                        onChange={(e) => handleChange(key as keyof FakultasType, e.target.value)}
                        />
                    </div>
                    );
                }

                return (
                    <div key={key}>
                    <Label>{labelMapping[key]}</Label>
                    <input
                        type="text"
                        className="w-full rounded border p-2"
                        value={value || ''}
                        onChange={(e) => handleChange(key as keyof FakultasType, e.target.value)}
                    />
                    </div>
                );
                })}
            </ScrollArea>
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
