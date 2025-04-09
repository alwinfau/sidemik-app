import FilterStatus from '@/components/Filter';
import SearchName from '@/components/search';
import { Tables } from '@/components/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
import CreateModal from './CreateModal';
import EditModal from './EditModal';

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

const Prodi = () => {
    const [data, setData] = useState<ProdiType[]>([
        {
            id: '',
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
        },
    ]);
    const handleCreate = (newData: Omit<ProdiType, 'id'>) => {
        setData([...data, { ...newData, id: String(data.length + 1) }]);
    };
    const handleUpdate = (updatedData: ProdiType) => {
        setData(data.map((item) => (item.id === updatedData.id ? updatedData : item)));
    };
    return (
        <>
            <AppLayout>
                <CardHeader>
                    <CardTitle>Study Program</CardTitle>
                    <CardDescription>Manage your Study Program</CardDescription>
                </CardHeader>
                <FilterStatus />
                <SearchName />
                <div className="m-5">
                                <div className="mb-4 flex justify-end">
                                    <CreateModal onCreate={handleCreate} />
                                </div>
                                <Tables
                                    head={[
                                        'Faculty',
                                        'Code Prodi',
                                        'Name Prodi',
                                        'Name Prodi in Eng',
                                        'Short Name of Prodi',
                                        'Education Level Univ',
                                        'Academic period',
                                        'Minimum Passing Credits',
                                        'Minimum Passing Grade',
                                        'Final Project',
                                        'Competency Test',
                                        'Type of Final Project',
                                        'Maximum Lectures',
                                        'Maximum lectures of Examiners',
                                        'Oficial Prodi',
                                        'Prodi Accreditation',
                                        'Prodi Adress',
                                        'Prodi Telphon Number',
                                        'Email Prodi',
                                        'Website Prodi',
                                        'Description Prodi',
                                        'Vision Prodi',
                                        'Mision Prodi',
                                        'Competency Prodi',
                                        'Goals Prodi',
                                        'Action',
                                    ]}
                                    data={data}
                                    columns={[
                                        'fakultas_id',
                                        'kode_ps',
                                        'nama_ps_id',
                                        'nama_ps_en',
                                        'nama_singkat_ps',
                                        'tinkat_pendidikan_univ_id',
                                        'periode_akademik_id',
                                        'sks_lulus_minimal',
                                        'ipk_lulus_minimal',
                                        'tugas_akhir_syarat',
                                        'ukom_syarat',
                                        'jenis_tugas_akhir_id',
                                        'max_dosen_pembimbing',
                                        'max_dosen_penguji',
                                        'pejabat_prodi_id',
                                        'akreditasi_prodi_id',
                                        'alamat_prodi',
                                        'telp_prodi',
                                        'alamat_email_prodi',
                                        'alamat_web_prodi',
                                        'deskripsi_prodi',
                                        'visi_prodi',
                                        'misi_prodi',
                                        'kompetensi_prodi',
                                        'capaian_pembelajaran_prodi',
                                    ]}
                                    edit={(item) => <EditModal data={item} onUpdate={handleUpdate} />}
                                />
                </div>
            </AppLayout>
        </>
    );
};
export default Prodi;
