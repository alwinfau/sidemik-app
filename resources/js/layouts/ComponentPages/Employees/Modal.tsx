import { Button } from '@/components/ui/button';
import DateInput from '@/components/ui/Components_1/DateInput';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { FormFileInput } from '@/components/ui/Components_1/InputFile';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/swicth';
import { useAxios } from '@/hooks/useAxios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Proditype } from '../Prodi/Column';
import { useEmployees } from './useEmploye';
import { StatusDosenType } from '../StatusDosen/Column';
import { JabatanFungsionalType } from '../JabFung/Column';
import { JabatanStrukturalType } from '../JabStruk/Column';
import { DevisiTendikType } from '../DevisiTendik/Column';
import { StatusTendikType } from '../StatusTendik/Column';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<SchemaEmployee, 'id'>, id?: number) => void;
    defaultValues?: any;
};

const schema = z.object({
    nip: z.string(),
    name: z.string(),
    file: z.union([z.instanceof(File), z.string(), z.null()]),
    front_title: z.string().nullable(),
    back_title: z.string(),
    gender: z.string(),
    religion: z.string(),
    birth_place: z.string(),
    birth_date: z.string().date(),
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
    study_programs_id: z.string().nullable(),
    funtional_position_id: z.string().nullable(),
    pns_rank: z.string().nullable(),
    struktural_position_id: z.string().nullable(),
    staff_divisions_id: z.string().nullable(),
    nidn: z.string().nullable(),
    nuptk: z.string().nullable(),
    nitk: z.string().nullable(),
    nidk: z.string().nullable(),
});

export type SchemaEmployee = z.infer<typeof schema>;

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
    } = useForm<SchemaEmployee>({
        resolver: zodResolver(schema),
    });

    const { post } = useAxios();

    const { lecturestatus, staffstatus, studyprogram, functionalposition, strukturalposition, staffdivision, fecthRelasi } = useEmployees();

    useEffect(() => {
        fecthRelasi();
    }, []);

    const type = watch('type');

    useEffect(() => {
        if (type === defaultValues?.type) return;

        if (type === 'staff') {
            setValue('nitk', '');
            setValue('staff_divisions_id', null);
            setValue('staff_status_id', null);
            setValue('nidn', '');
            setValue('nidk', '');
            setValue('lecture_status_id', '');
            setValue('study_programs_id', '');
            setValue('funtional_position_id', '');
            setValue('pns_rank', '');
            setValue('struktural_position_id', '');
        } else if (type === 'lecture') {
            setValue('nitk', '');
            setValue('staff_divisions_id', null);
            setValue('staff_status_id', null);
            setValue('nidn', '');
            setValue('nidk', '');
            setValue('lecture_status_id', '');
            setValue('study_programs_id', '');
            setValue('funtional_position_id', '');
            setValue('pns_rank', '');
            setValue('struktural_position_id', '');
        }
    }, [type, setValue]);

    useEffect(() => {
        if (open) {
            if (defaultValues) {
                reset({
                    nip: defaultValues.nip || '',
                    name: defaultValues.name || '',
                    file: defaultValues.foto || null,
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
                    status: Boolean(defaultValues.status) || false,
                    type: defaultValues.type || '',
                    lecture_status_id: defaultValues.lecture_status_id ? String(defaultValues.lecture_status_id) : null,
                    staff_status_id: defaultValues.staff_status_id ? String(defaultValues.staff_status_id) : null,
                    funtional_position_id: defaultValues.funtional_position_id ? String(defaultValues.funtional_position_id) : null,
                    pns_rank: defaultValues.pns_rank ? String(defaultValues.pns_rank) : null,
                    struktural_position_id: defaultValues.struktural_position_id ? String(defaultValues.struktural_position_id) : null,
                    staff_divisions_id: defaultValues.staff_divisions_id ? String(defaultValues.staff_divisions_id) : null,
                    study_programs_id: defaultValues.study_programs_id ? String(defaultValues.study_programs_id) : null,
                    nidn: defaultValues.nidn ?? '',
                    nuptk: defaultValues.nuptk ?? '',
                    nitk: defaultValues.nitk ?? '',
                    nidk: defaultValues.nidk ?? '',
                });
            } else {
                reset({
                    nip: '',
                    name: '',
                    file: null,
                    front_title: '',
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
                    staff_divisions_id: '',
                    study_programs_id: '',
                    nidn: '',
                    nuptk: '',
                    nitk: '',
                    nidk: '',
                });
            }
        }
    }, [defaultValues, reset, open]);

    const onSubmit: SubmitHandler<SchemaEmployee> = async (data) => {
        try {
            const formData = new FormData();
            let fotoPath = defaultValues?.foto ?? null;

            if (data.file) {
                if (data.file instanceof File) {
                    formData.append('file', data.file);

                    const foto: any = await post('/upload-file', formData);
                    if (foto.meta.code === 200) {
                        fotoPath = foto.data.file_path;
                    }
                } else if (typeof data.file === 'string') {
                    fotoPath = data.file;
                }
            }

            console.log(data);

            const payload = {
                ...data,
                foto: fotoPath,
            };

            const result = await submit(payload, defaultValues?.id);
            if (result != null && !isSubmitting && !defaultValues) {
                reset();
            }
        } catch (error: any) {
            const errorsData = error?.data;
            const firstErrorMessage = error.meta.message;
            let lastErrorMessage = '';

            Object.entries(errorsData).forEach(([field, messages], index) => {
                const messageText = (messages as string[])[0];
                lastErrorMessage = messageText;
            });

            const finalErrorMessage = firstErrorMessage.includes('Duplicate record') ? firstErrorMessage : lastErrorMessage;

            setError('root', {
                type: 'manual',
                message: finalErrorMessage,
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

                            {defaultValues?.foto && (
                                <div className="">
                                    <img src={`http://127.0.0.1:8080${defaultValues.foto}`} className="w-1/2" />
                                </div>
                            )}

                            <FormFileInput name="file" control={control} label="Masukkan Foto" errors={errors} />

                            <span>{errors.file?.message}</span>
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

                            <FormTextInput
                                id="nuptk"
                                type="text"
                                label="NUPTK"
                                placeholder="Masukan NUPTK"
                                {...register('nuptk')}
                                error={errors.nuptk?.message}
                            />

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

                            {type === 'lecture' ? (
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

                                    <Controller
                                        name="lecture_status_id"
                                        control={control}
                                        rules={{ required: 'Status Dosen is required' }}
                                        render={({ field }) => (
                                            <FormSelectInput
                                                id="lecture_status_id"
                                                label="Status Dosen"
                                                value={field.value === null ? '' : field.value}
                                                onValueChange={(value) => field.onChange(value || null)}
                                                error={errors.lecture_status_id?.message}
                                            >
                                                {lecturestatus.map((lecturestatus: StatusDosenType) => (
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
                                                value={field.value === null ? '' : field.value}
                                                onValueChange={(value) => field.onChange(value || null)}
                                                error={errors.study_programs_id?.message}
                                            >
                                                {studyprogram.map((studyProgram: Proditype) => (
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
                                                value={field.value === null ? '' : field.value}
                                                onValueChange={(value) => field.onChange(value || null)}
                                                error={errors.funtional_position_id?.message}
                                            >
                                                {functionalposition.map((functionalposition: JabatanFungsionalType) => (
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
                                                value={field.value === null ? '' : field.value}
                                                onValueChange={(value) => field.onChange(value || null)}
                                                error={errors.struktural_position_id?.message}
                                            >
                                                {strukturalposition.map((strukturalposition: JabatanStrukturalType) => (
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

                                    <Controller
                                        name="staff_divisions_id"
                                        control={control}
                                        rules={{ required: 'Tendik Divisi is required' }}
                                        render={({ field }) => (
                                            <FormSelectInput
                                                id="staff_divisions_id"
                                                label="Divisi Tendik"
                                                value={field.value === null ? '' : field.value}
                                                onValueChange={(value) => field.onChange(value || null)}
                                                error={errors.staff_divisions_id?.message}
                                            >
                                                {staffdivision.map((staffdivision: DevisiTendikType) => (
                                                    <SelectItem key={staffdivision.id} value={String(staffdivision.id)}>
                                                        {staffdivision.name}
                                                    </SelectItem>
                                                ))}
                                            </FormSelectInput>
                                        )}
                                    />

                                    <Controller
                                        name="staff_status_id"
                                        control={control}
                                        rules={{ required: 'Staff Status is required' }}
                                        render={({ field }) => {
                                            return (
                                                <FormSelectInput
                                                    id="staff_status_id"
                                                    label="Status Tendik"
                                                    value={field.value === null ? '' : field.value}
                                                    onValueChange={(value) => field.onChange(value || null)}
                                                    error={errors.staff_status_id?.message}
                                                >
                                                    {staffstatus.map((staffstatus: StatusTendikType) => (
                                                        <SelectItem key={staffstatus.id} value={String(staffstatus.id)}>
                                                            {staffstatus.name}
                                                        </SelectItem>
                                                    ))}
                                                </FormSelectInput>
                                            );
                                        }}
                                    />
                                </>
                            )}

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