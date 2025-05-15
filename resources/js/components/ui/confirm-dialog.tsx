// components/ConfirmUpdateDialog.tsx
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/Components_1/Select/alert-dialog";
  
  type ConfirmUpdateDialogProps = {
    trigger: React.ReactNode;
    onConfirm: () => void;
  };
  
  export default function ConfirmUpdateDialog({
    trigger,
    onConfirm,
  }: ConfirmUpdateDialogProps) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {trigger}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Update</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah kamu yakin ingin memperbarui data ini? Tindakan ini tidak bisa dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>Lanjutkan</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  