// import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
// import { UserInfo } from '@/components/user-info';
// import { UserMenuContent } from '@/components/user-menu-content';
// import { useIsMobile } from '@/hooks/use-mobile';
// import { type SharedData } from '@/types';
// import { usePage } from '@inertiajs/react';
// import { ChevronsUpDown } from 'lucide-react';
//
// export function NavUser() {
//     const { auth } = usePage<SharedData>().props;
//     const { state } = useSidebar();
//     const isMobile = useIsMobile();
//
//     return (
//         <SidebarMenu>
//             <SidebarMenuItem>
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <SidebarMenuButton size="lg" className="text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent group">
//                             <UserInfo user={auth.user} />
//                             <ChevronsUpDown className="ml-auto size-4" />
//                         </SidebarMenuButton>
//                     </DropdownMenuTrigger>
//                     {/*<DropdownMenuContent  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"  align="end" side={isMobile ? 'bottom' : state === 'collapsed' ? 'left' : 'bottom'}>*/}
//                     <DropdownMenuContent  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side={isMobile ? "bottom" : "right"} align={'end'} sideOffset={4}>
//                         <UserMenuContent user={auth.user} />
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             </SidebarMenuItem>
//         </SidebarMenu>
//     );
// }

'use client';

import { ChevronsUpDown } from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';

export function NavUser() {
    const { isMobile } = useSidebar();
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <UserInfo />
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align={'end'}
                        sideOffset={4}
                    >
                        <UserMenuContent />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
