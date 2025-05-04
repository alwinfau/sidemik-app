import AppLayout from '@/layouts/app-layout';
import DevisiTendikPage from '@/layouts/ComponentPages/DevisiTendik';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type Props = {};

const DevisiTendik= (props: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [{ title: ' Staff Division ', href: '/staff-division' }];

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Divisi Tendik" />
                <DevisiTendikPage />
            </AppLayout>
        </>
    );
};
export default DevisiTendik;
