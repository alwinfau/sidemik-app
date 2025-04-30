import { Button } from "@/components/ui/button";
import { FormSelectInput, FormTextInput } from "@/components/ui/Components_1/FormInput";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectItem } from "@/components/ui/select";
import { useAxios } from "@/hooks/useAxios";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { Controller, Form, set, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { use, useEffect, useState } from "react";

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};
    const schema = z.object({
        emp_nip: z.string().min(1, 'NIP Harus Lebih Dari 1 Karakter'),
        emp_full_name: z.string().min(1, 'Nama Harus Lebih Dari 1 Karakter'),
        emp_front_title: z.string().min(1, 'Nama Harus Lebih Dari 1 Karakter').nullable(),
        emp_back_title: z.string().min(1, 'Nama Harus Lebih Dari 1 Karakter').nullable(),
        emp_gender: z.string(),
        emp_religion: z.string(),
        emp_birth_place: z.string(),
        emp_birth_date: z.string(),
        emp_married_status: z.string(),
        study_programs_id: z.string(),
        active_statuses_id: z.string(),
        employments_relationships_id: z.string(),
        academic_positions_id: z.string(),
        emp_institution_origin: z.string().min(1, 'Asal Institusi Harus Lebih Dari 1 Karakter'),
        emp_areas_expertise: z.string().min(1, 'Bidang Keahlian Harus Lebih Dari 1 Karakter'),
        emp_collage_email: z.string().email('Email tidak valid'),
        finger_account_number: z.string().min(1, 'Nomor Akun Finger Harus Lebih Dari 1 Karakter'),
        sinta_id: z.string().nullable(),
        orchid_id: z.string().nullable(),
        scopus_id: z.string().nullable(),
        nidn: z.number().nullable(),
        nuptk: z.number().nullable(),
        nitk: z.number().nullable(),
        nidk: z.number().nullable(),
        nupn: z.number().nullable(),
        nbm: z.number().nullable(),
        lecturer_certification_date: z.string(),
        lecturer_certification_number: z.string(),
    });

type FormInputs = z.infer<typeof schema>;

const ModalForm = ({ open, onOpenChange, submit, defaultValues }: ModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        control,
        formState: { errors, isSubmitting },
    } = useForm<FormInputs>({
        resolver: zodResolver(schema),
    });

    const { get, post, put } = useAxios();
    const [studyPrograms, setStudyPrograms] = useState<any>([]);
    const [academicPosition, setAcademicPosition] = useState<any>([]);
    const [activeStatuses, setActiveStatuses] = useState<any>([]);
    const [employmentsRelationships, setEmploymentsRelationships] = useState<any>([]);

    const fetchEmployees = async () => {
        try {
            const resStatus:any = await get('/active-statuses');
            const resAcademicPosition:any = await get('/academic-positions');
            const resEmpRelationship:any = await get('/employments-relationship');
            const resStudyPrograms:any = await get('/study-program');
            setStudyPrograms(resStudyPrograms.data.data);
            setAcademicPosition(resAcademicPosition.data.data);
            setActiveStatuses(resStatus.data.data);
            setEmploymentsRelationships(resEmpRelationship.data.data);
        } catch (err) {
            console.error('Error fetching employees:', err);
        }
    };

    console.log(activeStatuses);
    console.log(employmentsRelationships );
    console.log(studyPrograms);
    useEffect(() => {
        fetchEmployees();
    }
    , []);

    useEffect(() => {
        if (defaultValues) {
            reset({
                emp_nip: defaultValues.emp_nip ||"",
                emp_full_name: defaultValues.emp_full_name || "",
                emp_front_title: defaultValues.emp_front_title ||"",
                emp_back_title: defaultValues.emp_back_title ||"",
                emp_gender: defaultValues.emp_gender ||"",
                emp_religion: defaultValues.emp_religion ||"",
                emp_birth_place: defaultValues.emp_birth_place ||"",
                emp_birth_date: defaultValues.emp_birth_date ||"",
                emp_married_status: defaultValues.emp_married_status ||"",
                study_programs_id: defaultValues.study_programs_id ||"",
                active_statuses_id: defaultValues.active_statuses_id ||"",
                employments_relationships_id: defaultValues.employments_relationships_id ||"",
                academic_positions_id: defaultValues.academic_positions_id ||"",
                emp_institution_origin: defaultValues.emp_institution_origin ||"", 
                emp_areas_expertise: defaultValues.emp_areas_expertise ||"",
                emp_collage_email: defaultValues.emp_collage_email ||"",
                finger_account_number: defaultValues.finger_account_number ||"",
                sinta_id: defaultValues.sinta_id ||"",
                orchid_id: defaultValues.orchid_id ||"",
                scopus_id: defaultValues.scopus_id ||"",
                nidn: defaultValues.nidn ||null,
                nuptk: defaultValues.nuptk ||"",
                nitk: defaultValues.nitk ||"",
                nidk: defaultValues.nidk ||"",
                nupn: defaultValues.nupn ||"",
                nbm: defaultValues.nbm ||"",
                lecturer_certification_date: defaultValues.lecturer_certification_date ||"",
                lecturer_certification_number: defaultValues.lecturer_certification_number ||"",
            });
        } else {
            reset({
                emp_nip: '',
                emp_full_name:'',
                emp_front_title: null,
                emp_back_title: null,
                emp_gender: '',
                emp_religion: '',
                emp_birth_place: '',
                emp_birth_date: '',
                emp_married_status: '',
                study_programs_id: '',
                active_statuses_id: "",
                employments_relationships_id: "",
                academic_positions_id: "",
                emp_institution_origin: '',
                emp_areas_expertise: '',
                emp_collage_email: '',
                finger_account_number: '',
                sinta_id: null,
                orchid_id: null,
                scopus_id: null,
                nidn: null,
                nuptk: null,
                nitk: null,
                nidk: null,
                nupn: null,
                nbm: null,
                lecturer_certification_date: '',
                lecturer_certification_number: '',
            });
        }
    }, [defaultValues, reset]);

   const onSubmit: SubmitHandler<FormInputs>  = async (data) => {
        try {
            const result = await submit(data, defaultValues?.id);
            if (result != null) {
                if (!isSubmitting && !defaultValues) {
                    reset({
                        emp_nip: '',
                        emp_full_name:'',
                        emp_front_title: null,
                        emp_back_title: null,
                        emp_gender: '',
                        emp_religion: '',
                        emp_birth_place: '',
                        emp_birth_date: '',
                        emp_married_status: '',
                        study_programs_id: '',
                        active_statuses_id: "",
                        employments_relationships_id: "",
                        academic_positions_id: "",
                        emp_institution_origin: '',
                        emp_areas_expertise: '',
                        emp_collage_email: '',
                        finger_account_number: '',
                        sinta_id: null,
                        orchid_id: null,
                        scopus_id: null,
                        nidn: null,
                        nuptk: null,
                        nitk: null,
                        nidk: null,
                        nupn: null,
                        nbm: null,
                        lecturer_certification_date: '',
                        lecturer_certification_number: '',
                    });
                }
            }
        } catch (error: any) {
            setError('root',
                { type: "manual", 
                message: error?.response?.meta?.message || "Error occurred" },
            );
        }
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-hidden p-6">
                <DialogHeader>
                    <DialogTitle>{defaultValues ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                        <FormTextInput
                                    id="emp_nip"
                                    type="text"
                                    label="Employee NIP"
                                    placeholder="Enter Employee NIP"
                                    {...register("emp_nip")}
                                    error={errors.emp_nip?.message}
                                    
                                />
                             <FormTextInput
                                    id="emp_full_name"
                                    type="text"
                                    label="Full Name"
                                    placeholder="Enter Full Name"
                                    {...register("emp_full_name")}
                                    error={errors.emp_full_name?.message}
                                    
                                />
                            <FormTextInput
                               id="emp_front_title"
                               type="text"
                               label="Emp Front Title"
                               placeholder="Enter Front Title"
                               {...register("emp_front_title")}
                               error={errors.emp_front_title?.message}
                            />
                            <FormTextInput
                               id="emp_back_title"
                               type="text"
                               label="Emp Back Title"
                               placeholder="Enter Back Title"
                               {...register("emp_back_title")}
                               error={errors.emp_back_title?.message}
                            />
                            <FormTextInput
                               id="emp_gender"
                               type="text"
                               label="Emp Gender"
                               placeholder="Enter Gender"
                               {...register("emp_gender")}
                               error={errors.emp_gender?.message}
                            />
                            <FormTextInput
                                 id="emp_religion"
                                 type="text"
                                label="Religion"
                                placeholder="Enter Religion"
                                {...register("emp_religion")}
                                error={errors.emp_religion?.message}
                            />
                            <FormTextInput
                                 id="emp_birth_place"
                                 type="text"
                                label="Birth Place"
                                placeholder="Enter Birth Place"
                                {...register("emp_birth_place")}
                                error={errors.emp_birth_place?.message}
                            />
                            <FormTextInput
                                 id="emp_birth_date"
                                 type="text"
                                label="Birth Date"
                                placeholder="Enter Birth Date"
                                {...register("emp_birth_date")}
                                error={errors.emp_birth_date?.message}
                            />
                            <FormTextInput
                                 id="emp_married_status"
                                 type="text"
                                label="Married Status"
                                placeholder="Enter Married Status"
                                {...register("emp_married_status")}
                                error={errors.emp_married_status?.message}
                            />
                            <FormTextInput
                                 id="emp_institution_origin"
                                 type="text"
                                label="Institution Origin"
                                placeholder="Enter Institution Origin"
                                {...register("emp_institution_origin")}
                                error={errors.emp_institution_origin?.message}
                            />
                            <FormTextInput
                                 id="emp_areas_expertise"
                                 type="text"
                                label="Areas of Expertise"
                                placeholder="Enter Areas of Expertise"
                                {...register("emp_areas_expertise")}
                                error={errors.emp_areas_expertise?.message}
                            />
                            <FormTextInput
                                 id="emp_collage_email"
                                 type="text"
                                label="Collage Email"
                                placeholder="Enter Collage Email"
                                {...register("emp_collage_email")}
                                error={errors.emp_collage_email?.message}
                            />
                            <FormTextInput
                                    id="finger_account_number"
                                    type="text"
                                    label="Finger Account Number"
                                    placeholder="Enter Finger Account Number"
                                    {...register("finger_account_number")}
                                    error={errors.finger_account_number?.message}
                                />
                            <FormTextInput
                                    id="sinta_id"
                                    type="text"
                                    label="Sinta ID"
                                    placeholder="Enter Sinta ID"
                                    {...register("sinta_id")}
                                    error={errors.sinta_id?.message}
                                />
                            <FormTextInput
                                    id="orchid_id"
                                    type="text"
                                    label="Orchid ID"
                                    placeholder="Enter Orchid ID"
                                    {...register("orchid_id")}
                                    error={errors.orchid_id?.message}
                                />
                            <FormTextInput
                                    id="scopus_id"
                                    type="text"
                                    label="Scopus ID"
                                    placeholder="Enter Scopus ID"
                                    {...register("scopus_id")}
                                    error={errors.scopus_id?.message}
                                />
                            <FormTextInput
                                    id="nidn"
                                    type="text"
                                    label="NIDN"
                                    placeholder="Enter NIDN"
                                    {...register("nidn")}
                                    error={errors.nidn?.message}
                                />
                            <FormTextInput
                                id="nuptk"
                                type="text"
                                label="NUPTK"
                                placeholder="Enter NUPTK"
                                {...register("nuptk")}
                                error={errors.nuptk?.message}
                            />
                            <FormTextInput
                                id="nitk"
                                type="text"
                                label="NITK"
                                placeholder="Enter NITK"
                                {...register("nitk")}
                                error={errors.nitk?.message}
                            />
                            <FormTextInput
                                id="nidk"
                                type="text"
                                label="NIDK"
                                placeholder="Enter NIDK"
                                {...register("nidk")}
                                error={errors.nidk?.message}
                            />
                            <FormTextInput
                                id="nupn"
                                type="text"
                                label="NUPN"
                                placeholder="Enter NUPN"
                                {...register("nupn")}
                                error={errors.nupn?.message}
                            />
                            <FormTextInput
                                id="nbm"
                                type="text"
                                label="NBM" 
                                placeholder="Enter NBM"
                                {...register("nbm")}
                                error={errors.nbm?.message}
                            />
                            <FormTextInput
                                id="lecturer_certification_date"
                                type="text"
                                label="Lecturer Certification Date"
                                placeholder="Enter Lecturer Certification Date"
                                {...register("lecturer_certification_date")}
                                error={errors.lecturer_certification_date?.message}
                            />
                            <FormTextInput
                                id="lecturer_certification_number"
                                type="text"
                                label="Lecturer Certification Number"
                                placeholder="Enter Lecturer Certification Number"
                                {...register("lecturer_certification_number")}
                                error={errors.lecturer_certification_number?.message}
                            />
                            
                            <Controller
                                name="academic_positions_id"
                                control={control}
                                rules={{ required: "Academic Position is required" }}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="academic_positions_id"
                                        label="Academic Position"
                                        value={String(field.value)}
                                        onValueChange={field.onChange}
                                        error={errors.academic_positions_id?.message}
                                    >
                                        {academicPosition.map((academicPosition: any) => (
                                            <SelectItem key={academicPosition.id} value={String(academicPosition.id)}>
                                                {academicPosition.academic_position_name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />
                            <Controller
                                name="active_statuses_id"
                                control={control}
                                rules={{ required: "Active Status is required" }}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="active_statuses_id"
                                        label="Active Status"
                                        value={String(field.value)}
                                        onValueChange={field.onChange}
                                        error={errors.active_statuses_id?.message}
                                    >
                                        {activeStatuses.map((activeStatus: any) => (
                                            <SelectItem key={activeStatus.id} value={String(activeStatus.id)}>
                                                {activeStatus.active_status_name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />
                            <Controller
                                name = "employments_relationships_id"
                                control={control}
                                rules={{ required: "Employment Relationship is required" }}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="employments_relationships_id"
                                        label="Employment Relationship"
                                        value={String(field.value)}
                                        onValueChange={field.onChange}
                                        error={errors.employments_relationships_id?.message}
                                    >
                                        {employmentsRelationships.map((employmentRelationship: any) => (
                                            <SelectItem key={employmentRelationship.id} value={String(employmentRelationship.id)}>
                                                {employmentRelationship.name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />
                            <Controller
                                name = "study_programs_id"
                                control={control}
                                rules={{ required: "Study Program is required" }}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="study_programs_id"
                                        label="Study Program"
                                        value={String(field.value)}
                                        onValueChange={field.onChange}
                                        error={errors.study_programs_id?.message}
                                    >
                                        {studyPrograms.map((studyPrograms: any) => (
                                            <SelectItem key={studyPrograms.id} value={String(studyPrograms.id)}>
                                                {studyPrograms.idn_sp_name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
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
