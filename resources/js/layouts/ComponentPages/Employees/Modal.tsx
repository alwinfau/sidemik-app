import { Button } from '@/components/ui/button';
import DateInput from '@/components/ui/Components_1/DateInput';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/swicth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEmployees } from './useEmploye';
import { SelectItem } from '@/components/ui/select';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};
const schema = z.object({
    nip: z.string(),
    name: z.string(),
    foto: z.string().nullable(),
    front_title: z.string().nullable(),
    back_title: z.string(),
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
    nidn: z.string().nullable(),
    nuptk: z.string().nullable(),
    nitk: z.string().nullable(),
    nidk: z.string().nullable(),
});

type FormInputs = z.infer<typeof schema>;

const ModalForm = ({ open, onOpenChange, submit, defaultValues }: ModalProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        setError,
        control,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<FormInputs>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (defaultValues) {
            reset({
                nip: defaultValues.nip || '',
                name: defaultValues.full_name || '',
                foto: defaultValues.foto || null,
                front_title: defaultValues.front_title || '',
                back_title: defaultValues.back_title || '',
                gender: (defaultValues.gender) || '',
                religion: defaultValues.religion || '',
                birth_place: defaultValues.birth_place || '',
                birth_date: defaultValues.birth_date || '',
                email_pt: defaultValues.email_pt || '',
                phone: defaultValues.phone || '',
                emergency_phone: defaultValues.emergency_phone || '',
                relationship_1: defaultValues.relationship_1 || '',
                emergency_phone_2: defaultValues.emergency_phone_2 || '',
                relationship_2: defaultValues.relationship_2 || '',
                status: Boolean(defaultValues.status) || false,
                type: defaultValues.type || '',

                lecture_status_id: String(defaultValues.lecture_status_id) || '0',
                staff_status_id: String(defaultValues.staff_status_id) || '0',
                funtional_position_id: String(defaultValues.funtional_position_id) || '0',
                pns_rank: String(defaultValues.pns_rank) || '0',
                struktural_position_id: String(defaultValues.struktural_position_id) || '0',
                staff_division_id: String(defaultValues.staff_division_id) || '0',
                study_programs_id: String(defaultValues.study_programs_id) || '0',
                nidn: defaultValues.nidn || "",
                nuptk: defaultValues.nuptk || "",
                nitk: defaultValues.nitk || "",
                nidk: defaultValues.nidk || "",

            });
        } else {
            reset({
                nip: '',
                name: '',
                foto: "",
                front_title: "",
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
                type: 'lecture',
                lecture_status_id: '',
                staff_status_id: '',
                funtional_position_id: '',
                pns_rank: '',
                struktural_position_id: '',
                staff_division_id: '',
                study_programs_id: '',
                nidn: "",
                nuptk: "",
                nitk: "",
                nidk: "",
            });
        }
    }, [defaultValues, reset]);
const type = watch('type');
    const typeValue = watch('type');

    const { lecturestatus, staffstatus, studyprogram, functionalposition, strukturalposition, staffdivision, fecthRelasi } = useEmployees();

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
useEffect(() => {
    
    if (!defaultValues) {
        if (type === 'staff') {
            setValue('nidn', '');
            setValue('nidk', '');
            setValue('lecture_status_id', '');
            setValue('study_programs_id', '');
            setValue('funtional_position_id', '');
            setValue('pns_rank', '');
            setValue('struktural_position_id', '');
        } else if (type === 'lecture') {
            setValue('nitk', '');
            setValue('nuptk', '');
            setValue('staff_division_id', '');
            setValue('staff_status_id', '');
        }
    }
}, [type, setValue, defaultValues?.id]);


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
                                placeholder="Masukan NIP"
                                {...register('nip')}
                                error={errors.nip?.message}
                            />
                            <FormTextInput
                                id="name"
                                type="text"
                                label="Nama"
                                placeholder="Masukan Name"
                                {...register('name')}
                                error={errors.name?.message}
                            />
                            <FormTextInput
                                id="foto"
                                type="file"
                                label="Foto"
                                placeholder="Masukan Foto"
                                {...register('foto')}
                                error={errors.foto?.message}
                            />
                            <FormTextInput
                                id="front_title"
                                type="text"
                                label="Gelar Depan"
                                placeholder="Masukan Nama Depan"
                                {...register('front_title')}
                                error={errors.front_title?.message}
                            />
                            <FormTextInput
                                id="back_title"
                                type="text"
                                label="Gelar Belakang"
                                placeholder="Masukan Nama Belakang"
                                {...register('back_title')}
                                error={errors.back_title?.message}
                            />
                            <Controller
                                control={control}
                                name="gender"
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="gender"
                                        label="Jenis Kelamin"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.gender?.message}
                                    >
                                        <SelectItem value="Pria">Pria</SelectItem>
                                        <SelectItem value="Wanita">Wanita</SelectItem>
                                    </FormSelectInput>
                                )}
                            />
                            <Controller
                                control={control}
                                name="religion"
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="religion"
                                        label="Agama"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.religion?.message}
                                    >
                                        <SelectItem value="Islam">Islam</SelectItem>
                                        <SelectItem value="Kristen">Kristen Protestan</SelectItem>
                                        <SelectItem value="Katholik">Katholik</SelectItem>
                                        <SelectItem value="Hindu">Hindu</SelectItem>
                                        <SelectItem value="Buddha">Buddha</SelectItem>
                                        <SelectItem value="Konghucu">Konghucu</SelectItem>
                                    </FormSelectInput>
                                )}
                            />
                            <FormTextInput
                                id="birth_place"
                                type="text"
                                label="Tempat Lahir"
                                placeholder="Masukan Tempat Lahir"
                                {...register('birth_place')}
                                error={errors.birth_place?.message}
                            />
                            <DateInput
                                id="birth_date"
                                label="Tanggal Lahir"
                                placeholder="Masukan Tanggal Lahir"
                                register={register('birth_date')}
                                error={errors.birth_date}
                            />
                            <FormTextInput
                                id="email_pt"
                                type="text"
                                label="Email PT"
                                placeholder="Masukan Email PT"
                                {...register('email_pt')}
                                error={errors.email_pt?.message}
                            />
                            <FormTextInput
                                id="phone"
                                type="text"
                                label="Nomor Telepon"
                                placeholder="Masukan Nomor Telepon"
                                {...register('phone')}
                                error={errors.phone?.message}
                            />
                            <FormTextInput
                                id="emergency_phone_1"
                                type="text"
                                label="Nomor Telepon Darurat"
                                placeholder="Masukan Nomor Telepon Darurat"
                                {...register('emergency_phone')}
                                error={errors.emergency_phone?.message}
                            />
                            <FormTextInput
                                id="relationship_1"
                                type="text"
                                label="Hubungan"
                                placeholder="Masukan Hubungan Darurat"
                                {...register('relationship_1')}
                                error={errors.relationship_1?.message}
                            />
                            <FormTextInput
                                id="emergency_phone_2"
                                type="text"
                                label="Nomor Telepon Darurat 2"
                                placeholder="Masukan Nomor Telepon Darurat 2"
                                {...register('emergency_phone_2')}
                                error={errors.emergency_phone_2?.message}
                            />
                            <FormTextInput
                                id="relationship_2"
                                type="text"
                                label="Hubungan 2"
                                placeholder="Masukan Hubungan 2"
                                {...register('relationship_2')}
                                error={errors.relationship_2?.message}
                            />
                            <div className="pt-2">
                                <Label>Status</Label>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="flex items-center gap-4">
                                            <Switch checked={field.value} onCheckedChange={field.onChange} id="status" />
                                            <Label htmlFor="status">{field.value ? 'Aktif' : 'Tidak Aktif'}</Label>
                                        </div>
                                    )}
                                />
                            </div>

                            <Controller
                                name="type"
                                control={control}
                                rules={{ required: 'Tipe wajib diisi' }}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="type"
                                        label="Tipe"
                                        value={String(field.value)}
                                        onValueChange={(value) => field.onChange(value)}
                                        error={errors.type?.message}
                                    >
                                        <SelectItem value={'lecture'}>Dosen</SelectItem>
                                        <SelectItem value={'staff'}>Staff</SelectItem>
                                    </FormSelectInput>
                                )}
                            />

                            {typeValue === 'lecture' ? (
                                // kondisi dosen
                                <>
                                    <FormTextInput
                                        id="nidn"
                                        type="text"
                                        label="NIDN"
                                        placeholder="Masukan NIDN"
                                        {...register('nidn')}
                                        error={errors.nidn?.message}
                                    />
                                    <FormTextInput
                                        id="nidk"
                                        type="text"
                                        label="NIDK"
                                        placeholder="Masukan NIDK"
                                        {...register('nidk')}
                                        error={errors.nidk?.message}
                                    />
                                    < FormTextInput
                                        id="nuptk"
                                        type="text"
                                        label="NUPTK"
                                        placeholder="Masukan NUPTK"
                                        {...register('nuptk')}
                                        error={errors.nuptk?.message}
                                    />
                                    <Controller
                                        name="lecture_status_id"
                                        control={control}
                                        rules={{ required: 'Status Dosen is required' }}
                                        render={({ field }) => (
                                            <FormSelectInput
                                                id="lecture_status_id"
                                                label="Status Dosen"
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
                                    <FormTextInput
                                        id="pns_rank"
                                        type="text"
                                        label="Golongan"
                                        placeholder="Masukan Golongan"
                                        {...register('pns_rank')}
                                        error={errors.pns_rank?.message}
                                    />
                                    
                                    
                                    <Controller
                                        name="struktural_position_id"
                                        control={control}
                                        rules={{ required: 'Jabatan Structural di perlukan' }}
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
                                    
                                </>
                            ) : (
                                // kondisi tendik
                                <>
                                    <FormTextInput
                                        id="nitk"
                                        type="text"
                                        label="NITK"
                                        placeholder="Masukan NITK"
                                        {...register('nitk')}
                                        error={errors.nitk?.message}
                                    />
                                    < FormTextInput
                                        id="nuptk"
                                        type="text"
                                        label="NUPTK"
                                        placeholder="Masukan NUPTK"
                                        {...register('nuptk')}
                                        error={errors.nuptk?.message}
                                    />
                                    <Controller
                                        name="staff_status_id"
                                        control={control}
                                        // rules={{ required: 'Staff Status is required' }}
                                        render={({ field }) => {
                                            return (
                                                <FormSelectInput
                                                id="staff_status_id"
                                                label="Status Tendik"
                                                value={String(field.value)}  
                                                onValueChange={field.onChange}
                                                error={errors.staff_status_id?.message}
                                                
                                                >
                                                    {staffstatus.map((status: any) => (
                                                        <SelectItem key={status.id} value={String(status.id)}>
                                                            {status.name}
                                                        </SelectItem>
                                                    ))}
                                                </FormSelectInput>
                                            );
                                        }}
                                    />
                                    <Controller
                                        name="staff_division_id"
                                        control={control}
                                        rules={{ required: 'Tendik Divisi is required' }}
                                        render={({ field }) => (
                                            <FormSelectInput
                                                id="staff_division_id"
                                                label="Divisi Tendik"
                                                value={String(field.value)}
                                                onValueChange={field.onChange}
                                                error={errors.staff_division_id?.message}
                                            >
                                                {staffdivision?.map((division: any) => (
                                                    <SelectItem key={division.id} value={String(division.id)}>
                                                        {division.name}
                                                    </SelectItem>
                                                ))}
                                            </FormSelectInput>
                                        )}
                                    />


                                </>
                            )}

                            {/* kondisi selain  dosen dan tendik */}

                            {errors.root && <p className="text-red-600">{errors.root.message}</p>}
                            

                            <Button
                                type="submit"
                                className={`mt-4 rounded px-4 py-2 font-bold text-white ${
                                    defaultValues ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-500 hover:bg-green-600'
                                }`}
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
