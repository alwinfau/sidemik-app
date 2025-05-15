import FilterStatus from '@/components/Filter';
import SearchName from '@/components/search';
import { Tables } from '@/components/table';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
import CreateModal from './CreateModal';
import EditModal from './EditModal';

type ClassType = {
    id?: number;
    code: string;
    name: string;
    description: string;
    is_active: 'true' | 'false';
};

const Class = () => {
    const [data, setData] = useState<ClassType[]>([
        {
            id: 1,
            code: 'A',
            name: 'Class A',
            description: 'Class A description',
            is_active: 'true',
        },
    ]);
    const handleCreate = (newData: Omit<ClassType, 'id'>) => {
        setData([...data, { ...newData, id: data.length + 1 }]);
    };
    const handleUpdate = (updatedData: ClassType) => {
        setData(data.map((item) => (item.id === updatedData.id ? updatedData : item)));
    };

    return (
        <>
            <AppLayout>
                <div className="p-4">
                    <CardHeader>
                        <CardTitle>Class</CardTitle>
                        <CardDescription>Manage your class</CardDescription>
                    </CardHeader>
                    <FilterStatus />
                    <SearchName />
                    <div className="justfy-end mb-2 flex">
                        <CreateModal onCreate={handleCreate} />
                    </div>
                    <Tables
                        head={['Code', 'Name', 'Description', 'Active', 'Action']}
                        data={data}
                        columns={['code', 'name', 'description', 'is_active']}
                        edit={(item) => <EditModal data={item} onUpdate={handleUpdate} />}
                    />
                </div>
            </AppLayout>
        </>
    );
};

export default Class;
