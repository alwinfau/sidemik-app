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
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[100vh] overflow-hidden p-6">
                <DialogHeader>
                    <DialogTitle>{defaultValues ? 'Detail Pegawai' : 'Tambah Pegawai Baru'}</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {defaultValues ? (
                        <div className="w-full max-w-4xl max-h-180 overflow-y-auto overflow-x-hidden border p-4 rounded-lg shadow">
                            <div className="grid grid-cols-4 gap-x-5 gap-y-6 ">
                                <p className="font-semibold">NIP</p>
                                <p> {defaultValues.nip}</p>

                                <p className="font-semibold">Nama</p>
                                <p>{defaultValues.name}</p>

                                <p className="font-semibold">Foto</p>
                                <p>{defaultValues.foto || '-'}</p>

                                <p className="font-semibold">Gelar Depan</p>
                                <p>{defaultValues.front_title || '-'}</p>

                                <p className="font-semibold">Gelar Belakang</p>
                                <p>{defaultValues.back_title}</p>

                                <p className="font-semibold">Jenis Kelamin</p>
                                <p>{defaultValues.gender}</p>

                                <p className="font-semibold">Agama</p>
                                <p>{defaultValues.religion}</p>

                                <p className="font-semibold">Tempat Lahir</p>
                                <p>{defaultValues.birth_place}</p>

                                <p className="font-semibold">Tanggal Lahir</p>
                                <p>{defaultValues.birth_date}</p>

                                <p className="font-semibold">Email PT</p>
                                <p>{defaultValues.email_pt}</p>

                                <p className="font-semibold">Nomor Telepohone</p>
                                <p>{defaultValues.phone}</p>

                                <p className="font-semibold">Telepohone Darurat</p>
                                <p>{defaultValues.emergency_phone || '-'}</p>

                                <p className="font-semibold">Hubungan</p>
                                <p>{defaultValues.relationship_1}</p>

                                <p className="font-semibold">Telepohone Darurat 2</p>
                                <p>{defaultValues.emergency_phone_2 || '-'}</p>

                                <p className="font-semibold">Hubungan 2</p>
                                <p>{defaultValues.relationship_2 || '-'}</p>

                                <p className="font-semibold">Status</p>
                                <p>{defaultValues.status ? 'Aktif' : 'Tidak Aktif'}</p>

                                <p className="font-semibold">NUPTK</p>
                                <p>{defaultValues.nuptk || '-'}</p>

                                <p className="font-semibold">Tipe</p>
                                <p>{defaultValues.type}</p>

                                <p className="font-semibold">Golongan PNS</p>
                                <p>{defaultValues.pns_rank || '-'}</p>

                                <p className="font-semibold">NIDN</p>
                                <p>{defaultValues.nidn || '-'}</p>

                                <p className="font-semibold">NITK</p>
                                <p>{defaultValues.nitk || '-'}</p>

                                <p className="font-semibold">NIDK</p>
                                <p>{defaultValues.nidk || '-'}</p>

                                <p className="font-semibold">Status Dosen</p>
                                <p>{defaultValues.lecture_status?.name || '-'}</p>

                                <p className="font-semibold">Status Tendik</p>
                                <p>{defaultValues.staff_status?.name || '-'}</p>

                                <p className="font-semibold">Divisi Tendik</p>
                                <p>{defaultValues.staff_division?.name || '-'}</p>

                                <p className="font-semibold">Jabatan Fungsional</p>
                                <p>{defaultValues.functional_positons?.name || '-'}</p>

                                <p className="font-semibold">Program Studi</p>
                                <p>{defaultValues.study_programs?.name || '-'}</p>
                            </div>

                        </div>
                    
                    ) : (
                        'Isi semua kolom di bawah ini untuk menambah pegawai baru.'
                    )}
                </DialogDescription>

                {/* <ScrollArea className="max-h-[70vh] pr-4">
                    <div>

                    </div>
                </ScrollArea> */}

                {/* <div className="mt-4 flex gap-3"> */}
                    {/* <Button
                        onClick={() => onOpenChange(false)}
                        variant="outline"
                        className="w-full"
                    >
                        Tutup
                    </Button> */}
                {/* </div> */}
            </DialogContent>
        </Dialog>
    );
};

export default ModalDetails;
