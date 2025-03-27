import { Button } from "@/components/ui/button";
import { Dialog, DialogDescription, DialogContent, DialogTitle, DialogTrigger, DialogFooter, DialogHeader }  from "@/components/ui/dialog";
import { useState } from "react";

type ClassType = {
    id: number,
    code: string,
    name: string,
    description: string,
    is_active: boolean,
};

type EditModalProps = {
    data: ClassType,
    onUpdated: (updatedData: ClassType) => void,
};

const EditModal = ({ data, onUpdated }: EditModalProps) => {

    const [formData, setFormData] = useState<ClassType>(data);

    const handleSumbit = () => {
        onUpdated(formData);
    };

    return (
        <Dialog >
            <DialogTrigger>
                <Button variant="default" className='bg-blue-600 text-xs'>
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Class</DialogTitle>
                    <DialogDescription>
                        Make changes to your class 
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    {Object.keys(formData).map((key) => (
                        <>
                            <input
                                key={key}
                                type="text"
                                placeholder={key}
                                className=' rounded border lg p-2'
                                value={(formData as any)[key]}
                                onChange={(e) => setFormData ((prev) =>({ ...prev, [key]: e.target.value }))}
                            />
                        </>
                    ))}
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSumbit}>
                        Update
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditModal
