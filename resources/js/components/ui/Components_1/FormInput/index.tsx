// Tetap impor Select dan komponen lainnya
import React from 'react';
import { Label } from '../../label';
import { Input } from '../../input';
import { SelectInput } from '../Select';
import { Select, SelectContent, SelectTrigger, SelectValue } from '../../select';

interface BaseFormFieldProps {
  id?: string;
  name?: string;
  label?: string;
  error?: string;
}

// ✅ FormTextInput - sekarang support textarea
interface FormTextInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  id: string;
  label?: string;
  error?: string;
  type?: string;
}

export const FormTextInput = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, FormTextInputProps>(
  ({ id, label, error, type = 'text', ...rest }, ref) => {
    return (
      <div className="flex-col space-y-1">
        {label && <Label htmlFor={id}>{label}</Label>}
        {type === 'textarea' ? (
          <textarea
            id={id}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className="w-full rounded border p-2"
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <Input
            id={id}
            ref={ref as React.Ref<HTMLInputElement>}
            type={type}
            {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>
    );
  }
);

FormTextInput.displayName = 'FormTextInput';

// ✅ FormSelectInput - tetap seperti sebelumnya, nggak diubah
interface FormSelectInputProps {
  id: string;
  label?: string;
  error?: string;
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export const FormSelectInput: React.FC<FormSelectInputProps> = ({
  id,
  label,
  error,
  value,
  onValueChange,
  children
}) => {
  return (
    <div className="flex-col space-y-1">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {children}
        </SelectContent>
      </Select>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
};