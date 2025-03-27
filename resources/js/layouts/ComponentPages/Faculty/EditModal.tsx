import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

type FakultasType = {
    id: number;
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
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Faculty</DialogTitle>
                    <DialogDescription>Update Faculty</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    {Object.keys(formData).map((key) => (
                        <>
                            <Label key={key} className="my-2"></Label>
                            <input
                                key={key}
                                type="text"
                                placeholder={key}
                                className="rounded border p-2"
                                value={(formData as any)[key]}
                                onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }))}
                            />
                        </>
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
export default editModal;
