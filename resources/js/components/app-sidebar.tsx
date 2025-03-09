"use client"

import * as React from "react"
import {
    BookCheckIcon,
    BookOpen,
    DatabaseIcon, DollarSign,
    Frame, InboxIcon,
    LaptopMinimalCheck, Layers2, LucideHandshake, LucideLandmark,
    Map, NewspaperIcon,
    PieChart, Repeat2,
    Settings2, SwatchBookIcon,
    TrophyIcon, UserPlus2Icon, Users, Users2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import {TeamSwitcher} from "@/components/team-switcher";
import { NavUser } from "@/components/nav-user"
import {NavProjects} from "@/components/nav-project";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
    user: {
        name: "Alwin Fau",
        email: "alwin@gmail.com",
        avatar: "",
    },
    teams: [
        {
            // Sistem Informasi Akademik
            name: "SIDEMIK",
            logo: Layers2,
            plan: "Enterprise",
        },
        {
            // Sistem Informasi Keuangan
            name: "SIMKEU",
            logo: DollarSign,
            plan: "Growth",
        },
        {
            // Sistem Informasi Kepagawaian
            name: "SIMPEG",
            logo: Users2,
            plan: "Business",
        },
        {
            // Sistem Informasi Seleksi Penerimaan Mahasiswa Baru
            name: "SIMARU",
            logo: UserPlus2Icon,
            plan: "Professional",
        },
        {
            // Sistem Informasi Pencegahan dan Penanganan Kekerasan Perguruan Tinggi
            name: "SIPPKPT",
            logo: LucideHandshake,
            plan: "Premium",
        },
        {
            // Sistem Informasi Akreditasi
            name: "SIMASI",
            logo: TrophyIcon,
            plan: "Enterprise",
        },
        {
            // Sistem Informasi Computer Based Test
            name: "SICBT",
            logo: LaptopMinimalCheck,
            plan: "Free",
        },
        {
            // Sistem Informasi Merdeka Belajar Kampus Merdeka
            name: "SIMBKM",
            logo: Repeat2,
            plan: "Free",
        }
    ],

    navMain: [
        {
            title: "Supplementary Data",
            url: "#",
            icon: LucideLandmark,
            isActive: false,
            items: [
                {
                    title: "Profile University",
                    url: "#",
                },
                {
                    title: "Faculty"
                },
                {
                    title: "Study Program"
                }
            ]
        },
        {
            title: "Resource",
            url: "#",
            icon: DatabaseIcon,
            isActive: true,
            items: [
                {
                    title: "Students",
                    url: "#",
                },
                {
                    title: "Course",
                    url: "#",
                },
                {
                    title: "Course Type",
                    url: "#",
                },
                {
                    title: "Course Group",
                    url: "#",
                },
                {
                    title: "Room",
                    url: "#",
                },
                {
                    title: "Class",
                    url: "#",
                },{
                    title: "Student Batch",
                    url: "#",
                },
            ],
        },
        {
            title: "Employee",
            url: "#",
            icon: Users,
            items: [
                {
                    title: "Lecture",
                    url: "#",
                },
                {
                    title: "Administrative Staff",
                    url: "#",
                },
            ],
        },
        {
            title: "Assessment",
            url: "#",
            icon: BookCheckIcon,
            items: [
                {
                    title: "Midterm Exam",
                    url: "#",
                },
                {
                    title: "Final Exam",
                    url: "#",
                },
            ],
        },
        {
            title: "Correspondence",
            url: "#",
            icon: SwatchBookIcon,
            items: [
                {
                    title: "Certificate of Enrollment",
                    url: "#",
                },
                {
                    title: "Letter of Resignation",
                    url: "#",
                },
                {
                    title: "Leave of Absence Letter",
                    url: "#",
                },
            ],
        },
        {
            title: "Report Academic",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
            ],
        },
        {
            title: "Questionnaire",
            url: "#",
            icon: InboxIcon,
            items: [
                {
                    title: "Lecture",
                    url: "#",
                },
                {
                    title: "Head of Study Program",
                    url: "#",
                },
            ],
        },
        {
            title: "News Management",
            url: "#",
            icon: NewspaperIcon,
            items: [
                {
                    title: "News",
                    url: "#",
                },
                {
                    title: "News Category",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "Academic Period",
                    url: "#",
                },
                {
                    title: "Payments",
                    url: "#",
                },
                {
                    title: "Application",
                    url: "#",
                },
                {
                    title: "Notification",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
