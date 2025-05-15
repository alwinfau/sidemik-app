import { Controller, Control, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FormFileInputProps {
  name: string;
  control: Control<any>;
  label: string;
  defaultValue?: File | null;
  errors?: FieldErrors;
}

export const FormFileInput: React.FC<FormFileInputProps> = ({
  name,
  control,
  label,
  errors,
}) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <div>
            <Label htmlFor={name}>{label}</Label>
            <Input
              type="file"
              id={name}
              onChange={(e) => {
                const file = e.target.files?.[0];
                onChange(file);
              }}
            />
          </div>
        )}
      />
      {errors && (
        <span className="text-red-500 text-sm">{errors[name]?.message as string}</span>
      )}
    </div>
  );
};
