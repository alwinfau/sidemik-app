import AppLayout from '@/layouts/app-layout';
import StatusDosenPage from '@/layouts/ComponentPages/StatusDosen';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type Props = {};

const StatusDosen = (props: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [{ title: ' Status Dosen ', href: '/lecture-status' }];

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Status Dosen" />
                <StatusDosenPage />
            </AppLayout>
        </>
    );
};
export default StatusDosen;
