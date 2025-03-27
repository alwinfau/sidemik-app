import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import { Link } from '@inertiajs/react';
import { IconBrandApple, IconBrandGoogle, IconBrandLayers } from 'justd-icons';
import React from 'react';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    return (
        <AuthLayoutTemplate title={title} description={description} {...props}>
            <div className={'flex min-h-screen items-center justify-center'}>
                <div className={'dark:border-background flex w-full max-w-5xl sm:rounded-lg md:border md:border-gray-100 md:shadow-md'}>
                    <div className={'flex flex-col gap-y-8 px-6 py-4 md:w-2/3'}>
                        <div className={'flex items-center justify-start gap-x-2'}>
                            <Link href={'/'}>
                                <IconBrandLayers className="h-10 w-10 fill-current text-gray-500" />
                            </Link>
                            <div className={'flex flex-col'}>
                                <h3 className={'font-bold text-emerald-500'}>SIDEMIK</h3>
                                <span className={'text-sm text-gray-500'}>Academic Information System</span>
                            </div>
                        </div>

                        <div className={'flex flex-col items-start gap-y-1'}>
                            <span className={'text-2xl font-bold text-emerald-500'}>Get Started Now</span>
                            <span className={'text-sm text-gray-500'}>Please enter your information to access your account</span>
                        </div>

                        {children}

                        <div className={'flex items-center gap-x-2'}>
                            <Separator className={'flex-1'} orientation={'horizontal'} />
                            <span className={'text-xs'}>Or continue with</span>
                            <Separator className={'flex-1'} orientation={'horizontal'} />
                        </div>

                        <div className={'flex flex-col gap-x-2 gap-y-2 md:flex-row'}>
                            <Button className={'md:flex-2'}>
                                <IconBrandGoogle />
                                <span className={'text-sm'}>Sign in with Google</span>
                            </Button>

                            <Button className={'md:flex-2'}>
                                <IconBrandApple />
                                <span className={'text-sm'}>Sign in with Apple</span>
                            </Button>
                        </div>
                        <div className={'flex items-center justify-center gap-x-1 text-sm text-gray-400'}>
                            <span>{import.meta.env.VITE_NAME_APP}</span>
                            <span>{import.meta.env.VITE_VERSION_APP}</span>
                        </div>
                    </div>

                    {/* side right menu with image*/}
                    <div className={'relative hidden w-full rounded-lg bg-gradient-to-br from-emerald-500 via-emerald-700 to-emerald-500 md:block'}>
                        <img src="/slides/3.jpg" className={'h-full w-full rounded-lg object-cover opacity-30'} />
                        <div className={'absolute inset-0 flex flex-col items-center justify-center gap-y-3 px-6 text-center'}>
                            <IconBrandLayers />
                            <h1 className={'border-none text-4xl font-bold text-white'}>SIDEMIK</h1>
                            <span className={'text-green-100'}>This application facilitates data management at a University</span>
                            <span className={'absolute bottom-3 flex flex-col items-center justify-center text-center text-sm text-white'}>
                                &copy; Copyright 2025 - ST.Bhinneka
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayoutTemplate>
    );
}
