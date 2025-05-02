import AppLayout from '@/layouts/app-layout';
import Regencies from '@/layouts/ComponentPages/Regencies';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type Props = {};

const RegenciesPages = (props: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [{ title: ' Regencies ', href: '/regency' }];

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Regencies" />
                <Regencies />
            </AppLayout>
        </>
    );
};
export default RegenciesPages;
