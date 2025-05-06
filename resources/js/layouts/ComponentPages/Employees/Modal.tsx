import { Button } from '@/components/ui/button';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectItem } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEmployees } from './useEmploye';
import DateInput from '@/components/ui/Components_1/DateInput';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};
const schema = z.object({
    nip: z.string().min(1, 'NIP Harus Lebih Dari 1 Karakter'),
    name: z.string().min(1, 'Nama Harus Lebih Dari 1 Karakter'),
    foto: z.string().nullable(),
    front_title: z.string().min(1, 'Nama Harus Lebih Dari 1 Karakter').nullable(),
    back_title: z.string().min(1, 'Nama Harus Lebih Dari 1 Karakter'),
    gender: z.string(),
    religion: z.string(),
    birth_place: z.string(),
    birth_date: z.string(),
    email_pt: z.string().email('Email tidak valid'),    
    phone: z.string(),
    emergency_phone: z.string().nullable(),
    relationship_1: z.string().nullable(),
    emergency_phone_2: z.string().nullable(),
    relationship_2: z.string().nullable(),
    status: z.boolean(),
    type: z.string(),
    lecture_status_id: z.string().nullable(),
    staff_status_id: z.string().nullable(),
    study_programs_id: z.string(),
    funtional_position_id: z.string().nullable(),
    pns_rank: z.string().nullable(),
    struktural_position_id: z.string().nullable(),
    staff_division_id: z.string().nullable(),
    nidn: z.number().nullable(),
    nuptk: z.number().nullable(),
    nitk: z.number().nullable(),
    nidk: z.number().nullable(),

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

    useEffect(() => {
        if (defaultValues) {
            reset({
                nip: defaultValues.nip || '',
                name: defaultValues.full_name || '',
                foto: defaultValues.foto || '',
                front_title: defaultValues.front_title || '',
                back_title: defaultValues.back_title || '',
                gender: defaultValues.gender || '',
                religion: defaultValues.religion || '',
                birth_place: defaultValues.birth_place || '',
                birth_date: defaultValues.birth_date || '',
                email_pt: defaultValues.email_pt || '',
                phone: defaultValues.phone || '',
                emergency_phone: defaultValues.emergency_phone || '',
                relationship_1: defaultValues.relationship_1 || '',
                emergency_phone_2: defaultValues.emergency_phone_2 || '',
                relationship_2: defaultValues.relationship_2 || '',
                status: defaultValues.status || false,
                type: defaultValues.type || '',
                lecture_status_id: String( defaultValues.lecture_status_id )|| '0',
                staff_status_id: String( defaultValues.staff_status_id )|| '0',
                funtional_position_id: String( defaultValues.funtional_position_id )|| '0',
                pns_rank: String( defaultValues.pns_rank )|| '0',
                struktural_position_id: String( defaultValues.struktural_position_id )|| '0',
                staff_division_id: String( defaultValues.staff_division_id )|| '0',
                study_programs_id: String( defaultValues.study_programs_id )|| '0',
                nidn: defaultValues.nidn || null,
                nuptk: defaultValues.nuptk || '',
                nitk: defaultValues.nitk || '',
                nidk: defaultValues.nidk || '',
                
            });
        } else {
            reset({
                nip: '',
                name: '',
                foto: null,
                front_title: null,
                back_title: '',
                gender: '',
                religion: '',
                birth_place: '',
                birth_date: '',
                email_pt: '',
                phone: '',
                emergency_phone: '',
                relationship_1: '',
                emergency_phone_2: '',
                relationship_2: '',
                status: false,
                type: '',
                lecture_status_id: '',
                staff_status_id: '',
                funtional_position_id: '',
                pns_rank: '',
                struktural_position_id: '',
                staff_division_id: '',
                study_programs_id: '',
                nidn: null,
                nuptk: null,
                nitk: null,
                nidk: null,
               
            });
        }
    }, [defaultValues, reset]);

    const { lecturestatus, staffstatus, studyprogram, functionalposition, strukturalposition, staffdivision, fecthRelasi} = useEmployees();

    useEffect(() => {
        fecthRelasi();  
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
                    <DialogTitle>{defaultValues ? 'Edit Pegawai' : 'Tambah Pegawai Baru'}</DialogTitle>
                </DialogHeader>
                <DialogDescription>Isi semua kolom di bawah ini.</DialogDescription>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <FormTextInput
                                id="nip"
                                type="text"
                                label="NIP"
                                placeholder="Enter  NIP"
                                {...register('nip')}
                                error={errors.nip?.message}
                            />
                            <FormTextInput
                                id="name"
                                type="text"
                                label="Nama"
                                placeholder="Enter Name"
                                {...register('name')}
                                error={errors.name?.message}
                            />
                            <FormTextInput
                                id="front_title"
                                type="text"
                                label="Nama Depan"
                                placeholder="Enter Nama Depan"
                                {...register('front_title')}
                                error={errors.front_title?.message}
                            />
                            <FormTextInput
                                id="back_title"
                                type="text"
                                label="Nama Belakang"
                                placeholder="Enter Nama Belakang"
                                {...register('back_title')}
                                error={errors.back_title?.message}
                            />
                            <FormTextInput
                                id="gender"
                                type="text"
                                label="Jenis Kelamin"
                                placeholder="Enter Jenis Kelamin"
                                {...register('gender')}
                                error={errors.gender?.message}
                            />
                            <FormTextInput
                                id="religion"
                                type="text"
                                label="Agama"
                                placeholder="Enter Agama"
                                {...register('religion')}
                                error={errors.religion?.message}
                            />
                            <FormTextInput
                                id="birth_place"
                                type="text"
                                label="Tempat Lahir"
                                placeholder="Enter Tempat Lahir"
                                {...register('birth_place')}
                                error={errors.birth_place?.message}
                            />
                            <DateInput
                                id="birth_date"
                                label="Tanggal Lahir"
                                placeholder="Enter Tanggal Lahir"
                                register={register('birth_date')}
                                error={errors.birth_date}
                            />
                            
                            <FormTextInput
                                id="nidn"
                                type="text"
                                label="NIDN"
                                placeholder="Enter NIDN"
                                {...register('nidn')}
                                error={errors.nidn?.message}
                            />
                            <FormTextInput
                                id="nuptk"
                                type="text"
                                label="NUPTK"
                                placeholder="Enter NUPTK"
                                {...register('nuptk')}
                                error={errors.nuptk?.message}
                            />
                            <FormTextInput
                                id="nitk"
                                type="text"
                                label="NITK"
                                placeholder="Enter NITK"
                                {...register('nitk')}
                                error={errors.nitk?.message}
                            />
                            <FormTextInput
                                id="nidk"
                                type="text"
                                label="NIDK"
                                placeholder="Enter NIDK"
                                {...register('nidk')}
                                error={errors.nidk?.message}
                            />

                            <Controller
                                name="study_programs_id"
                                control={control}
                                rules={{ required: 'Study Program is required' }}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="study_programs_id"
                                        label="Program Studi"
                                        value={String(field.value)}
                                        onValueChange={field.onChange}
                                        error={errors.study_programs_id?.message}
                                    >
                                        {studyprogram.map((studyProgram: any) => (
                                            <SelectItem key={studyProgram.id} value={String(studyProgram.id)}>
                                                {studyProgram.idn_sp_name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />
                            <Controller
                                name="lecture_status_id"
                                control={control}
                                rules={{ required: 'Status Tendik is required' }}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="lecture_status_id"
                                        label="Status Tendik"
                                        value={String(field.value)}
                                        onValueChange={field.onChange}
                                        error={errors.lecture_status_id?.message}
                                    >
                                        {lecturestatus.map((lecturestatus: any) => (
                                            <SelectItem key={lecturestatus.id} value={String(lecturestatus.id)}>
                                                {lecturestatus.name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />
                            <Controller
                                name="staff_status_id"
                                control={control}
                                rules={{ required: 'Staff Status is required' }}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="staff_status_id"
                                        label="Status Tendik"
                                        value={String(field.value)}
                                        onValueChange={field.onChange}
                                        error={errors.staff_status_id?.message}
                                    >
                                        {staffstatus.map((staffStatus: any) => (
                                            <SelectItem key={staffStatus.id} value={String(staffStatus.id)}>
                                                {staffStatus.name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />
                            <Controller
                                name="struktural_position_id"
                                control={control}
                                rules={{ required: 'Jabatan Structural is required' }}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="struktural_position_id"
                                        label="Jabatan Struktural"
                                        value={String(field.value)}
                                        onValueChange={field.onChange}
                                        error={errors.struktural_position_id?.message}
                                    >
                                        {strukturalposition.map((strukturalposition: any) => (
                                            <SelectItem key={strukturalposition.id} value={String(strukturalposition.id)}>
                                                {strukturalposition.name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />
                            <Controller
                                name="funtional_position_id"
                                control={control}
                                rules={{ required: 'Funtional Position is required' }}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="funtional_position_id"
                                        label="Jabatan Fungsional"
                                        value={String(field.value)}
                                        onValueChange={field.onChange}
                                        error={errors.funtional_position_id?.message}
                                    >
                                        {functionalposition.map((functionalposition: any) => (
                                            <SelectItem key={functionalposition.id} value={String(functionalposition.id)}>
                                                {functionalposition.name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />
                            <Controller
                                name="staff_division_id"
                                control={control}
                                rules={{ required: 'Tendik Divisi is required' }}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="staff_division_id"
                                        label="Tendik Divisi"
                                        value={String(field.value)}
                                        onValueChange={field.onChange}
                                        error={errors.staff_division_id?.message}
                                    >
                                        {staffdivision.map((staffdivision: any) => (
                                            <SelectItem key={staffdivision.id} value={String(staffdivision.id)}>
                                                {staffdivision.name}
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

