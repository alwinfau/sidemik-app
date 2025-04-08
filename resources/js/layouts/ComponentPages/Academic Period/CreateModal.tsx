import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';

type PeriodeAcademicType = {
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
type PeriodAcademicProps = {
    FormData: Omit<PeriodeAcademicType, 'id'>;
    setFormData: (data: Omit<PeriodeAcademicType, 'id'>) => void;
}

const labelMapping: Record<string, string> ={
    kode_periode_akd: 'Code Period',
    thn_ajaran_id: 'Academic Year',
    semester_periode_akd: 'Semester Period Academic',
    nm_periode_akd: 'Name Period Academic',
    nm_singkat_periode_akd: 'Short Name Of Periode Academic',
    tgl_awal_kul_akd: 'Academic Start Date',
    tgl_akhir_kul_akd: 'Academic Sourse End Date',
    tgl_awal_uts: 'Midterm Exam Start Date',
    tgl_akhir_uts: 'Midterm Exam End Date',
    tgl_awal_uas: 'Initial Date Of Final Exam',
    jlh_pertemuan_perkul: 'Final Exam Date',
    jlh_min_presensi: 'Minimum Number Of Attendances',
    status_periode_akd: 'Status Academic Period'
}
const AcademicPeriodeForm = ({ FormData, setFormData} :PeriodAcademicProps) =>{
    const handleChange =(key : keyof PeriodeAcademicType, value: string | number | null)=>{
        setFormData({ ...FormData, [key]: value });
    }
    return(
        <div className="grid grid-cols-2 gap-4">
            <ScrollArea className="h-100 w-140">
                {Object.entries(FormData).map(([key, value]) => {
                    if (key === 'status_periode_akd') {
                        return (
                            <div key={key} className="col-span-2">
                                <Label>{labelMapping[key] || key.replace('_', ' ').toUpperCase()}</Label>
                                <select
                                    className="w-full rounded border p-2"
                                    value={value || ''}
                                    onChange={(e) => handleChange(key as keyof PeriodeAcademicType, e.target.value)}
                                >
                                    <option className='text-black' value="">Pilih Status</option>
                                    <option className='text-black' value="AKTIF">AKTIF</option>
                                    <option className='text-black' value="NON_AKTIF">NON AKTIF</option>
                                </select>
                            </div>
                        );
                    }
                    return (
                        <div key={key}>
                            <Label>{labelMapping[key] || key.replace('_', ' ').toUpperCase()}</Label>
                            <input
                                type="text"
                                className="w-full rounded border p-2"
                                placeholder=""
                                value={value}
                                onChange={(e) => handleChange(key as keyof PeriodeAcademicType, e.target.value)}
                            />
                        </div>
                    );
                })}
            </ScrollArea>
        </div>
    )
}
type CreateModalProps = { 
    onCreate: (data: Omit<PeriodeAcademicType, 'id'>) => void
}
const CreateModal = ({ onCreate}: CreateModalProps) =>{
    const [FormData, setFormData] = useState <Omit<PeriodeAcademicType, 'id' >>({
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
        status_periode_akd: null
    });
    const handleSubmit = () =>{
        onCreate(FormData)
    }
    return(
        <Dialog>
            <div className="flex w-full justify-start">
                <DialogTrigger asChild>
                    <Button variant="default" className="bg-blue-600">
                        Add Period Academic
                    </Button>
                </DialogTrigger>
            </div>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create Period Academic</DialogTitle>
                    <DialogDescription>Add New Period Academic</DialogDescription>
                </DialogHeader>
                <AcademicPeriodeForm FormData={FormData} setFormData={setFormData} />
                <DialogFooter>
                    <Button type="button" onClick={handleSubmit}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default CreateModal;