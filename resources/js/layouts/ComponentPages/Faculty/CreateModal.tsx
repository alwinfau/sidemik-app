import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

type FakultasType = {
    kode_fakultas: string;
    nama_fakultas: string;
    nama_fakultas_en: string;
    nama_singkat_fakultas: string;
    alamat_fakultas: string;
    telp_fakultas: string;
    periode_akademik_id: number | null;
    status_fakultas: "AKTIF" | "NON_AKTIF" | null;
    visi_fakultas: string;
    misi_fakultas: string;
    ket_fakultas: string;
};

type FacultyFormProps = {
    formData: Omit<FakultasType, 'id'>;
    setFormData: (data: Omit<FakultasType, 'id'>) => void;
};

const labelMapping: Record<string, string> ={
    kode_fakultas: 'Code Faculty',
    nama_fakultas: 'Name Faculty',
    nama_fakultas_en : 'Name Faculty (EN)',
    nama_singkat_fakultas: 'Short Name Of Faculty',
    alamat_fakultas: 'Faculty Adress',
    telp_fakultas: 'Faculty Telphone Number',
    periode_akademik_id: 'Period Academic',
    status_fakultas: 'Status Faculty',
    visi_fakultas: 'Vision Faculty',
    misi_fakultas: 'Mision Faculty',
    ket_fakultas: 'Description Faculty'
}

const FacultyForm = ({ formData, setFormData }: FacultyFormProps) => {
    const handleChange = (key: keyof FakultasType, value: string | number | null) => {
        setFormData({ ...formData, [key]: value });
    };
    return (
        <div className='grid grid-cols-2 gap-4'>
            <ScrollArea className='h-100 w-140'>
            {Object.entries(formData).map(([key, value]) => {
                if (key === 'status_fakultas') {
                    return (
                        <div key={key} className='col-span-2'>
                            <Label>{labelMapping[key] || key.replace('_', ' ').toUpperCase()}</Label>
                            <select 
                                className='rounded border p-2 w-full' 
                                value={value || ''} 
                                onChange={(e) => handleChange(key as keyof FakultasType, e.target.value)}>
                                <option value="">Pilih Status</option>
                                <option value="AKTIF">AKTIF</option>
                                <option value="NON_AKTIF">NON AKTIF</option>
                            </select>
                        </div>
                    );
                }
                if (['visi_fakultas', 'misi_fakultas', 'ket_fakultas'].includes(key)) {
                    return (
                        <div key={key} className='col-span-2'>
                            <Label>{labelMapping[key] || key.replace('_', ' ').toUpperCase()}</Label>
                            <textarea 
                                className='rounded border p-2 w-full h-24' 
                                placeholder=''
                                value={value} 
                                onChange={(e) => handleChange(key as keyof FakultasType, e.target.value)}
                            />
                        </div>
                    );
                }
                return (
                    <div key={key}>
                        <Label>{labelMapping[key] || key.replace('_', ' ').toUpperCase()}</Label>
                        <input 
                            type='text' 
                            className='rounded border p-2 w-full' 
                            placeholder=''
                            value={value} 
                            onChange={(e) => handleChange(key as keyof FakultasType, e.target.value)}
                        />
                    </div>
                );
            })}
            </ScrollArea>
        </div>
    );
};

type CreateModalProps = {
    onCreate: (data: Omit<FakultasType, 'id'>) => void;
};

const CreateModal = ({ onCreate }: CreateModalProps) => {
    const [formData, setFormData] = useState<Omit<FakultasType, 'id'>>({
        kode_fakultas: '',
        nama_fakultas: '',
        nama_fakultas_en: '',
        nama_singkat_fakultas: '',
        alamat_fakultas: '',
        telp_fakultas: '',
        periode_akademik_id: null,
        status_fakultas: null,
        visi_fakultas: '',
        misi_fakultas: '',
        ket_fakultas: ''
    });

    const handleSubmit = () => {
        onCreate(formData);
    };

    return (
        <Dialog>
            <div className="w-full flex justify-start">
                <DialogTrigger asChild>
                    <Button variant="default" className='bg-blue-600'>
                        Add Faculty
                    </Button>
                </DialogTrigger>
            </div>
            <DialogContent className='sm:max-w-[600px]'>
                <DialogHeader>
                    <DialogTitle>Create Faculty</DialogTitle>
                    <DialogDescription>Add New Faculty</DialogDescription>
                </DialogHeader>
                <FacultyForm formData={formData} setFormData={setFormData} />
                <DialogFooter>
                    <Button type='button' onClick={handleSubmit}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default CreateModal;
