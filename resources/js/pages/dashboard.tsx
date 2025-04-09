import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const token = localStorage.getItem('token');
    console.log("TOKEN",token)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex aspect-video flex-col place-content-center items-center overflow-hidden rounded-xl border">
                        {'This Card To Count Students'}
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex aspect-video flex-col place-content-center items-center overflow-hidden rounded-xl border">
                        {'This a card to show employee'}
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex aspect-video flex-col place-content-center items-center overflow-hidden rounded-xl border">
                        {'This a card to show course'}
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex aspect-video flex-col place-content-center items-center overflow-hidden rounded-xl border">
                        {'This a card to show payment'}
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex min-h-[100vh] flex-1 flex-col place-content-center items-center overflow-hidden rounded-xl border md:min-h-min">
                    {'This a card to show item urgent activity'}
                </div>
            </div>
        </AppLayout>
    );
}
