// src/api/auth.ts
import axios from 'axios';

interface LoginData {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

export const login = async (data: LoginData): Promise<void> => {
    const response = await axios.post<LoginResponse>('https://demoapisidemik-main-i8jv1d.laravel.cloud/api/oauth2/v1/token/access-token', data);
    const { token } = response.data;
    localStorage.setItem('token', token);
};