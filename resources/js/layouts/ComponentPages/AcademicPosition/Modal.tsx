import { Button } from "@/components/ui/button";
import { FormSelectInput, FormTextInput } from "@/components/ui/Components_1/FormInput";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectItem } from "@/components/ui/select";
import { useAxios } from "@/hooks/useAxios";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, Form, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { AcademicPosition } from "./Column";

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, "id">, id?: number) => void;
    defaultValues?: AcademicPosition;
};

const schema = z.object({   
    academic_position_code: z.string().min(5),
    academic_position_name: z.string(),
    academic_positions_types_id: z.string(),
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

    const { get } = useAxios();    
    
    const [academicPositionTypes, setAcademicPositionTypes] = useState<any>([]);


    const fetchAcademicPositionTypes = async () => {
        try {
            const res: any = await get("/academic-positions-types");
            setAcademicPositionTypes(res.data.data);
        } catch (err) {
            console.error("Error fetching academic position types:", err);
        }
    };
    useEffect(() => {
        fetchAcademicPositionTypes();
    }, []);

    useEffect(() => {
        if (defaultValues) {
            reset({
                academic_position_code: defaultValues.academic_position_code || "",
                academic_position_name: defaultValues.academic_position_name || "",
                academic_positions_types_id: String(defaultValues.academic_positions_types_id) || '1',
            });
        } else {
            reset({
                academic_position_code: "",
                academic_position_name: "",
                academic_positions_types_id: '1',
            });
        }
    }, [defaultValues, reset]);

    const onSubmit: SubmitHandler<FormInputs>  = async (data) => {
        try {
            const result = await submit(data, defaultValues?.id);
            if (result != null) {
                if (!isSubmitting && !defaultValues) {
                    reset({
                        academic_position_code: '',
                        academic_position_name: '',
                        academic_positions_types_id: '',
                    });
                }
            }
        } catch (error: any) {
            setError('root',
                { type: "manual", 
                message: error?.response?.meta?.message || "Error occurred" },
            );
        }
    };
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-hidden p-6">
                <DialogHeader>
                    <DialogTitle>{defaultValues ? "Edit Academic Position" : "Add Academic Position"}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="mx-3space-y-4">
                                <FormTextInput
                                    id="academic_position_code"
                                    type="text"
                                    label="Academic Position Name"
                                    placeholder="Enter Academic Position Name"
                                    {...register("academic_position_name")}
                                    error={errors.academic_position_name?.message}
                                />
                                <FormTextInput
                                    id="academic_position_name"
                                    type="text"
                                    label="Academic Position Code"
                                    placeholder="Enter Academic Position Code"
                                    {...register("academic_position_code")}
                                    error={errors.academic_position_code?.message}
                                    
                                />
                                <Controller 
                                    name="academic_positions_types_id"
                                    control={control}   
                                    rules={{ required: "Academic Position Type is required" }}
                                    render={({ field }) => (
                                        <FormSelectInput
                                            id="academic_positions_types_id"
                                            label="Academic Position Type"
                                            value={String(field.value)}
                                            onValueChange={field.onChange}                                           
                                            error={errors.academic_positions_types_id?.message}
                                        > 
                                            {academicPositionTypes.map((AcademicPositionType:any) => (
                                                <SelectItem key={AcademicPositionType.id} value={String(AcademicPositionType.id)}>
                                                    {AcademicPositionType.job_type_name}
                                                </SelectItem>
                                            ))}
                                        </FormSelectInput>
                                    )}
                                />
                                {errors.root && (
                                    <p className="text-red-500 text-sm">{errors.root.message}</p>
                                )}
                                <Button type="submit"
                                        className={`mb-5 rounded px-4 py-2 font-bold text-white ${defaultValues ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-500 hover:bg-green-600'} `}
                                        disabled={isSubmitting} 
                                    >
                                    {isSubmitting ? <LoaderCircle className=" h-4 w-4 animate-spin" /> : defaultValues ? "Update" : "Create"}
                                </Button>
                            </div>
                        </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default ModalForm;