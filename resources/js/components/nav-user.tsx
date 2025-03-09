import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { useIsMobile } from '@/hooks/use-mobile';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';

export function NavUser() {
    const { auth } = usePage<SharedData>().props;
    const { state } = useSidebar();
    const isMobile = useIsMobile();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size="lg" className="text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent group">
                            <UserInfo user={auth.user} />
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    {/*<DropdownMenuContent  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"  align="end" side={isMobile ? 'bottom' : state === 'collapsed' ? 'left' : 'bottom'}>*/}
                    <DropdownMenuContent  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side={isMobile ? "bottom" : "right"} align={'end'} sideOffset={4}>
                        <UserMenuContent user={auth.user} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

// "use client"
//
// import {
//     BadgeCheck,
//     Bell,
//     ChevronsUpDown,
//     CreditCard,
//     LogOut, Settings2, SettingsIcon,
//     Sparkles,
// } from "lucide-react"
//
// import {
//     Avatar,
//     AvatarFallback,
//     AvatarImage,
// } from "@/components/ui/avatar"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuGroup,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
//     useSidebar,
// } from "@/components/ui/sidebar"
//
// export function NavUser({user,}: {
//     user: {
//         name: string
//         email: string
//         avatar: string
//     }
// }) {
//     const { isMobile } = useSidebar()
//
//     return (
//         <SidebarMenu>
//             <SidebarMenuItem>
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <SidebarMenuButton  size="lg"  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
//                             <Avatar className="h-8 w-8 rounded-lg">
//                                 <AvatarImage src={user.avatar} alt={user.name} />
//                                 <AvatarFallback className="rounded-lg">CN</AvatarFallback>
//                             </Avatar>
//                             <div className="grid flex-1 text-left text-sm leading-tight">
//                                 <span className="truncate font-semibold">{user.name}</span>
//                                 <span className="truncate text-xs">{user.email}</span>
//                             </div>
//                             <ChevronsUpDown className="ml-auto size-4" />
//                         </SidebarMenuButton>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side={isMobile ? "bottom" : "right"} align={'end'} sideOffset={4}>
//                         <DropdownMenuLabel className="p-0 font-normal">
//                             <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
//                                 <Avatar className="h-8 w-8 rounded-lg">
//                                     <AvatarImage src={user.avatar} alt={user.name} />
//                                     <AvatarFallback className="rounded-lg">CN</AvatarFallback>
//                                 </Avatar>
//                                 <div className="grid flex-1 text-left text-sm leading-tight">
//                                     <span className="truncate font-semibold">{user.name}</span>
//                                     <span className="truncate text-xs">{user.email}</span>
//                                 </div>
//                             </div>
//                         </DropdownMenuLabel>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuGroup>
//                             <DropdownMenuItem>
//                                 <SettingsIcon className={'mr-2'} />
//                                 Settings
//                             </DropdownMenuItem>
//                         </DropdownMenuGroup>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem>
//                             <LogOut />
//                             Log out
//                         </DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             </SidebarMenuItem>
//         </SidebarMenu>
//     )
// }

