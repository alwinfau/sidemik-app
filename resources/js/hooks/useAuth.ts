import { useState } from 'react';

export default function useAuth() {
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem('token');
    });

    const [user, setUser] = useState<any>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (token: string, userData: any) => {
        setToken(token);
        setUser(userData);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return {
        token,
        user,
        login,
        logout,
    };
}
