'use client';

import {
    BookCheckIcon,
    BookOpen,
    CircleHelp,
    DatabaseIcon,
    DollarSign,
    HistoryIcon,
    InboxIcon,
    LaptopMinimalCheck,
    LayersIcon,
    LayoutGrid,
    LibraryIcon,
    LucideHandshake,
    LucideIcon,
    LucideLandmark,
    NewspaperIcon,
    Repeat2,
    Settings2,
    SwatchBookIcon,
    TrophyIcon,
    UserPlus2Icon,
    Users,
    Users2,
} from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-project';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';

import { Label } from '@/components/ui/label';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { NavItem } from '@/types';
import { Link } from '@inertiajs/react';

// This is sample data.
export interface AppData {
    teams: {
        name: string;
        logo: LucideIcon;
        plan: string;
    }[];
    navMain: NavItem[];
    projects: {
        name: string;
        url: string;
        icon: LucideIcon;
    }[];
}

const data: AppData = {
    teams: [
        {
            // Sistem Informasi Akademik
            name: 'SIDEMIK',
            logo: LayersIcon,
            plan: 'Enterprise',
        },
        {
            // Sistem Informasi Keuangan
            name: 'SIMKEU',
            logo: DollarSign,
            plan: 'Growth',
        },
        {
            // Sistem Informasi Kepagawaian
            name: 'SIMPEG',
            logo: Users2,
            plan: 'Business',
        },
        {
            // Sistem Informasi Seleksi Penerimaan Mahasiswa Baru
            name: 'SIPEMA',
            logo: UserPlus2Icon,
            plan: 'Professional',
        },
        {
            // Sistem Informasi Pencegahan dan Penanganan Kekerasan Perguruan Tinggi
            name: 'SIPPKPT',
            logo: LucideHandshake,
            plan: 'Premium',
        },
        {
            // Sistem Informasi Akreditasi
            name: 'SIMASI',
            logo: TrophyIcon,
            plan: 'Enterprise',
        },
        {
            // Sistem Informasi Computer Based Test
            name: 'SICBT',
            logo: LaptopMinimalCheck,
            plan: 'Free',
        },
        {
            // Sistem Informasi Merdeka Belajar Kampus Merdeka
            name: 'SIMBKM',
            logo: Repeat2,
            plan: 'Free',
        },
    ],

    navMain: [
        {
            title: 'Resource',
            url: '#',
            icon: DatabaseIcon,
            isActive: true,
            items: [
                {
                    title: 'Students',
                    url: '#',
                },
                {
                    title: 'Course',
                    url: '#',
                },
                {
                    title: 'Course Type',
                    url: '#',
                },
                {
                    title: 'Course Group',
                    url: '#',
                },
                {
                    title: 'Room',
                    url: '#',
                },
                {
                    title: 'Class',
                    url: '/class',
                },
                {
                    title: 'Student Batch',
                    url: '#',
                },

            ],
        },
        {
            title: 'Supplementary Data',
            url: '#',
            icon: LucideLandmark,
            isActive: false,
            items: [
                {
                    title: 'Profile University',
                    url: 'resources/university-profile',
                },
                {
                    title: 'Faculty',
                    url: '/faculty',
                },
                {
                    title: 'Study Program',
                    url: '/study-program',
                },
            ],
        },
        {
            title: 'Employee',
            url: '#',
            icon: Users,
            items: [
                {
                    title: 'Lecture',
                    url: '#',
                },
                {
                    title: 'Administrative Staff',
                    url: '#',
                },
            ],
        },
        {
            title: 'Assessment',
            url: '#',
            icon: BookCheckIcon,
            items: [
                {
                    title: 'Midterm Exam',
                    url: '#',
                },
                {
                    title: 'Final Exam',
                    url: '#',
                },
            ],
        },
        {
            title: 'Correspondence',
            url: '#',
            icon: SwatchBookIcon,
            items: [
                {
                    title: 'Certificate of Enrollment',
                    url: '#',
                },
                {
                    title: 'Letter of Resignation',
                    url: '#',
                },
                {
                    title: 'Leave of Absence Letter',
                    url: '#',
                },
            ],
        },
        {
            title: 'Report Academic',
            url: '#',
            icon: BookOpen,
            items: [
                {
                    title: 'Introduction',
                    url: '#',
                },
            ],
        },
        {
            title: 'Questionnaire',
            url: '#',
            icon: InboxIcon,
            items: [
                {
                    title: 'Lecture',
                    url: '#',
                },
                {
                    title: 'Head of Study Program',
                    url: '#',
                },
            ],
        },
        {
            title: 'News Management',
            url: '#',
            icon: NewspaperIcon,
            items: [
                {
                    title: 'News',
                    url: '#',
                },
                {
                    title: 'News Category',
                    url: '#',
                },
            ],
        },
        {
            title: 'Settings',
            url: '#',
            icon: Settings2,
            items: [
                {
                    title: 'Academic Period',
                    url: '/AcademicPeriod',
                },
                {
                    title: 'Academic Year',
                    url: '/AcademicYear',
                },
                {
                    title: 'Payments',
                    url: '#',
                },
                {
                    title: 'Application',
                    url: '#',
                },
                {
                    title: 'Notification',
                    url: '#',
                },
            ],
        },
    ],
    projects: [
        {
            name: 'Documentation',
            url: '#',
            icon: LibraryIcon,
        },
        {
            name: 'History',
            url: '#',
            icon: HistoryIcon,
        },
        {
            name: 'Help Center',
            url: '#',
            icon: CircleHelp,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size={'lg'} asChild>
                            <Link href={'/dashboard'}>
                                <LayoutGrid /> <Label>Dashboard</Label>
                            </Link>
                        </SidebarMenuButton>
                        {/* <SidebarMenuButton>
                            <Link href={'/AcademicYear'}>
                                <LayoutGrid /> <Label>Academic Year</Label>
                            </Link>
                        </SidebarMenuButton>
                             */}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain}/>
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
