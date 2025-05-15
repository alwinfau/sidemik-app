import { Breadcrumbs } from '@/components/breadcrumbs';
import { NavActions } from '@/components/nav-actions';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { SidebarTrigger } from './ui/sidebar';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b bg-[#0D9044] px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1 text-white" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className={'ml-auto'}>
                <NavActions />
            </div>
        </header>
    );
}
