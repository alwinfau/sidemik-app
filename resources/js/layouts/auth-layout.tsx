import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { IconBrandApple, IconBrandGoogle, IconBrandLayers } from 'justd-icons';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    return (
        <AuthLayoutTemplate title={title} description={description} {...props}>
            <div className={'flex min-h-screen  items-center justify-center'}>
                <div className={'w-full max-w-5xl sm:rounded-lg md:shadow-md flex md:border md:border-gray-100 dark:border-background'}>
                    <div className={'flex flex-col px-6 py-4 gap-y-8 md:w-2/3'}>
                        <div className={'flex items-center justify-start gap-x-2'}>
                            <Link href={'/'}>
                                <IconBrandLayers className="h-10 w-10 fill-current text-gray-500"/>
                            </Link>
                            <div className={'flex flex-col'}>
                                <h3 className={'font-bold text-emerald-500'}>SIDEMIK</h3>
                                <span className={'text-sm text-gray-500'}>Academic Information System</span>
                            </div>
                        </div>

                        <div className={'flex flex-col items-start gap-y-1'}>
                            <span className={'text-emerald-500 font-bold text-2xl'}>Get Started Now</span>
                            <span className={'text-sm text-gray-500'}>Please enter your information to access your account</span>
                        </div>

                        {children}

                        <div className={'flex items-center gap-x-2'}>
                            <Separator className={'flex-1'} orientation={'horizontal'}/>
                            <span className={'text-xs'}>Or continue with</span>
                            <Separator className={'flex-1'}  orientation={'horizontal'}/>
                        </div>

                        <div className={'flex flex-col md:flex-row gap-x-2 gap-y-2'}>
                            <Button className={'md:flex-2'}>
                                <IconBrandGoogle/>
                                <span className={'text-sm'}>Sign in with Google</span>
                            </Button>

                            <Button className={'md:flex-2'} >
                                <IconBrandApple/>
                                <span className={'text-sm'}>Sign in with Apple</span>
                            </Button>
                        </div>
                        <div className={'flex items-center gap-x-1 text-sm text-gray-400 justify-center'}>
                            <span>{import.meta.env.VITE_NAME_APP}</span>
                            <span>{import.meta.env.VITE_VERSION_APP}</span>
                        </div>
                    </div>

                    {/* side right menu with image*/}
                    <div className={'hidden md:block w-full bg-gradient-to-br from-emerald-500 via-emerald-700 to-emerald-500 rounded-lg relative'}>
                        <img src='/slides/3.jpg' className={'object-cover h-full w-full rounded-lg opacity-30'}/>
                        <div className={'absolute inset-0 flex items-center justify-center flex-col text-center gap-y-3 px-6'}>
                            <IconBrandLayers/>
                            <h1 className={'text-4xl font-bold text-white border-none '}>SIDEMIK</h1>
                            <span className={'text-green-100'}>
                            This application facilitates data management at a University
                        </span>
                            <span className={'absolute bottom-3 text-white text-sm flex flex-col items-center justify-center text-center '}>
                            &copy; Copyright 2025 - ST.Bhinneka
                        </span>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayoutTemplate>
    );
}
