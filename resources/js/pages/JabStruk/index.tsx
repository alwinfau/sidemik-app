import AppLayout from '@/layouts/app-layout';
import JabatanStrukturalPage from '@/layouts/ComponentPages/JabStruk';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type Props = {};

const JabatanStruktural = (props: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [{ title: ' Jabatan Struktural ', href: '/structural-position' }];

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Jabatan Struktural" />
                <JabatanStrukturalPage />
            </AppLayout>
        </>
    );
};
export default JabatanStruktural;
