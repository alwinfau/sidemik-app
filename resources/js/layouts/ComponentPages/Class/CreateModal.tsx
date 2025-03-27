import { Button } from '@/components/ui/button';
import { Dialog,  DialogContent, DialogTitle, DialogHeader, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useState } from 'react';



type ClassType = {
    id?: number;
    code: string;
    name: string;
    description: string;
    is_active: "True" | "False";
};

type CreateModalProps = {
    onCreate: (data: Omit<ClassType, 'id'>) => void;
};

const CreateModal =  ({ onCreate }: CreateModalProps) => {
    const [formData, setFormData] = useState<ClassType>({
        code: '',
        name: '',
        description: '',
        is_active: 'True',
    });

    const handleSumbit = () => {
        onCreate(formData);
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="default" className='bg-blue-600'>
                    Create
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Class</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    {Object.keys(formData).map((key) => (
                        <>
                            <Label key= {key} className='my-2'>
                                {key} 
                            </Label>
                            <input
                                key={key}
                                type="text"
                                placeholder='{key}'
                                className=' rounded border lg p-2'
                                value={(formData as any)[key]}
                                onChange={(e) => setFormData ((prev) =>({ ...prev, [key]: e.target.value }))}
                            />
                        </>
                    ))}
                </div>
                <DialogFooter>
                    <Button type="button" onClick = {handleSumbit}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

};

export default CreateModal;
   

