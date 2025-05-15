import AppLayout from '@/layouts/app-layout';
import AcademicPosition from '@/layouts/ComponentPages/AcademicPosition/AcademicPosition';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type Props = {};

const AcademicPositionPages = (props: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [{ title: ' Academic Position ', href: '/academic-positions' }];

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Academic Position" />
                <AcademicPosition />
            </AppLayout>
        </>
    );
};
export default AcademicPositionPages;
