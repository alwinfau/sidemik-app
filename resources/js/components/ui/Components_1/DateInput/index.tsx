import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { Label } from '../../label';

interface DateInputProps {
  label: string;
  id: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const DateInput = ({ label, id, placeholder, register, error }: DateInputProps) => {
  return (
    <div>
        <Label htmlFor={id}> {label}</Label>
      <div className="rounded border">
        <input
          type="date"
          {...register}
          id={id}
          aria-label={id}
          className="w-full p-3"
          placeholder={placeholder}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default DateInput;
