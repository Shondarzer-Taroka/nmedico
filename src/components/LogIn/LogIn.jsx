
'use client';
import { useFormik } from 'formik';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const LogIn = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, status } = useSession();

    // Get the redirect parameter from the URL or default to home page
    const redirect = searchParams?.get('redirect') || '/';

    // Check if the user is already logged in and redirect if necessary
    useEffect(() => {
        if (status === 'authenticated' && session?.user?.email) {
            toast.success('Login successful!', { duration: 5000 });
            setTimeout(() => {
                router.replace(redirect);
            }, 3000); // Redirect after 3 seconds
        }
    }, [session?.user?.email, status, router, redirect]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            const resp = await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: true,
                callbackUrl: redirect
            });

            if (resp?.error) {
                toast.error('Login failed: ' + resp.error);
            } else {
                // Trigger a re-fetch of the session data to ensure it's updated
                toast.success('Login successful!', { duration: 3000 });
                // setTimeout(() => {

                router.push(resp.url || redirect);

                // }, 5000); // Wait 3 seconds before redirecting
            }
        }
    });


    const handleSignInBySocial = async (provider) => {
        await signIn(provider)
        try {
            let res = await fetch('http://localhost:3000/signup/api', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Handle response here
            if (res.ok) {
                const data = await res.json();
                toast.success('Registration successful') 
            } else {
                console.error('Registration failed:', res.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
    return (
        <div>
            <Toaster />
            <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/assets/avatar4.jpg)' }}>
                <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Login</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Enter your email"
                                required
                                {...formik.getFieldProps('email')}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Enter your password"
                                required
                                {...formik.getFieldProps('password')}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Login
                        </button>
                    </form>
                    <div>
                        <div className="flex items-center justify-center w-full my-4">
                            <div className="w-full border-t border-gray-400"></div>
                            <span className="mx-4 text-gray-500">OR</span>
                            <div className="w-full border-t border-gray-400"></div>
                        </div>
                        <button

                            onClick={() => handleSignInBySocial('google')}
                            className=" text-gray-500 font-bold w-full px-4 py-2 gap-2 rounded-md border flex items-center justify-center bg-gray-100"
                        >
                            Login With
                            <Image width={30} height={30} src={'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png'} alt='google iamge' />

                        </button>
                    </div>
                    <p className="mt-4">Not registered? <Link href={'/signup'}>Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
