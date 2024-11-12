// 'use client';
// import { useFormik } from 'formik';
// import { signIn, useSession } from 'next-auth/react';
// import Link from 'next/link';
// import { useRouter, useSearchParams } from 'next/navigation';
// import React from 'react';
// import toast, { Toaster } from 'react-hot-toast';

// const LogIn = () => {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const redirect = searchParams.get('redirect') || '/';
//     const { data } = useSession();
// console.log(redirect);

//     const formik = useFormik({
//         initialValues: {
//             email: '',
//             password: ''
//         },
//         onSubmit: async (values) => {
//             console.log(values);

//             // Pass email and password directly to the signIn function
//             const resp = await signIn('credentials', {
//                 email: values.email,
//                 password: values.password,
//                 redirect: false,
//                 callbackUrl: redirect
//             });

//             if (resp?.error) {
//                 console.log('Login failed: ' + resp.error);
//             } else {
//                 toast.success('Login successful!');
//                 router.push(resp.url || '/');
//             }
//         }
//     });

//     return (
//         <div>
//             <Toaster />
//             <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/assets/avatar4.jpg)' }}>
//                 <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full">
//                     <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Login</h2>
//                     <form onSubmit={formik.handleSubmit}>
//                         <div className="mb-4">
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//                                 placeholder="Enter your email"
//                                 required
//                                 {...formik.getFieldProps('email')}
//                             />
//                         </div>
//                         <div className="mb-6">
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//                                 placeholder="Enter your password"
//                                 required
//                                 {...formik.getFieldProps('password')}
//                             />
//                         </div>
//                         <button
//                             type="submit"
//                             className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                         >
//                             Login
//                         </button>
//                     </form>
//                     <p className="mt-4">Not registered? <Link href={'/signup'}>Register</Link></p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LogIn;







'use client';
import { useFormik } from 'formik';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const LogIn = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session } = useSession();

    // Get the redirect parameter from the URL or default to home page
    const redirect = searchParams?.get('redirect') || '/';

    // Check if the user is already logged in and redirect if necessary
    useEffect(() => {
        if (session?.user?.email) {
            router.replace(redirect);
        }
    }, [session, router, redirect]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            const resp = await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false,
                callbackUrl: redirect
            });

            if (resp?.error) {
                toast.error('Login failed: ' + resp.error);
            } else {
                toast.success('Login successful!');
                router.replace(resp.url || redirect);
            }
        }
    });

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
                    <p className="mt-4">Not registered? <Link href={'/signup'}>Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
