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
import { useState } from 'react';

type ProdiType = {
    id?: string;
    fakultas_id: number | null;
    kode_ps: number | null;
    nama_ps_id: string;
    nama_ps_en: string;
    nama_singkat_ps: string;
    tinkat_pendidikan_univ_id: string;
    periode_akademik_id: number | null;
    sks_lulus_minimal: number | null;
    ipk_lulus_minimal: number | null;
    tugas_akhir_syarat: 'true' | 'false' | null;
    ukom_syarat: 'true' | 'false' | null;
    jenis_tugas_akhir_id: number | null;
    max_dosen_pembimbing: number | null;
    max_dosen_penguji: number | null;
    pejabat_prodi_id: number | null;
    akreditasi_prodi_id: number | null;
    alamat_prodi: string;
    telp_prodi: string;
    alamat_email_prodi: string;
    alamat_web_prodi: string;
    deskripsi_prodi: string;
    visi_prodi: string;
    misi_prodi: string;
    kompetensi_prodi: string;
    capaian_pembelajaran_prodi: string;
};

type CreateModalProps = {
    onCreate: (data: Omit<ProdiType, 'id'>) => void;
};

const CreateModal = ({ onCreate }: CreateModalProps) => {
    const [formData, setFormData] = useState<Omit<ProdiType, 'id'>>({
        fakultas_id: null,
        kode_ps: null,
        nama_ps_id: '',
        nama_ps_en: '',
        nama_singkat_ps: '',
        tinkat_pendidikan_univ_id: '',
        periode_akademik_id: null,
        sks_lulus_minimal: null,
        ipk_lulus_minimal: null,
        tugas_akhir_syarat: null,
        ukom_syarat: null,
        jenis_tugas_akhir_id: null,
        max_dosen_pembimbing: null,
        max_dosen_penguji: null,
        pejabat_prodi_id: null,
        akreditasi_prodi_id: null,
        alamat_prodi: '',
        telp_prodi: '',
        alamat_email_prodi: '',
        alamat_web_prodi: '',
        deskripsi_prodi: '',
        visi_prodi: '',
        misi_prodi: '',
        kompetensi_prodi: '',
        capaian_pembelajaran_prodi: '',
    });

    const handleChange = <K extends keyof typeof formData>(key: K, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = () => {
        onCreate(formData);
    };

    const labelMapping: Record<string, string> = {
        fakultas_id: 'Faculty',
        kode_ps: 'Code Prodi',
        nama_ps_id: 'Name Prodi',
        nama_ps_en: 'Name Prodi (EN)',
        nama_singkat_ps: 'Short Name of Prodi',
        tinkat_pendidikan_univ_id: 'Education Level Univ',
        periode_akademik_id: 'Academic period',
        sks_lulus_minimal: 'Minimum Passing Credits',
        ipk_lulus_minimal: 'Minimum Passing Grade',
        tugas_akhir_syarat: 'Final Project',
        ukom_syarat: 'Competency Test',
        jenis_tugas_akhir_id: 'Type of Final Project',
        max_dosen_pembimbing: 'Maximum Lectures',
        max_dosen_penguji: 'Maximum lectures of Examiners',
        pejabat_prodi_id: 'Oficial Prodi',
        akreditasi_prodi_id: 'Prodi Accreditation',
        alamat_prodi: 'Prodi Address',
        telp_prodi: 'Prodi Telephone Number',
        alamat_email_prodi: 'Email Prodi',
        alamat_web_prodi: 'Website Prodi',
        deskripsi_prodi: 'Description Prodi',
        visi_prodi: 'Vision Prodi',
        misi_prodi: 'Mission Prodi',
        kompetensi_prodi: 'Competency Prodi',
        capaian_pembelajaran_prodi: 'Goals Prodi',
    };

    return (
        <Dialog>
            <div className="flex w-full justify-start">
                <DialogTrigger asChild>
                    <Button variant="default" className="bg-blue-600">
                        Create Prodi
                    </Button>
                </DialogTrigger>
            </div>
            <DialogContent className="sm:max-w-[800px] pointer-events-auto z-[9999]">
                <DialogHeader>
                    <DialogTitle>Create Prodi</DialogTitle>
                    <DialogDescription>Add New Prodi</DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-100 w-190">
                    <div className="grid grid-cols-2 gap-7">
                        {Object.entries(formData).map(([key, value]) => {
                            if (['tugas_akhir_syarat', 'ukom_syarat'].includes(key)) {
                                return (
                                    <div key={key} className="col-span-2">
                                        <Label>{labelMapping[key] || key.replace('_', ' ').toUpperCase()}</Label>
                                        <select
                                            className="w-full rounded border p-2 text-white"
                                            value={value || ''}
                                            onChange={(e) => handleChange(key as keyof typeof formData, e.target.value)}
                                        >
                                            <option className='text-black' value="" disabled>Pilih</option>
                                            <option className='text-black' value="true">True</option>
                                            <option className='text-black' value="false">False</option>
                                        </select>
                                    </div>
                                );
                            }
                            if (['deskripsi_prodi', 'visi_prodi', 'misi_prodi', 'kompetensi_prodi', 'capaian_pembelajaran_prodi'].includes(key)) {
                                return (
                                    <div key={key} className="col-span-2">
                                        <Label>{labelMapping[key] || key.replace('_', ' ').toUpperCase()}</Label>
                                        <textarea
                                            className="h-24 w-full rounded border p-2"
                                            value={value}
                                            onChange={(e) => handleChange(key as keyof typeof formData, e.target.value)}
                                        />
                                    </div>
                                );
                            }
                            return (
                                <div key={key} className="col-span-1">
                                    <Label>{labelMapping[key] || key.replace('_', ' ').toUpperCase()}</Label>
                                    <input
                                        type="text"
                                        className="w-full rounded border p-2"
                                        value={value}
                                        onChange={(e) => handleChange(key as keyof typeof formData, e.target.value)}
                                    />
                                </div>
                            );
                        })}
                    </div>
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

export default CreateModal;
