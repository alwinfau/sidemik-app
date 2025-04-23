import { LayoutGrid } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="bg-text-sidebar flex aspect-square size-8 items-center justify-center rounded-md">
                <LayoutGrid />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none">Dashboard</span>
            </div>
        </>
    );
}
