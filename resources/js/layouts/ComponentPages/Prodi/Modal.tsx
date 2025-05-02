import { Button } from '@/components/ui/button';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectItem } from '@/components/ui/select';
import { useAxios } from '@/hooks/useAxios';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};
const schema = z.object({
    sp_code: z.string().min(1),
    idn_sp_name: z.string().min(3),
    eng_sp_name : z.string().min(3),
    eng_short_name: z.string().min(1),
    idn_short_name: z.string().min(1),
    min_credits_pass: z.coerce.number().min(1),
    min_pass_gpa: z.coerce.number().min(0),
    final_project_req: z.boolean(),
    ukom_req: z.boolean(),
    max_lecturer_advisors: z.coerce.number().min(1),
    max_examiner_lecturers: z.coerce.number().min(1),
    sp_address: z.string(),
    sp_phone: z.string(),
    sp_email_address: z.string().email(),
    sp_web_address: z.string().url(),
    sp_description: z.string(),
    sp_vision: z.string(),
    sp_mission: z.string(),
    sp_competencies: z.string(),
    program_learning_outcomes: z.string(),
    faculty_id: z.string(),
    academic_periods_id: z.string(),
    final_project_types_id: z.string(),
    study_program_accreditations_id: z.string(),
    univ_education_levels_id: z.string(),
});



type FormInputs = z.infer<typeof schema>;

const ModalForm = ({
    open,
    onOpenChange,
    submit,
    defaultValues,
}: ModalProps) => {
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

    

    useEffect(() => {
        if (defaultValues) {
            reset({
                sp_code: defaultValues.sp_code || '',
                idn_sp_name: defaultValues.idn_sp_name || '',
                eng_sp_name: defaultValues.eng_sp_name || '' ,
                idn_short_name: defaultValues.idn_short_name || '',
                eng_short_name: defaultValues.eng_short_name || '',
                min_credits_pass: defaultValues.min_credits_pass || 0,
                min_pass_gpa: defaultValues.min_pass_gpa || 0,
                final_project_req: Boolean(defaultValues.final_project_req) || false,
                ukom_req: Boolean(defaultValues.ukom_req) || false,
                max_lecturer_advisors: defaultValues.max_lecturer_advisors || 0,
                max_examiner_lecturers: defaultValues.max_examiner_lecturers || 0,
                sp_address: defaultValues.sp_address || '',
                sp_phone: defaultValues.sp_phone || '',
                sp_email_address: defaultValues.sp_email_address || '',
                sp_web_address: defaultValues.sp_web_address || '',
                sp_description: defaultValues.sp_description || '',
                sp_vision: defaultValues.sp_vision || '',
                sp_mission: defaultValues.sp_mission || '',
                sp_competencies: defaultValues.sp_competencies || '',
                program_learning_outcomes: defaultValues.program_learning_outcomes || '',
                faculty_id: String(defaultValues.faculty_id) || '',
                academic_periods_id: String(defaultValues.academic_periods_id) || '',
                final_project_types_id: String(defaultValues.final_project_types_id) || '',
                study_program_accreditations_id: String(defaultValues.study_program_accreditations_id) || '',
                univ_education_levels_id: String(defaultValues.univ_education_levels_id) || '',
            });
        } else {
            reset({
                sp_code: '',
                idn_sp_name: '',
                eng_sp_name: '',
                idn_short_name: '',
                eng_short_name: '',
                min_credits_pass: 0,
                min_pass_gpa: 0,
                final_project_req: false,
                ukom_req: false,
                max_lecturer_advisors: 0,
                max_examiner_lecturers: 0,
                sp_address: '',
                sp_phone: '',
                sp_email_address: '',
                sp_web_address: '',
                sp_description: '',
                sp_vision: '',
                sp_mission: '',
                sp_competencies: '',
                program_learning_outcomes: '',
                faculty_id: '',
                academic_periods_id: '',
                final_project_types_id: '',
                study_program_accreditations_id: '',
                univ_education_levels_id: '',
            });
        }
    }, [defaultValues, reset]);

    const {get} =  useAxios();

    const [ Facultas, setFakultas] = useState<any>([]);
    const [ AcademicPeriod, setAcademicPeriod ] = useState<any>([]);
    const [ FinalProject, setFinalProdject ] =useState<any>([]);
    const [ AcreditationProdi, setAcreditationProdi] = useState<any>([]);
    const [ UnivEducation, setUnivEducation] =useState<any>([])

    const fecthData = async ()=>{
        try {
            const resFacultas: any = await get('/faculty');
            setFakultas(resFacultas.data.data);

            const resAcademicPeriod: any = await get('/academic-period');
            setAcademicPeriod(resAcademicPeriod.data.data);

            const resFinalProject: any = await get('/final-project-type');
            setFinalProdject(resFinalProject.data.data);

            const resAcreditationProdi: any = await get('/study-program-accreditations');
            setAcreditationProdi(resAcreditationProdi.data.data);

            const resUnivEducation: any = await get('/univ-education-level');
            setUnivEducation(resUnivEducation.data.data);
            
        } catch (err) {
            console.error('Error fetching:', err);
        }
    }
    useEffect(() => {
        fecthData();
    }, []);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const result = await submit(data, defaultValues?.id);
            if (result != null && !isSubmitting && !defaultValues) {
                reset();
            }
        } catch (error: any) {
            setError('root', {
                type: 'manual',
                message: error?.response?.meta?.message || 'Something went wrong',
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-hidden p-6">
                <DialogHeader>
                    <DialogTitle>{defaultValues ? 'Edit Study-Program' : 'Add Study-Program'}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4 px-2">
                            <FormTextInput
                                id="sp_code"
                                label="code"
                                {...register('sp_code')}
                                error={errors.sp_code?.message}
                            />
                            <FormTextInput
                                id="idn_sp_name"
                                label="Program Name (ID)"
                                {...register('idn_sp_name')}
                                error={errors.idn_sp_name?.message}
                            />
                            <FormTextInput
                                id="eng_sp_name"
                                label="Program Name (eng)"
                                {...register('eng_sp_name')}
                                error={errors.eng_sp_name?.message}
                            />
                            <FormTextInput
                                id="idn_short_name"
                                label="Short Name (IDN)"
                                type="text"
                                {...register('idn_short_name')}
                                error={errors.idn_short_name?.message}
                            />
                            <FormTextInput
                                id="eng_short_name"
                                label="Short Name (ENG)"
                                type="text"
                                {...register('eng_short_name')}
                                error={errors.eng_short_name?.message}
                            />
                            <FormTextInput
                                id="min_credits_pass"
                                label="Min Credits"
                                type="number"
                                {...register('min_credits_pass')}
                                error={errors.min_credits_pass?.message}
                            />
                            <FormTextInput
                                id="min_pass_gpa"
                                label="Min GPA"
                                type="number"
                                step="0.01"
                                {...register('min_pass_gpa')}
                                error={errors.min_pass_gpa?.message}
                            />
                            <Controller
                                control={control}
                                name="final_project_req"
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="final_project_req"
                                        label="Final Project Required"
                                        value={String(field.value)}
                                        onValueChange={(val) => field.onChange(val === 'true')}
                                        error={errors.final_project_req?.message || ''}
                                    >
                                        <SelectItem value="true">Yes</SelectItem>
                                        <SelectItem value="false">No</SelectItem>
                                    </FormSelectInput>
                                )}
                            />
                            <Controller
                                control={control}
                                name="ukom_req"
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="ukom_req"
                                        label="Ukom Required"
                                        value={String(field.value)}
                                        onValueChange={(val) => field.onChange(val === 'true')}
                                        error={errors.ukom_req?.message || ''}
                                    >
                                        <SelectItem value="true">Yes</SelectItem>
                                        <SelectItem value="false">No</SelectItem>
                                    </FormSelectInput>
                                )}
                            />
                            <FormTextInput
                                id="max_lecturer_advisors"
                                label="Max Advisors"
                                type="number"
                                {...register('max_lecturer_advisors')}
                                error={errors.max_lecturer_advisors?.message}
                            />
                            <FormTextInput
                                id="max_examiner_lecturers"
                                label="Max Examiners"
                                type="number"
                                {...register('max_examiner_lecturers')}
                                error={errors.max_examiner_lecturers?.message}
                            />
                            <FormTextInput
                                id="sp_address"
                                label="Address"
                                type="text"
                                {...register('sp_address')}
                                error={errors.sp_address?.message}
                            />
                            <FormTextInput id="sp_phone" label="Phone" {...register('sp_phone')} error={errors.sp_phone?.message} />
                            <FormTextInput
                                id="sp_email_address"
                                label="Email"
                                type="email"
                                {...register('sp_email_address')}
                                error={errors.sp_email_address?.message}
                            />
                            <FormTextInput
                                id="sp_web_address"
                                label="Website"
                                type="url"
                                {...register('sp_web_address')}
                                error={errors.sp_web_address?.message}
                            />
                            <FormTextInput
                                id="sp_competencies"
                                label="Competencies"
                                {...register('sp_competencies')}
                                error={errors.sp_competencies?.message}
                            />
                            <FormTextInput
                                id="program_learning_outcomes"
                                label="Learning Outcomes"
                                {...register('program_learning_outcomes')}
                                error={errors.program_learning_outcomes?.message}
                            />
                            <Controller
                                name="faculty_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="faculty_id"
                                        label="Faculty"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.faculty_id?.message}
                                    >
                                        {Facultas.map((Fakultas: any) => (
                                            <SelectItem key={Fakultas.id} value={String(Fakultas.id)}>
                                                {Fakultas.name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />
                            <Controller
                                name="academic_periods_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="academic_periods_id"
                                        label="Academic Periode"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.academic_periods_id?.message}
                                    >
                                        {AcademicPeriod.map((Academic: any) => (
                                            <SelectItem key={Academic.id} value={String(Academic.id)}>
                                                {Academic.name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />
                            <Controller
                                name="final_project_types_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="final_project_types_id"
                                        label="Final Project Type"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.final_project_types_id?.message}
                                    >
                                        {FinalProject.map((Final: any) => (
                                            <SelectItem key={Final.id} value={String(Final.id)}>
                                                {Final.name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />
                            <Controller
                                name="study_program_accreditations_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="study_program_accreditations_id"
                                        label="Prodi Accreditations"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.study_program_accreditations_id?.message}
                                    >
                                        {AcreditationProdi.map((Acreditation: any) => (
                                            <SelectItem key={Acreditation.id} value={String(Acreditation.id)}>
                                                {Acreditation.accreditation_score}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />
                            <Controller
                                name="univ_education_levels_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="univ_education_levels_id"
                                        label="Univ Education Level"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.univ_education_levels_id?.message}
                                    >
                                        {UnivEducation.map((Univ: any) => (
                                            <SelectItem key={Univ.id} value={String(Univ.id)}>
                                                {Univ.edu_study_period}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />
                            <FormTextInput
                                id="sp_vision"
                                label="Vision"
                                type="textarea"
                                {...register('sp_vision')}
                                error={errors.sp_vision?.message}
                            />
                            <FormTextInput
                                id="sp_mission"
                                label="Mission"
                                type="textarea"
                                {...register('sp_mission')}
                                error={errors.sp_mission?.message}
                            />
                            <FormTextInput
                                id="sp_description"
                                label="Description"
                                type="textarea"
                                {...register('sp_description')}
                                error={errors.sp_description?.message}
                            />
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button
                                type="submit"
                                className={`rounded px-4 py-2 font-bold text-white ${defaultValues ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-500 hover:bg-green-600'}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Loading...' : defaultValues ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default ModalForm;
