import { Button } from "@/components/ui/button";
import {  EmployeesType } from "./Column";
import { useEmployees } from "./useEmploye";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    defaultValues?: EmployeesType;
};

const ModalDetails = ({ open, onOpenChange, defaultValues }: ModalProps) => {

    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogContent className="min-w-[60vw] overflow-hidden max-h-[90vh] ">
                <DialogHeader>
                    <DialogTitle>{defaultValues ? 'Detail Pegawai' : 'Tambah Pegawai Baru'}</DialogTitle>
                </DialogHeader>

                          {defaultValues ? (
                            <div className="grid grid-cols-2 gap-5 w-full">
                                <div className="flex gap-2">
                                    <p className="font-semibold">NIP : </p>
                                    <p> {defaultValues.nip}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">Nama : </p>
                                    <p>{defaultValues.name}</p>
                                </div>

                                <div className="flex gap-2">
                                    <p className="font-semibold">Foto : </p>
                                    <p>{defaultValues.foto || '-'}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">Gelar Depan : </p>
                                    <p>{defaultValues.front_title || '-'}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">Gelar Belakang : </p>
                                    <p>{defaultValues.back_title}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">Jenis Kelamin : </p>
                                    <p>{defaultValues.gender}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">Agama : </p>
                                    <p>{defaultValues.religion}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">Tempat Lahir : </p>
                                    <p>{defaultValues.birth_place}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">Tanggal Lahir : </p>
                                    <p>{defaultValues.birth_date}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">Email PT : </p>
                                    <p>{defaultValues.email_pt}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">Nomor Telepohone : </p>
                                    <p>{defaultValues.phone}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">Telepohone Darurat 1 : </p>
                                    <p>{defaultValues.emergency_phone_1 || '-'}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">Hubungan : </p>
                                    <p>{defaultValues.relationship_1}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">Telepohone Darurat 2 : </p>
                                    <p>{defaultValues.emergency_phone_2 || '-'}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">Hubungan 2 : </p>
                                    <p>{defaultValues.relationship_2 || '-'}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">Status : </p>
                                    <p>{defaultValues.status ? 'Aktif' : 'Tidak Aktif'}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">NUPTK : </p>
                                    <p>{defaultValues.nuptk || '-'}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">Tipe : </p>
                                    <p>{defaultValues.type}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">Golongan PNS : </p>
                                    <p>{defaultValues.pns_rank || '-'}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">NIDN : </p>
                                    <p>{defaultValues.nidn || '-'}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">NITK : </p>
                                    <p>{defaultValues.nitk || '-'}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">NIDK : </p>
                                    <p>{defaultValues.nidk || '-'}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">Status Dosen : </p>
                                    <p>{defaultValues.lecture_status?.name || '-'}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">Status Tendik : </p>
                                    <p>{defaultValues.staff_status?.name || '-'}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">Divisi Tendik : </p>
                                    <p>{defaultValues.staff_division?.name || '-'}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">Jabatan Fungsional : </p>
                                    <p>{defaultValues.functional_positons?.name || '-'}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">Program Studi : </p>
                                    <p>{defaultValues.study_programs?.name || '-'}</p>
                                </div>
                            </div>
                    ) : (
                        'Isi semua kolom di bawah ini untuk menambah pegawai baru.'
                    )}
            </DialogContent>
        </Dialog>
    );
};

export default ModalDetails;
