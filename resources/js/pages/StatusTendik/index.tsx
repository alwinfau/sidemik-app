import AppLayout from '@/layouts/app-layout';
import StatusTendikPage from '@/layouts/ComponentPages/StatusTendik';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type Props = {};

const StatusTendik = (props: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [{ title: ' Status Tendik ', href: '/staff-status' }];

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Status Tendik" />
                <StatusTendikPage />
            </AppLayout>
        </>
    );
};
export default StatusTendik ;
