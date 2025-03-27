import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { ScrollArea } from '@radix-ui/react-scroll-area';

type ProdiType = {
    id?: string;
    fakultas_id: number | null;
    kode_ps: number | null ;
    nama_ps_id: string;
    nama_ps_en: string;
    nama_singkat_ps:string;
    tinkat_pendidikan_univ_id: string;
    periode_akademik_id: number | null;
    sks_lulus_minimal: number | null;
    ipk_lulus_minimal: number | null;
    tugas_akhir_syarat: 'true'|'false' |null;
    ukom_syarat: 'true'|'false' |null;
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
    capaian_pembelajaran_prodi: string;
}

type EditModalProps = {
    data: ProdiType;
    onUpdate: (data: ProdiType) => void;
};

const labelMapping: Record<string, string> ={
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
    alamat_prodi: 'Prodi Adress',
    telp_prodi: 'Prodi Telphon Number',
    alamat_email_prodi: 'Email Prodi',
    alamat_web_prodi: 'Website Prodi',
    deskripsi_prodi: 'Description Prodi',
    visi_prodi: 'Vision Prodi',
    misi_prodi: 'Mision Prodi',
    kompetensi_prodi: 'Competency Prodi',
    capaian_pembelajaran_prodi: 'Goals Prodi',
}

const editModal = ({data, onUpdate}: EditModalProps) =>{
    const [formData, setFormData] = useState<ProdiType>(data);
    const handleSubmit = () => {
        onUpdate(formData);
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className='bg-yellow-600'>
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[800px]'>
                <DialogHeader>
                    <DialogTitle>Edit Prodi</DialogTitle>
                    <DialogDescription>Update Your Prodi</DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[400px] w-full rounded border p-2 overflow-auto">
                <div className='grid grid-cols-2 gap-4'>
                    {Object.entries(formData).map(([key, value]) => {
                        if (['tugas_akhir_syarat', 'ukom_syarat'].includes(key)) {
                            return (
                                <div key={key} className='col-span-1'>
                                    <Label>{labelMapping[key] || key.replace('_', ' ').toUpperCase()}</Label>
                                    <select 
                                        className='rounded border p-2 w-full' 
                                        value={value} 
                                        onChange={(e) => handleChange(key as keyof ProdiType, e.target.value)}>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                </div>
                            );
                        }
                        if (['deskripsi_prodi', 'visi_prodi', 'misi_prodi', 'kompetensi_prodi', 'capaian_pembelajaran_prodi'].includes(key)) {
                            return (
                                <div key={key} className='col-span-2'>
                                    <Label>{labelMapping[key] || key.replace('_', ' ').toUpperCase()}</Label>
                                    <textarea 
                                        className='rounded border p-2 w-full h-24' 
                                        placeholder=""
                                        value={value} 
                                        onChange={(e) => handleChange(key as keyof ProdiType, e.target.value)}
                                    />
                                </div>
                            );
                        }
                        return (
                            <div key={key} className='col-span-1'>
                                <Label>{labelMapping[key] || key.replace('_', ' ').toUpperCase()}</Label>
                                <input 
                                    type='text' 
                                    className='rounded border p-2 w-full' 
                                    placeholder=""
                                    value={value} 
                                    onChange={(e) => handleChange(key as keyof ProdiType, e.target.value)}
                                />
                            </div>
                        );
                    })}
                </div>
            </ScrollArea>
                
                <DialogFooter>
                    <Button type='button' onClick={handleSubmit}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default editModal;