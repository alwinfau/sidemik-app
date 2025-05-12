import AppLayout from '@/layouts/app-layout';
import JamKuliah from '@/layouts/ComponentPages/JamKuliah';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type Props = {};

const JamKuliahPages = (props: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [{ title: ' Jam Kuliah ', href: '/jam-kuliah' }];

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Jam Kuliah" />
                <JamKuliah />
            </AppLayout>
        </>
    );
};
export default JamKuliahPages;
