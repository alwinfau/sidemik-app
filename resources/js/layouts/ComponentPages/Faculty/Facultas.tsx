import FilterStatus from '@/components/Filter';
import SearchName from '@/components/search';
import { Tables } from '@/components/table';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { useEffect, useState } from 'react';
import CreateModal from './CreateModal';
import EditModal from './EditModal';
import { useAxios } from '@/hooks/useAxios';

type FakultasType = {
    id?: string;
    code: string;
    name: string;
    eng_name: string;
    short_name: string;
    address: string;
    telephone: string;
    academic_period_id: number | null;
    is_active: 'AKTIF' | 'NON_AKTIF' | null;
    vission: string;
    mission: string;
    description: string;
};

const Fakultas = () => {
    const {get} = useAxios();
    const {del} = useAxios();
    const [data, setData] = useState<any>([]);

    const handleCreate = (newData: Omit<FakultasType, 'id'>) => {
        setData([...data, { ...newData, id: String(data.length + 1) }]);
    };
    const handleUpdate = (updateData: FakultasType) => {
        setData(data.map((item: any) => (item.id === updateData.id ? updateData : item)));
        
    };
    
    const handleDelete = async (id: string) => {    
        try {
            await del(`/faculty/${id}`);
            setData(data.filter((item: any) => item.id !== id));
            
        } catch (error) {
            console.error('Gagal menghapus data fakultas:', error);
            
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fakultas = await get<any>('/faculty');
                setData(fakultas.data.data); 
            } catch (error) {
                console.error('Gagal mengambil data fakultas:', error);
            } finally {
                console.log("selesai")
            }
        };
        
        fetchData();
    }, []);
    
    console.log(data)

    return (
        <AppLayout>
            <div className="w-full">
                <CardHeader>
                    <CardTitle>Faculty</CardTitle>
                    <CardDescription>Manage Your Faculty</CardDescription>
                    <FilterStatus />
                    <SearchName />
                    <div className="mb-4 flex justify-end">
                        <CreateModal onCreate={handleCreate} />
                    </div>
                </CardHeader>
                <div className='mx-6'>

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
                        'code',
                        'name',
                        'eng_name',
                        'short_name',
                        'address',
                        'telephone',
                        (item) => item.academic_period?.name ?? '-',
                        'is_active',
                        'vision',
                        'mission',
                        'description',
                    ]}
                    edit={(item) => <EditModal data={item} onUpdate={handleUpdate} />} onDelete={handleDelete}
                />
                </div>
            </div>
        </AppLayout>
    );
};
export default Fakultas;
