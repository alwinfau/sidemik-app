import FilterStatus from "@/components/Filter";
import SearchName from "@/components/search";
import { Tables } from "@/components/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { useState, useEffect } from "react";
import CreateModal from "./CreateModal";
import EditModal from "./EditModal";
import { useAxios } from "@/hooks/useAxios";


type Curriculum_ProdiType = {
    id?: string;
    curriculum_year_id: number;
    course_id: number;
    code: string;
    level_semester: string;
    min_scores:string;
    requaired_courses: 'true' | 'false';
    course_package: 'true' | 'false';
    study_program_desc: string;
};

const Curriculum_Prodi = () => {
    const { get } = useAxios();
    const {del} = useAxios();
    const [data, setData] = useState<any>([]);

    const handleCreate = (newData: Omit<Curriculum_ProdiType, 'id'>) => {
        setData([...data, { ...newData, id: String(data.length + 1) }]);
    };

    const handleUpdate = (updatedData: Curriculum_ProdiType) => {
        setData(data.map((item:any) => (item.id === updatedData.id ? updatedData : item)));
    };

    const handleDelete = async (id: string) => {
        try {
            await del(`/curriculum-prodi/${id}`);
            setData(data.filter((item: any) => item.id !== id));
        } catch (error) {
            console.error('Gagal menghapus data curriculum prodi:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const curriculum_prodi = await get<any>('/curriculum-prodi');
                const transformated = curriculum_prodi.data.data.map((item:any) => ({
                    ...item,
                    is_active: item.is_active === 1 ? 'AKTIF':'NON AKTIF',
                }))
                setData(transformated); 
            } catch (error) {
                console.error('Gagal mengambil data curriculum prodi:', error);
            } finally {
                console.log("selesai")
            }
        };

        fetchData();
    }, []);

    console.log(data);

    
    return (
        <AppLayout>
            <div className="w-full">
                <CardHeader>
                        <CardTitle>Curriculum Prodi</CardTitle>
                        <CardDescription>Manage Your Curriculum Prodi</CardDescription>
                        <FilterStatus />
                        <SearchName />
                        <div className="mb-4 flex justify-end">
                            <CreateModal onCreate={handleCreate} />
                        </div>
                </CardHeader>
                <div className ="mx-6">
                    <Tables 
                        head= {[
                                'Curriculum Year',
                                'Code',
                                'Level Semester',
                                'Min Scores',
                                'Requaired Courses',
                                'Course Package',
                                'Study Program Description',
                                'Action',
                        ]}
                        data={data}
                        columns={[
                                'curriculum_year_id',
                                'code',
                                'level_semester',
                                'min_scores',
                                'requaired_courses',
                                'course_package',
                                'study_program_desc',
                        ]}
                           
                        edit={(item) => <EditModal data={item} onUpdate={handleUpdate} />} onDelete={ handleDelete}
                    />
                </div>
            </div>
        </AppLayout>
    );
};

export default Curriculum_Prodi