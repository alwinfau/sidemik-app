import AppLayout from '@/layouts/app-layout';
import DevisiTendikPage from '@/layouts/ComponentPages/AcademicPositionTypes';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type Props = {};

const DevisiTendik= (props: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [{ title: ' DevisiTendik ', href: '/staff-division' }];

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="DevisiTendikPage" />
                <DevisiTendikPage />
            </AppLayout>
        </>
    );
};
export default DevisiTendik;
