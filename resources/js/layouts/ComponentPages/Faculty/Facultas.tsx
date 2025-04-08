import FilterStatus from '@/components/Filter';
import SearchName from '@/components/search';
import { Tables } from '@/components/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
import CreateModal from './CreateModal';
import EditModal from './EditModal';

type FakultasType = {
    id?: string;
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
const Fakultas = () => {
    const [data, setData] = useState<FakultasType[]>([
        {
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
            ket_fakultas: '',
        },
    ]);
    const handleCreate = (newData: Omit<FakultasType, 'id'>) => {
        setData([...data, { ...newData, id: String(data.length + 1) }]);
    };
    const handleUpdate = (updateData: FakultasType) => {
        setData(data.map((item) => (item.id === updateData.id ? updateData : item)));
    };

    return (
        <AppLayout>
            <div className="w-full">
                <ScrollArea className="h-200 w-full rounded-md border whitespace-nowrap">
                    <ScrollBar orientation="horizontal" />
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Faculty</CardTitle>
                            <CardDescription>Manage Your Faculty</CardDescription>
                            <FilterStatus />
                            <SearchName />
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4 flex justify-end">
                                <CreateModal onCreate={handleCreate} />
                            </div>
                            <Tables
                                head={[
                                    'Faculty Code',
                                    'Faculty Name',
                                    'Faculty Name (EN)',
                                    'Short Name',
                                    'Faculty Address',
                                    'Phone Number',
                                    'Academic Period',
                                    'Status',
                                    'Vision',
                                    'Mission',
                                    'Description',
                                    'Action',
                                ]}
                                data={data}
                                columns={[
                                    'kode_fakultas',
                                    'nama_fakultas',
                                    'nama_fakultas_en',
                                    'nama_singkat_fakultas',
                                    'alamat_fakultas',
                                    'telp_fakultas',
                                    'periode_akademik_id',
                                    'status_fakultas',
                                    'visi_fakultas',
                                    'misi_fakultas',
                                    'ket_fakultas',
                                ]}
                                edit={(item) => <EditModal data={item} onUpdate={handleUpdate} />}
                            />
                        </CardContent>
                    </Card>
                </ScrollArea>
            </div>
        </AppLayout>
    );
};
export default Fakultas;
