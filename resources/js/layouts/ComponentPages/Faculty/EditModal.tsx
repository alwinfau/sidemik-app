import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';

type FakultasType = {
    kode_fakultas: string;
    nama_fakultas: string;
    nama_fakultas_en: string;
    nama_singkat_fakultas: string;
    alamat_fakultas: string;
    telp_fakultas: string;
    periode_akademik_id: number | null;
    status_fakultas: 'AKTIF' | 'NON_AKTIF' | null;
    visi_fakultas: string;
    misi_fakultas: string;
    ket_fakultas: string;
};

type EditModalProps = {
    data: FakultasType;
    onUpdate: (data: FakultasType) => void;
};

const labelMapping: Record<string, string> = {
    kode_fakultas: 'Code Faculty',
    nama_fakultas: 'Name Faculty',
    nama_fakultas_en: 'Name Faculty (EN)',
    nama_singkat_fakultas: 'Short Name Of Faculty',
    alamat_fakultas: 'Faculty Adress',
    telp_fakultas: 'Faculty Telphone Number',
    periode_akademik_id: 'Period Academic',
    status_fakultas: 'Status Faculty',
    visi_fakultas: 'Vision Faculty',
    misi_fakultas: 'Mision Faculty',
    ket_fakultas: 'Description Faculty',
};

const editModal = ({ data, onUpdate }: EditModalProps) => {
    const [formData, setFormData] = useState<FakultasType>(data);
    const handleSubmit = () => {
        onUpdate(formData);
    };
    return (
        <Dialog>
                <DialogTrigger asChild>
                    <Button variant="default" className="bg-yellow-600">
                        Edit
                    </Button>
                </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Edit Faculty</DialogTitle>
                    <DialogDescription>Update New Faculty</DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-100 w-140">
                    {Object.entries(formData).map(([key, value]) => {
                        if (key === 'status_fakultas') {
                            return (
                                <div key={key} className="col-span-2">
                                    <Label>{labelMapping[key] || key.replace('_', ' ').toUpperCase()}</Label>
                                    <select
                                        className="w-full rounded border p-2"
                                        value={value || ''}
                                        onChange={(e) => handleChange(key as keyof FakultasType, e.target.value)}
                                    >
                                        <option className='text-black' value="">Pilih Status</option>
                                        <option className='text-black' value="AKTIF">AKTIF</option>
                                        <option className='text-black' value="NON_AKTIF">NON AKTIF</option>
                                    </select>
                                </div>
                            );
                        }
                        if (['visi_fakultas', 'misi_fakultas', 'ket_fakultas'].includes(key)) {
                            return (
                                <div key={key} className="col-span-2">
                                    <Label>{labelMapping[key] || key.replace('_', ' ').toUpperCase()}</Label>
                                    <textarea
                                        className="h-24 w-full rounded border p-2"
                                        placeholder=""
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
                                    type="text"
                                    className="w-full rounded border p-2"
                                    placeholder=""
                                    value={value}
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

export default editModal;
