import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    items?: {
        title: string;
        url: string;
    }[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface ApiResponse<T> {
    meta: {
        code: number;
        status: string;
        message: string;
    };
    data: T;
}

export type PaginatedApiResponse<T> = {
    meta: {
        code: number;
        status: string;
        message: string;
    };
    data: {
        current_page: number;
        data: T[];
        from?: number;
        last_page?: number;
        per_page?: number;
        to?: number;
        total?: number;
        [key: string]: any; // biar fleksibel kalau ada tambahan
    };
};
