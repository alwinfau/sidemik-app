import AppLayout from '@/layouts/app-layout';
import ActiveStatusPages from '@/layouts/ComponentPages/Active Statuses';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type Props = {};

const ActiveStatusType = (props: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [{ title: ' ActiveStatusPage ', href: '/active-statuses' }];

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="ActiveStatusPages" />
                <ActiveStatusPages />
            </AppLayout>
        </>
    );
};
export default ActiveStatusType;
