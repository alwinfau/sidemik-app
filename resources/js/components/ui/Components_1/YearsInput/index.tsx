import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { Label } from '../../label';

interface YearInputProps {
    label: string;
    id: string;
    placeholder?: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
}

const YearInput = ({ label, id, placeholder, register, error }: YearInputProps) => {
    // Mendapatkan tahun sekarang
    const currentYear = new Date().getFullYear();
    // Daftar tahun dari 20 tahun sebelumnya hingga 5 tahun ke depan
    const yearRange = Array.from({ length: 15 }, (_, i) => currentYear - 10 + i);

    return (
        <div>
        <Label htmlFor={id}>{label}</Label>
        <div className="rounded border">
            <select
            id={id}
            {...register}
            aria-label={id}
            className="w-full p-3"
            >
            <option value="" disabled>Pilih Tahun</option>
            {yearRange.map((year) => (
                <option key={year} value={year}>{year}</option>
            ))}
            </select>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
};

export default YearInput;
