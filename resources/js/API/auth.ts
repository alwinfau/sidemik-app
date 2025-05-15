// src/api/auth.ts
import config from '@/config';
import { router } from '@inertiajs/react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface LoginData {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

// export interface UserData {
//     data: {
//         username: string;
//         email: string;
//         token: string;
//     };
// }

export const login = async (data: LoginData): Promise<void> => {
    try {
        const response = await axios.post<any>(`${config.auth_url}/access-token`, data);
        const token = response.data.data.token;
        console.log(token)
        const username = response.data.data.user.name;
        const email = response.data.data.user.email;

        Cookies.set('token', token, {
            expires: 1,
            path: '/',
            sameSite: 'Lax',
            httpOnly: false,
            // sameSite: 'None', // aktifkan kalau pakai HTTPS
            // secure: true, // aktifkan kalau pakai HTTPS
        });

        localStorage.setItem('username', username);
        localStorage.setItem('email', email);

        if (token) {
            router.visit('/dashboard');
        }
    } catch (error) {
        console.error('Login failed:', error);
        router.visit('/login');
    }
};
