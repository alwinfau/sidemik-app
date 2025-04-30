import { ThemeProvider } from "@/components/theme-provider"
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface ThemeProviderProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: ThemeProviderProps) => (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
);