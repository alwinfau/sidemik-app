import AppLayout from '@/layouts/app-layout';
import Employees from '@/layouts/ComponentPages/Employees/Employees';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type Props = {};

const EmployeesPage = (props: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [{ title: ' Pegawai ', href: '/employees' }];

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Pegawai" />
                <Employees />
            </AppLayout>
        </>
    );
};
export default EmployeesPage;
