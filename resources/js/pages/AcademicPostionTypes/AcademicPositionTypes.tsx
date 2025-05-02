import AppLayout from '@/layouts/app-layout';
import AcademicPositionTypesPages from '@/layouts/ComponentPages/AcademicPositionTypes';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type Props = {};

const AcademicPositionTypes= (props: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [{ title: ' AcademicPositionTypes ', href: '/academic-positions-types' }];

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="AcademicPositionTypesPages" />
                <AcademicPositionTypesPages />
            </AppLayout>
        </>
    );
};
export default AcademicPositionTypes;
