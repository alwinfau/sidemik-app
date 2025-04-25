import { Button } from "@/components/ui/button"; 
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAxios } from "@/hooks/useAxios";
import { useState , useEffect} from "react";

type AcademicYearType = {
    id: string;
    academic_year: Date | null;
    name: string;
    start_date: Date | null;
    end_date:  Date | null;
    description: string;
};

type AcademicYearProps = {
    FormData: Omit<AcademicYearType, 'id'>;
    setFormData: (data: Omit<AcademicYearType, 'id'>) => void;
}

const labelMapping: Record<string, string> = {
    academic_year: 'Academic Year',
    name: 'Name',
    start_date: 'Start Date',
    end_date: 'End Date',
    description: 'Description',
};

type CreateModalProps = {
    onCreate: (data: Omit<AcademicYearType, 'id'>) => void;
};

const CreateModal = ({ onCreate }: CreateModalProps) => {
    const { post, get } = useAxios();
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<Partial<Record<keyof Omit<AcademicYearType, 'id'>, string>>>({});
    const [FormData, setFormData] = useState<Omit<AcademicYearType, 'id'>>({
        academic_year: null,
        name: '',
        start_date: null,
        end_date: null,
        description: '',
    });

    const [academic_year, setAcademicYear] = useState<AcademicYearType[]>([]);

    useEffect(() => {
        const fetchAcademicYear = async () => {
            try {
                const res = await get('/academic-year');
                setAcademicYear(res.data.data);
            } catch (err) {
                console.error('Gagal fetch academic years:', err);
            }
        };
        fetchAcademicYear();
    }, []);

    const getStatusLabel = (val: string | number): string =>
        val == 1 || val == '1' ? 'AKTIF' : 'NON AKTIF';

    const validateform = () => {
        const errors: Partial<Record<keyof Omit<AcademicYearType, 'id'>, string>> = {};

        Object.entries(FormData).forEach(([key, value]) => {
            if (
                (typeof value === 'string' && value.trim() == '') ||
                (value === null)
            ) {
                errors[key as keyof Omit<AcademicYearType, 'id'>] = `${labelMapping[key]} is required`;
            }
        });
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateform()) return;
        try {
            const response = await post('/academic-year', FormData);
            onCreate(FormData);
            setOpen(false);
            setErrorMessage(null);
            setFormErrors({});
        } catch (error: any) {
            console.error('Gagal membuat tahun akademik:', error);

            const metaMessage = error?.response?.data?.meta?.message;
            const fields = error?.response?.data?.data?.fields;
            const translatedFields = fields?.map((field: string) => labelMapping[field] || field);
            const cleanedMessage = metaMessage?.replace(/ in:.*$/, '') ?? '';
            const message = cleanedMessage
                ? `${cleanedMessage}${translatedFields ? ' (' + translatedFields.join(', ') + ')' : ''}`
                : 'Terjadi kesalahan';

            setErrorMessage(message);

        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div className="felx w-full justify-start">
                <DialogTrigger asChild>
                    <Button variant="default" className="bg-blue-600">
                        Add Academic Year
                    </Button>
                </DialogTrigger>
            </div>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create Academic Year</DialogTitle>
                    <DialogDescription>
                        Add Academic Year
                    </DialogDescription>
                </DialogHeader>
                <AcademicYearForm 
                    FormData={FormData} 
                    setFormData={setFormData}
                    // academic_year={academic_year}
                    formErrors={formErrors}
                />
                <DialogFooter className="flex flex-col items-start">
                    {errorMessage && (
                        <p className="text-red-500">{errorMessage}</p>
                    )}
                    <Button type="button" onClick={handleSubmit}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const AcademicYearForm = ({ FormData, setFormData }: AcademicYearProps) => {
    const handleChange = (key: keyof  Omit<AcademicYearType , 'id'>, value: string | number |null) => {
        setFormData ({ ...FormData, [key]: value });       
    };
    return (
        <div className="grid grid-cols-2 gap-4">
            <ScrollArea className="h-100 w-140">
                {Object.entries(FormData).map(([key, value]) => {
                    if (key === 'start_date') {
                        return (
                            <div key={key} className="col-span-2">
                            <Label>{labelMapping[key]}</Label>
                            <select 
                                className="w-full rounded border p-2"
                                value={value ?? ''}
                                onChange={(e) =>{
                                    const val = e.target.value;
                                    handleChange(key as keyof Omit<AcademicYearType, 'id'>, val === '' ? null : parseInt(val));
                                }}
                            >
                                {/* <option className="text-black" value="">Pilih Tahun Akademik</option>
                                {academic_year.map((year) => (
                                    <option key="year.id" className="text-black" value={year.id}>
                                        {year.academic_year}
                                    </option>
                                ))}  */}
                            </select>
                        </div>
                        );
                    } 
                        
                })}
                        
            </ScrollArea>
        </div>
    )
};

export default CreateModal;
