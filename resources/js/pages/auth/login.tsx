// import { Head, useForm } from '@inertiajs/react';
// import { LoaderCircle } from 'lucide-react';
// import { FormEventHandler } from 'react';
//
// import InputError from '@/components/input-error';
// import TextLink from '@/components/text-link';
// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import AuthLayout from '@/layouts/auth-layout';
//
// type LoginForm = {
//     email: string;
//     password: string;
//     remember: boolean;
// };
//
// interface LoginProps {
//     status?: string;
//     canResetPassword: boolean;
// }
//
// export default function Login({ status, canResetPassword }: LoginProps) {
//     const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
//         email: '',
//         password: '',
//         remember: false,
//     });
//
//     const submit: FormEventHandler = (e) => {
//         e.preventDefault();
//         post(route('login'), {
//             onFinish: () => reset('password'),
//         });
//     };
//
//     return (
//         <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
//             <Head title="Sign in" />
//
//             <form className="flex flex-col gap-6" onSubmit={submit}>
//                 <div className="grid gap-6">
//                     <div className="grid gap-2">
//                         <Label htmlFor="email">Email address</Label>
//                         <Input
//                             id="email"
//                             type="email"
//                             required
//                             autoFocus
//                             tabIndex={1}
//                             autoComplete="email"
//                             value={data.email}
//                             onChange={(e) => setData('email', e.target.value)}
//                             placeholder="email@example.com"
//                             disabled={processing}
//                         />
//                         <InputError message={errors.email} />
//                     </div>
//
//                     <div className="grid gap-2">
//                         <div className="flex items-center">
//                             <Label htmlFor="password">Password</Label>
//                             {canResetPassword && (
//                                 <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
//                                     Forgot password?
//                                 </TextLink>
//                             )}
//                         </div>
//                         <Input
//                             id="password"
//                             type="password"
//                             required
//                             tabIndex={2}
//                             autoComplete="current-password"
//                             value={data.password}
//                             onChange={(e) => setData('password', e.target.value)}
//                             placeholder="Password"
//                             disabled={processing}
//                         />
//                         <InputError message={errors.password} />
//                     </div>
//
//                     <div className="flex items-center space-x-3">
//                         <Checkbox
//                             id="remember"
//                             name="remember"
//                             checked={data.remember}
//                             onClick={() => setData('remember', !data.remember)}
//                             tabIndex={3}
//                             disabled={processing}
//                         />
//                         <Label htmlFor="remember">Remember me</Label>
//                     </div>
//
//                     <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
//                         {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
//                         Sign in
//                     </Button>
//                 </div>
//
//                 <div className="text-muted-foreground text-center text-sm">
//                     Don't have an account?{' '}
//                     <TextLink href={route('register')} tabIndex={5}>
//                         Sign up
//                     </TextLink>
//                 </div>
//             </form>
//
//             {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
//         </AuthLayout>
//     );
// }
//

import { Head, router } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import axios from 'axios';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [data, setData] = useState<LoginForm>({
        email: '',
        password: '',
    });

    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        setErrorMessage(null);
    
        try {
            const response = await axios.post("https://demoapisidemik-main-i8jv1d.laravel.cloud/api/oauth2/v1/token/access-token", {
                ...data,
            });

            console.log(response)

    
            // Jika login berhasil, arahkan ke dashboard
            if (response.status === 200) {
             
                const token = response.data.data.token;
                const username = response.data.data.user.name
                const email = response.data.data.user.email
    
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                localStorage.setItem('email', email);
                router.visit('/dashboard'); 
            }


        } catch (error: any) {
            // Tangani error dari API
            if (error.response && error.response.data) {
                const responseData = error.response.data;
    
                // Jika ada pesan error spesifik
                if (responseData.message) {
                    setErrorMessage(responseData.message);
                }
    
                // Kalau errornya per-field
                if (responseData.errors) {
                    setErrors(responseData.errors);
                }
            } else {
                setErrorMessage("An unexpected error occurred.");
            }
        } finally {
            setProcessing(false);
        }
    };
    

    return (
        <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
            <Head title="Sign in" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            placeholder="email@example.com"
                            disabled={processing}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            {canResetPassword && (
                                <TextLink href="/forgot-password" className="ml-auto text-sm" tabIndex={5}>
                                    Forgot password?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                            placeholder="Password"
                            disabled={processing}
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        {/* <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData({ ...data, remember: !data.remember })}
                            tabIndex={3}
                            disabled={processing}
                        /> */}
                        <Label htmlFor="remember">Remember me</Label>
                    </div>

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Sign in
                    </Button>
                </div>

                {errorMessage && (
                    <div className="text-red-500 text-center text-sm mt-2">
                        {errorMessage}
                    </div>
                )}

                <div className="text-muted-foreground text-center text-sm">
                    Don't have an account?{' '}
                    <TextLink href="/register" tabIndex={5}>
                        Sign up
                    </TextLink>
                </div>
            </form>
            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}

