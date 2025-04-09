import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';


export function UserInfo({ user, showEmail = true }: { user: User; showEmail?: boolean }) {
    const getInitials = useInitials();
   
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-lg">
                <AvatarImage src='/public/logo.svg' alt={username || ""} />
                <AvatarFallback className="bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">{getInitials(username || "")}</AvatarFallback>
            </Avatar> 
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{ username }</span>
                {showEmail && <span className="text-muted-foreground truncate text-xs">{email}</span>}
            </div>
        </>
    );
}
