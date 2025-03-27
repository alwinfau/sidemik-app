import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Paginations from './paginations';
import { Button } from './ui/button';

type Itables<T> = {
    data: T[];
    head: string[];
    columns: (keyof T)[];
    edit: (item: T) => React.ReactNode;
};

export function Tables <T>({ data, head, columns, edit }: Itables<T>) {
    return (
        <>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow className='bg-gray-100'>
                            <TableHead>No</TableHead>
                            {head.map((title, index) => (
                                <TableHead key={index} className="text-start">
                                    {title}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                {columns.map((column, idx) => (
                                    <TableCell key={idx} className="text-start">
                                        {item[column] as string}
                                    </TableCell>
                                ))}
                                <TableCell className="text-center">
                                    {edit(item)}
                                    <Button className="ml-2 bg-red-600 text-xs">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="mt-4  flex">
                <Paginations />
            </div>
        </>
    );
}
