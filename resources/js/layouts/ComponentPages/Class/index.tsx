import { Tables } from "@/components/Tables";
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import { useState } from "react";
import CreateModal from "./CreateModal";
import EditModal from "./EditModal";
import AppLayout from "@/layouts/app-layout";

type ClassType = {
    id?: number
    code: string
    name: string
    description: string
    is_active: "True" | "False"
     
};

const Class = () => {
    const [data, setData] = useState<ClassType[]>([
        {
            id: 1,
            code: 'A',
            name: 'Class A',
            description: 'Class A description',
            is_active: 'True', 
            
        }
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
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Class</CardTitle>
                            <CardDescription>Manage your class</CardDescription>
                        </CardHeader>
                        <CardContent >
                            <div className="mb-2 flex  justfy-end">
                                <CreateModal onCreate={handleCreate} />
                            </div>
                            <Tables
                                head ={['Code', 'Name', 'Description', 'Active', 'Action']}
                                data={data}
                                columns={['code', 'name', 'description', 'is_active']}
                                edit= {(item) => <EditModal data={item} onUpdate={handleUpdate} />}
                            />
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        </>
    );
};

export default Class;