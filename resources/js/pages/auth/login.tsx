import { Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import { login } from '@/API/auth';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { FormTextInput } from '@/components/ui/Components_1/FormInput';
import AuthLayout from '@/layouts/auth-layout';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

const schema = z.object({
    email: z.string().min(1),
    password: z.string().min(1),
});

type FormInputs = z.infer<typeof schema>;

export default function Login({ status }: LoginProps) {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            await login(data);
        } catch (error: any) {
            setError('root', {
                message: error?.meta?.message,
            });
        }
    };

    return (
        <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
            <Head title="Sign in" />

            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                    <FormTextInput id="email" label="Email" type="text" {...register('email')} error={errors.email?.message} />
                    <FormTextInput id="password" label="Password" type="password" {...register('password')} error={errors.password?.message} />

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={isSubmitting}>
                        {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Sign in
                    </Button>
                </div>

                {errors.root?.message && <div className="mt-2 text-center text-sm text-red-500">{errors.root.message}</div>}

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
