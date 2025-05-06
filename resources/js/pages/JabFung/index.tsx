import AppLayout from '@/layouts/app-layout';
import JabatanFungsionalPage from '@/layouts/ComponentPages/JabFung';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type Props = {};

const JabatanFungsional = (props: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [{ title: ' Jabatan Fungsional ', href: '/functional-position' }];

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Jabatan Fungsional" />
                <JabatanFungsionalPage />
            </AppLayout>
        </>
    );
};
export default JabatanFungsional;
