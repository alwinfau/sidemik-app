import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
  } from '@/components/ui/alert-dialog'
  
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
  import Paginations from './pagination';
  import { Button } from './ui/button';
  
  type Itables<T> = {
    data: T[];
    head: string[];
    columns: ((keyof T) | ((item: T) => React.ReactNode))[];
    edit: (item: T) => React.ReactNode;
    onDelete: (id: string) => void;
  };
  
  export function Tables<T extends { id?: string }>({ data, head, columns, edit, onDelete }: Itables<T>) {
    return (
      <>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
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
                      {typeof column === 'function' ? column(item) : (item[column] as string)}
                    </TableCell>
                  ))}
                  <TableCell className="text-center">
                    {edit(item)}
  
                    {/* Alert Dialog for Delete */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="ml-2 bg-red-600 text-xs text-white hover:bg-red-700">
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Hapus Data</AlertDialogTitle>
                          <AlertDialogDescription>
                            Apakah kamu yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => item.id && onDelete(item.id)}
                          >
                            Hapus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex">
          <Paginations />
        </div>
      </>
    );
  }
  