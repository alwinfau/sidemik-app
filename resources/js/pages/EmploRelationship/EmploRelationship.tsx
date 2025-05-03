import AppLayout from '@/layouts/app-layout';
import EmployeeRelationshipPages from '@/layouts/ComponentPages/EmployeeRelationship/EmploRelationship';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type Props = {};

const EmployeeRelationshipTypePages= (props: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [{ title: ' Employee Relationship ', href: '/employments-relationship' }];

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="EmployeeRelationshipPages" />
                <EmployeeRelationshipPages />
            </AppLayout>
        </>
    );
};
export default EmployeeRelationshipTypePages;
