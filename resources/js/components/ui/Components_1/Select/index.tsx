import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

type Iprops = {
    placeholder?: string;
    label: string;
    children: React.ReactNode;
    name: string;
    onChange: (value: string) => void;
    value: any;
};
export function SelectInput({ placeholder, label, children, name, value, onChange }: Iprops) {
    return (
        <Select name={name} value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {children}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
