import { Button } from "@/components/ui/button";
import { FormSelectInput, FormTextInput } from "@/components/ui/Components_1/FormInput";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useEffect, useState } from "react";
import { Controller, Form, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { EmployeeRelationshipTypes } from "./Column";
import { Switch } from "@/components/ui/swicth";
import { Label } from "@/components/ui/label";

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, "id">, id?: number) => void;
    defaultValues?: EmployeeRelationshipTypes;
};

const schema = z.object({
    code: z.string().min(5),
    name: z.string(),
    employment_relationship_status: z.boolean(),
    pns_status: z.boolean(),
});

type FormInputs = z.infer<typeof schema>;

const ModalForm = ({ open, onOpenChange, submit, defaultValues }: ModalProps) => {
    const [status, setStatus] = useState<boolean>(defaultValues?.employment_relationship_status ?? false);
    const [pnsStatus, setPnsStatus] = useState<boolean>(defaultValues?.pns_status ?? false);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors, isSubmitting },
    } = useForm<FormInputs>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
            setStatus(defaultValues.employment_relationship_status);
            setPnsStatus(defaultValues.pns_status);
        } else {
            reset({
                code: "",
                name: "",
                employment_relationship_status: false,
                pns_status: false,
            });
            setStatus(false);
            setPnsStatus(false);
        }
    }, [defaultValues, reset]);

    useEffect(() => {
        setValue("employment_relationship_status", status );
        setValue("pns_status", pnsStatus );
    }, [status, pnsStatus, setValue]);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        const formData = {
            ...data,
            employee_relationship_status: status,
            pns_status: pnsStatus,
        };
        try {
            await submit(formData, defaultValues?.id);
            onOpenChange(false);
        } catch (error) {
            console.error("Error submitting:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-hidden p-6">
                <DialogHeader>
                    <DialogTitle>Employee Relationship</DialogTitle>
                </DialogHeader>
                <ScrollArea>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4 px-2">
                            <FormTextInput
                                id="code"
                                type="text"
                                label="Code"
                                placeholder="Code"
                                {...register("code")}
                                error={errors.code?.message}
                            />
                            <FormTextInput
                                id="name"
                                type="text"
                                label="Name"
                                placeholder="Name"
                                {...register("name")}
                                error={errors.name?.message}
                            />
                            
                            <Label> Employee Relationship Status</Label>
                            <div className="flex items-center gap-4">
                                <Switch checked={status} onCheckedChange={setStatus} />
                                <Label htmlFor="employee_relationship_status">
                                    {status ? "True" : "False"}
                                </Label>
                            </div>
                            <Label> PNS Status</Label>
                            <div className="flex items-center gap-4">
                                <Switch checked={pnsStatus} onCheckedChange={setPnsStatus} />
                                <Label htmlFor="pns_status">{pnsStatus ? "True" : "False"}</Label>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button
                                type="submit"
                                className= {`rounded px-4 py-2  font-bold text-white ${defaultValues ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-500 hover:bg-green-600'}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Loading..." : defaultValues ? "Update" : "Create"}
                            </Button>
                            
                        </div>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default ModalForm;
