import { Tables } from "@/components/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { useState } from "react";
import CreateModal from "../AcademicPeriod/CreateModal";
import EditModal from "../Class/EditModal";
// import CreateModal from "./CreateModal";
// import EditModal from "./EditModal";

type AcademicYearType = {
    id: string;
    academic_year: Date | null;
    name: string;
    start_date: Date | null;
    end_date:  Date | null;
    description: string;
};


const AkacademicYear = () => {
    const [data, setData] = useState <AcademicYearType[]>([
        {
            id:'1',
            academic_year: null,
            name: '',
            start_date: null,
            end_date: null,
            description: ''
            
        }
    ]);
    const handleCreate = (newData: Omit<AcademicYearType, 'id'>) => {
        setData([...data, { ...newData, id: String(data.length + 1) }]);
    };
    const handleUpdate = (updateData: AcademicYearType) => {
        setData(data.map((item) => (item.id === updateData.id ? updateData : item)));
    }
    return(
        <AppLayout>
            <div className="w-full">
                <Card>
                    <CardHeader>
                        <CardTitle>Academic Year</CardTitle>
                        <CardDescription>Manage Your Academic Year</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex justify-end">
                            <CreateModal onCreate={handleCreate} />
                        </div>
                        <Tables 
                            head={[
                                'Academic Year', 
                                'Name', 
                                'Start Date', 
                                'End Date',
                                'Description', 
                                'Action'
                            ]}
                            columns={[
                                'academic_year',
                                'name',
                                'start_date',
                                'end_date',
                                'description',
                            ]}
                            data={data}
                            edit={(item : any) => <EditModal data={item} onUpdate={handleUpdate} />}
                         />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}

export default AkacademicYear