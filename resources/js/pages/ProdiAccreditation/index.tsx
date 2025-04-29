import AppLayout from '@/layouts/app-layout';
import ProdyAccreditation from '@/layouts/ComponentPages/ProdyAccreditation';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type Props = {};

const ProdyAccreditationPages = (props: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [{ title: ' Prodi Accreditation ', href: '/prodi-accreditation' }];

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Prodi Accreditation" />
                <ProdyAccreditation />
            </AppLayout>
        </>
    );
};
export default ProdyAccreditationPages;
