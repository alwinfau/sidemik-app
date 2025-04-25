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
import { useState, useEffect, use } from 'react';
import { useAxios } from '@/hooks/useAxios';
import { Key } from 'lucide-react';

type AcademicYearType = {
    id: string;
    academic_year: Date | null;
    name: string;
    start_date: Date | null;
    end_date:  Date | null;
    description: string;
};


type EditModalProps = {
    data: AcademicYearType;
    onUpdate: (data: AcademicYearType) => void;
};

const labelMapping: Record<string, string> = {
    academic_year: 'Academic Year',
    name: 'Name',
    start_date: 'Start Date',
    end_date: 'End Date',
    description: 'Description',
};

const EditModal = ({ data, onUpdate }: EditModalProps) =>{
    const { put, get } = useAxios();
    const [ open, setOpen]= useState(false);
    const [formData, setFormData]= useState<AcademicYearType>(data);

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const handleChange = (key: keyof AcademicYearType, value:any) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }))
    };

    const handleSubmit = async () => {
        try {
            if(!formData.id){
                throw new Error('ID Tahun Ajaran tidak ditemukan');
            }

            const payload ={
                academic_year: formData.academic_year,
                name: formData.name,
                start_date: formData.start_date,
                end_date: formData.end_date,
                description: formData.description,
            };

            await put(`/Academic_Year/${formData.id}`, payload);
            onUpdate(formData);
            setOpen(false);
        console.log('Data berhasil diupdate');
        } catch (error:any) {
            console.error('Gagal update Tahun akademik:', error?.response?.data || error.message || error);
        }
    };

    // useEffect(() => {
    //     const fetchAcademicYear = async() =>{
    //         try {
    //             const res = await get('/academic-year');
    //             setAcademicYear(res.data.data);
    //         } catch (err) {
    //             console.error('Gagal fetch Tahun ajaran:', err);
    //         }
    //     };
    //     fetchAcademicYear
    // }, []);

    return (
        <Dialog open = {open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className='bg-yellow-600'>
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle> Edit Academik Year</DialogTitle>
                    <DialogDescription>Update Academic Year</DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )

};

export default EditModal;