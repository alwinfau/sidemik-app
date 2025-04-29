import { Button } from '@/components/ui/button';
import { FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useState } from 'react';

const ModalForm = ({
    open,
    onOpenChange,
    onSubmit,
    defaultValues,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
}) => {
    const [formData, setFormData] = useState<Omit<any, 'id'>>({
        emp_nip: '',
        emp_full_name: '',
        emp_front_title: '',
        emp_back_title: '',
        emp_gender: true,
        emp_religion: '',
        emp_birth_place: '',
        emp_birth_date: '',
        emp_married_status: '',
        study_programs_id: 1,
        active_statuses_id: 1,
        employments_relationships_id: 1,
        academic_positions_id: 1,
        emp_institution_origin: '',
        emp_areas_expertise: '',
        emp_collage_email: '',
        finger_account_number: '',
        sinta_id: '',
        orchid_id: '',
        scopus_id: '',
        nidn: '',
        nuptk: '',
        nitk: '',
        nidk: '',
        nupn: '',
        nbm: '',
        lecturer_certification_date: '',
        lecturer_certification_number: '',
    });

    useEffect(() => {
        if (defaultValues) {
            setFormData({
                emp_nip: defaultValues.emp_nip,
                emp_full_name: defaultValues.emp_full_name,
                emp_front_title: defaultValues.emp_front_title,
                emp_back_title: defaultValues.emp_back_title,
                emp_gender: defaultValues.emp_gender,
                emp_religion: defaultValues.emp_religion,
                emp_birth_place: defaultValues.emp_birth_place,
                emp_birth_date: defaultValues.emp_birth_date,
                emp_married_status: defaultValues.emp_married_status,
                study_programs_id: defaultValues.study_programs_id,
                active_statuses_id: defaultValues.active_statuses_id,
                employments_relationships_id: defaultValues.employments_relationships_id,
                academic_positions_id: defaultValues.academic_positions_id,
                emp_institution_origin: defaultValues.emp_institution_origin,
                emp_areas_expertise: defaultValues.emp_areas_expertise,
                emp_collage_email: defaultValues.emp_collage_email,
                finger_account_number: defaultValues.finger_account_number,
                sinta_id: defaultValues.sinta_id,
                orchid_id: defaultValues.orchid_id,
                scopus_id: defaultValues.scopus_id,
                nidn: defaultValues.nidn,
                nuptk: defaultValues.nuptk,
                nitk: defaultValues.nitk,
                nidk: defaultValues.nidk,
                nupn: defaultValues.nupn,
                nbm: defaultValues.nbm,
                lecturer_certification_date: defaultValues.lecturer_certification_date,
                lecturer_certification_number: defaultValues.lecturer_certification_number,
            });
        } else {
            setFormData({
                emp_nip: '',
                emp_full_name: '',
                emp_front_title: '',
                emp_back_title: '',
                emp_gender: true,
                emp_religion: '',
                emp_birth_place: '',
                emp_birth_date: '',
                emp_married_status: '',
                study_programs_id: 1,
                active_statuses_id: 1,
                employments_relationships_id: 1,
                academic_positions_id: 1,
                emp_institution_origin: '',
                emp_areas_expertise: '',
                emp_collage_email: '',
                finger_account_number: '',
                sinta_id: '',
                orchid_id: '',
                scopus_id: '',
                nidn: '',
                nuptk: '',
                nitk: '',
                nidk: '',
                nupn: '',
                nbm: '',
                lecturer_certification_date: '',
                lecturer_certification_number: '',
            });
        }
    }, [defaultValues, open]);

    const handleChange = (name: string, value: string | number) => {
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value as string) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData, defaultValues?.id);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-hidden p-6">
                <DialogHeader>
                    <DialogTitle>{defaultValues ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <FormTextInput
                                id="emp_nip"
                                name="emp_nip"
                                label="NIP"
                                type="text"
                                value={formData.emp_nip}
                                onChange={(value) => handleChange('emp_nip', value)}
                                placeholder="Masukkan NIP"
                            />
                            <FormTextInput
                                id="emp_full_name"
                                name="emp_full_name"
                                label="Full Name"
                                type="text"
                                value={formData.emp_full_name}
                                onChange={(value) => handleChange('emp_full_name', value)}
                                placeholder="Masukkan Nama Lengkap"
                            />
                            <FormTextInput
                                id="emp_front_title"
                                name="emp_front_title"
                                label="Front Title"
                                type="text"
                                value={formData.emp_front_title}
                                onChange={(value) => handleChange('emp_front_title', value)}
                                placeholder="Masukkan Front Title"
                            />
                            <FormTextInput
                                id="emp_back_title"
                                name="emp_back_title"
                                label="Back Title"
                                type="text"
                                value={formData.emp_back_title}
                                onChange={(value) => handleChange('emp_back_title', value)}
                                placeholder="Masukkan Back Title"
                            />
                            <FormTextInput
                                id="emp_gender"
                                name="emp_gender"
                                label="Gender"
                                type="text"
                                value={formData.emp_gender}
                                onChange={(value) => handleChange('emp_gender', value)}
                                placeholder="Masukkan Gender"
                            />
                            <FormTextInput
                                id="emp_religion"
                                name="emp_religion"
                                label="Religion"
                                type="text"
                                value={formData.emp_religion}
                                onChange={(value) => handleChange('emp_religion', value)}
                                placeholder="Masukkan Religion"
                            />
                            <FormTextInput
                                id="emp_birth_place"
                                name="emp_birth_place"
                                label="Birth Place"
                                type="text"
                                value={formData.emp_birth_place}
                                onChange={(value) => handleChange('emp_birth_place', value)}
                                placeholder="Masukkan Tempat Lahir"
                            />
                            <FormTextInput
                                id="emp_birth_date"
                                name="emp_birth_date"
                                label="Birth Date"
                                type="number"
                                value={formData.emp_birth_date}
                                onChange={(value) => handleChange('emp_birth_date', value)}
                                placeholder="Masukkan Tanggal Lahir"
                            />
                            <FormTextInput
                                id="emp_married_status"
                                name="emp_married_status"
                                label="Married Status"
                                type="text"
                                value={formData.emp_married_status}
                                onChange={(value) => handleChange('emp_married_status', value)}
                                placeholder="Masukkan Status Perkawinan"
                            />
                            <FormTextInput
                                id="emp_institution_origin"
                                name="emp_institution_origin"
                                label="Institution Origin"
                                type="text"
                                value={formData.emp_institution_origin}
                                onChange={(value) => handleChange('emp_institution_origin', value)}
                                placeholder="Masukkan Asal Institusi"
                            />
                            <FormTextInput
                                id="emp_areas_expertise"
                                name="emp_areas_expertise"
                                label="Areas of Expertise"
                                type="text"
                                value={formData.emp_areas_expertise}
                                onChange={(value) => handleChange('emp_areas_expertise', value)}
                                placeholder="Masukkan Bidang Keahlian"
                            />
                            <FormTextInput
                                id="emp_college_email"
                                name="emp_college_email"
                                label="College Email"
                                type="email"
                                value={formData.emp_college_email}
                                onChange={(value) => handleChange('emp_college_email', value)}
                                placeholder="Masukkan Email Institusi"
                            />
                            <FormTextInput
                                id="finger_account_number"
                                name="finger_account_number"
                                label="Finger Account Number"
                                type="text"
                                value={formData.finger_account_number}
                                onChange={(value) => handleChange('finger_account_number', value)}
                                placeholder="Masukkan Nomor Akun Finger"
                            />
                            <FormTextInput
                                id="sinta_id"
                                name="sinta_id"
                                label="Sinta ID"
                                type="text"
                                value={formData.sinta_id}
                                onChange={(value) => handleChange('sinta_id', value)}
                                placeholder="Masukkan Sinta ID"
                            />
                            <FormTextInput
                                id="orchid_id"
                                name="orchid_id"
                                label="Orchid ID"
                                type="text"
                                value={formData.orchid_id}
                                onChange={(value) => handleChange('orchid_id', value)}
                                placeholder="Masukkan Orchid ID"
                            />
                            <FormTextInput
                                id="scopus_id"
                                name="scopus_id"
                                label="Scopus ID"
                                type="text"
                                value={formData.scopus_id}
                                onChange={(value) => handleChange('scopus_id', value)}
                                placeholder="Masukkan Scopus ID"
                            />
                            <FormTextInput
                                id="nidn"
                                name="nidn"
                                label="NIDN"
                                type="text"
                                value={formData.nidn}
                                onChange={(value) => handleChange('nidn', value)}
                                placeholder="Masukkan NIDN"
                            />
                            <FormTextInput
                                id="nuptk"
                                name="nuptk"
                                label="NUPTK"
                                type="text"
                                value={formData.nuptk}
                                onChange={(value) => handleChange('nuptk', value)}
                                placeholder="Masukkan NUPTK"
                            />
                            <FormTextInput
                                id="nitk"
                                name="nitk"
                                label="NITK"
                                type="text"
                                value={formData.nitk}
                                onChange={(value) => handleChange('nitk', value)}
                                placeholder="Masukkan NITK"
                            />
                            <FormTextInput
                                id="nidk"
                                name="nidk"
                                label="NIDK"
                                type="text"
                                value={formData.nidk}
                                onChange={(value) => handleChange('nidk', value)}
                                placeholder="Masukkan NIDK"
                            />
                            <FormTextInput
                                id="nupn"
                                name="nupn"
                                label="NUPn"
                                type="text"
                                value={formData.nip}
                                onChange={(value) => handleChange('nupn', value)}
                                placeholder="Masukkan NUPN"
                            />
                            <FormTextInput
                                id="nbm"
                                name="nbm"
                                label="NBM"
                                type="text"
                                value={formData.nupt}
                                onChange={(value) => handleChange('nbm', value)}
                                placeholder="Masukkan NBM"
                            />
                            <FormTextInput
                                id="lecture_sertificate_date"
                                name="lecture_sertificate_date"
                                label="Lecture Sertificate Date"
                                type="number"
                                value={formData.lecture_sertificate_date}
                                onChange={(value) => handleChange('lecture_sertificate_date', value)}
                                placeholder="Masukkan Tanggal Sertifikat Dosen"
                            />
                            <FormTextInput
                                id="lecture_sertificate_number"
                                name="lecture_sertificate_number"
                                label="Lecture Sertificate Number"
                                type="text"
                                value={formData.lecture_sertificate_number}
                                onChange={(value) => handleChange('lecture_sertificate_number', value)}
                                placeholder="Masukkan Nomor Sertifikat Dosen"
                            />
                            <Button
                                type="submit"
                                className={`mb-5 rounded px-4 py-2 font-bold text-white ${defaultValues ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-700 hover:bg-green-600'}`}
                            >
                                {defaultValues ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default ModalForm;
