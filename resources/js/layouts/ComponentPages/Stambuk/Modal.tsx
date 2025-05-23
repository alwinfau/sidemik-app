import { Button } from '@/components/ui/button';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectItem } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useStambuk } from './useStambuk';
import YearPicker from '@/components/ui/Components_1/YearPicker';
import { Label } from '@/components/ui/label';
import { useState } from 'react';


type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};
const schema = z.object({
    year: z.string().regex(/^\d{4}$/, { message: 'Tahun Ajaran harus berupa 4 digit tahun (misal: 2025)' }),
    name: z.string({ message: 'Nama Wajib diisi' }).min(3, 'Nama wajib lebih dari 3 kata'),
    ukt: z.number({ message: 'Masukan jumlah UKT' }),
    description: z.string().nullable(),
    curriculums_id: z.string(),
    study_programs_id: z.string(),
});

type FormInputs = z.infer<typeof schema>;

const ModalForm = ({ open, onOpenChange, submit, defaultValues }: ModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        watch,
        setValue,
        control,
        formState: { errors, isSubmitting },
    } = useForm<FormInputs>({
        resolver: zodResolver(schema),
    });
    
    const { Curriculum, Prodi, fectRelasi } = useStambuk();
    useEffect(() => {
        fectRelasi();
    }, []);
    
    useEffect(() => {
        if (defaultValues) {
            reset({
                year: defaultValues.year || '',
                name: defaultValues.name || '',
                ukt: defaultValues.ukt || null,
                description: defaultValues.description || '',
                curriculums_id: String(defaultValues.curriculums_id) || '',
                study_programs_id: String(defaultValues.study_programs_id) || '',
            });
        } else {
            reset({
                year: '',
                name: '',
                ukt: null,
                description: '',
                curriculums_id: '',
                study_programs_id: '',
            });
        }
    }, [defaultValues, reset]);

    

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const result = await submit(data, defaultValues?.id);
            if (result != null && !isSubmitting && !defaultValues) {
                reset();
            }
        } catch (error: any) {
            const errorsData = error?.data;
            let lastErrorMessage = '';
            let firstErrorMessage = error.meta.message;

            Object.entries(errorsData).forEach(([field, messages], index) => {
                const messageText = (messages as string[])[0];
                lastErrorMessage = messageText;
            });

            let finalErrorMessage = firstErrorMessage.includes('Duplikat Data') ? firstErrorMessage : lastErrorMessage;

            setError('root', {
                type: 'manual',
                message: finalErrorMessage,
            });
        }
    };
    const handleYearChange = (year: number) => {
        setValue('year', String(year));
    };

    const [filteredCurriculums, setFilteredCurriculums] = useState<any[]>([]);
    useEffect(() => {
        const selectedProdiId = watch('study_programs_id');
        if (selectedProdiId) {
            const filtered = Curriculum.filter((cur: any) => String(cur.study_programs_id) === String(selectedProdiId));
            setFilteredCurriculums(filtered);
        } else {
            setFilteredCurriculums([]);
        }
    }, [watch('study_programs_id'), Curriculum]);
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-hidden p-6">
                <DialogHeader>
                    <DialogTitle>{defaultValues ? 'Edit Stambuk' : 'Add Stambuk'}</DialogTitle>
                </DialogHeader>
                <DialogDescription>Silakan isi data Stambuk dengan lengkap dan valid.</DialogDescription>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mx-3 space-y-4">
                        <div className="pt-1">
                                <Label>
                                    Tahun Kurikulum <span className="text-red-500">* </span>
                                </Label>
                                <div className="flex justify">
                                    <YearPicker 
                                    startYear={new Date().getFullYear() - 5}
                                    endYear={new Date().getFullYear() + 2}
                                    value={parseInt(defaultValues?.curriculum_year || new Date().getFullYear().toString())}
                                    onSelect={handleYearChange}
                                    />
                                </div>
                            </div>
                            <Controller
                                name="study_programs_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="study_programs_id"
                                        label={
                                            <>
                                            Prodi <span style={{color: 'red'}}>*</span>
                                            </>
                                        }
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.study_programs_id?.message}
                                    >
                                        {Prodi.map((Study: any) => (
                                            <SelectItem key={Study.id} value={String(Study.id)}>
                                                {Study.idn_sp_name}
                                            </SelectItem>
                                        ))}  
                                    </FormSelectInput>
                                )}
                            />
                            <Controller
                                name="curriculums_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="curriculums_id"
                                        label={
                                            <>
                                            Kurikulum <span style={{color: 'red'}}>*</span>
                                            </>
                                        }
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.curriculums_id?.message}
                                    >
                                        {filteredCurriculums.map((Curi: any) => (
                                            <SelectItem key={Curi.id} value={String(Curi.id)}>
                                                {Curi.code}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />
                            <FormTextInput
                                id="name"
                                label={
                                    <>
                                    Angkatan <span style={{color: 'red'}}>*</span>
                                    </>
                                }
                                placeholder="Masukan Angkatan ke"
                                {...register('name')}
                                error={errors.name?.message}
                            />
                            <FormTextInput
                                id="ukt"
                                label={
                                    <>
                                    UKT <span style={{color: 'red'}}>*</span>
                                    </>
                                }
                                placeholder="Masukan Jumlah Ukt"
                                type="number"
                                {...register('ukt', { valueAsNumber: true })}
                                error={errors.ukt?.message}
                            />
                            {/* <FormTextInput
                                    id="description"
                                    label="Keterangan"
                                    type="textarea"
                                    {...register('description')}
                                    error={errors.description?.message}
                                /> */}
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
