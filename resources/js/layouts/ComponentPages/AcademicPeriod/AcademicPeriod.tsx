import FilterStatus from '@/components/Filter';
import SearchName from '@/components/search';
import { Tables } from '@/components/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
import CreateModal from './CreateModal';
import EditModal from './EditModal';

type PeriodeAcademicType = {
    id: string;
    kode_periode_akd: number |null;
    thn_ajaran_id: number |null;
    semester_periode_akd: string;
    nm_periode_akd: string;
    nm_singkat_periode_akd: string;
    tgl_awal_kul_akd: Date |null;
    tgl_akhir_kul_akd: Date |null;
    tgl_awal_uts: Date |null;
    tgl_akhir_uts: Date |null;
    tgl_awal_uas: Date |null;
    jlh_pertemuan_perkul: number |null;
    jlh_min_presensi: number |null;
    status_periode_akd: 'AKTIF'| 'NON_AKTIF' |null;
}

const PeriodeAcademic = () =>{
    const [data, setData] = useState <PeriodeAcademicType[]>([
        {   
            id: '1',
            kode_periode_akd: null,
            thn_ajaran_id: null,
            semester_periode_akd: '',
            nm_periode_akd: '',
            nm_singkat_periode_akd: '',
            tgl_awal_kul_akd: null,
            tgl_akhir_kul_akd: null,
            tgl_awal_uts: null,
            tgl_akhir_uts: null,
            tgl_awal_uas: null,
            jlh_pertemuan_perkul: null,
            jlh_min_presensi: null,
            status_periode_akd: null,
        }
    ]);
    const handleCreate = (newData: Omit<PeriodeAcademicType, 'id'>) => {
        setData([...data, { ...newData, id: String(data.length + 1) }]);
    };
    const handleUpdate = (updateData: PeriodeAcademicType) => {
        setData(data.map((item) => (item.id === updateData.id ? updateData : item)));
    };
    return(
        <AppLayout>
            <div className="w-full">
                    <CardHeader>
                        <CardTitle>Academic Period</CardTitle>
                        <CardDescription>Manage Your Academic Period</CardDescription>
                        <FilterStatus />
                        <SearchName></SearchName>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex justify-end">
                            <CreateModal onCreate={handleCreate} />
                        </div>
                        <Tables
                            head={[
                            'Code Period',
                            'Academic Year',
                            'Semester',
                            'Name',
                            'Short Name',
                            'Start Date',
                            'End Date',
                            'UTS Start',
                            'UTS End',
                            'UAS Start',
                            'Total Meetings',
                            'Min Presence',
                            'Status'
                            ]}
                            columns={[
                            'kode_periode_akd',
                            'thn_ajaran_id',
                            'semester_periode_akd',
                            'nm_periode_akd',
                            'nm_singkat_periode_akd',
                            'tgl_awal_kul_akd',
                            'tgl_akhir_kul_akd',
                            'tgl_awal_uts',
                            'tgl_akhir_uts',
                            'tgl_awal_uas',
                            'jlh_pertemuan_perkul',
                            'jlh_min_presensi',
                            'status_periode_akd'
                            ]}
                            data={data}
                            edit={(item : any) => <EditModal data={item} onUpdate={handleUpdate} />}
                        />
                    </CardContent>
            </div>
        </AppLayout>
    )
}
export default PeriodeAcademic;