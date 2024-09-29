// 'use client'
// import axios from 'axios';
// import { useFormik } from 'formik';
// import { signIn, useSession } from 'next-auth/react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// import React from 'react';
// import toast, { Toaster } from 'react-hot-toast';

// const LogIn = () => {
//     let router=useRouter()
//     let {data}=useSession()
//     let formik = useFormik({
//         initialValues: {
//             email: '',
//             password: ''
//         },
//         onSubmit: async (values) => {
//             console.log(values);

//             // Pass email and password directly to the signIn function
//             let resp = await signIn('credentials', {
//                 email: values.email,
//                 password: values.password,
//                 redirect: false
//             });

//             // console.log(resp);

//             // Handle response and show appropriate messages
//             if (resp?.error) {
//                 // Display error message to the user
//                 console.log('Login failed: ' + resp.error);

//             } else {
//                 // Redirect or show success message
//                 toast.success('Login successful!');
//                  console.log(data);
//                 //  axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/login/user/api/${formik.values.email}`)
//                 //  .then(res=>{
//                 //     // console.log(res);
//                 //     if (res.data) {
//                 //         return router.push(`/`)
//                 //     }
//                 //     if (res.data) {
//                 //         router.push(`/dashboard/${res?.data?.role}`)
//                 //     }
//                 //  })
//                 // .catch(err=>{
//                 //     // console.log(err);
                    
//                 // })
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
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 placeholder="Enter your password"
//                                 required
//                                 {...formik.getFieldProps('password')}
//                             />
//                         </div>
//                         <button
//                             type="submit"
//                             className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
//                         >
//                             Login
//                         </button>
//                     </form>

//                     <div>
//                         <p>google</p>
//                         <p>facebook</p>
//                     </div>

//                     <p>Not registerd? <Link href={'/signup'}>Register</Link>  </p>
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
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const LogIn = () => {
    const seacrparams = useSearchParams()
    const path = seacrparams.get('redirect')
    console.log('login',path);
    
    let router = useRouter();
    let { data } = useSession();

    let formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            console.log(values);

            // Pass email and password directly to the signIn function
            let resp = await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false,
                // callbackUrl: path ? path : '/'
                callbackUrl:path ? path:'/'
            });
            if (resp?.error) {
                // Display error message to the user
                console.log('Login failed: ' + resp.error);
                toast.error('Login failed: ' + resp.error);
            } else {
                // Redirect or show success message
                toast.success('Login successful!');
                // router.push('/dashboard');
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
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter your password"
                                required
                                {...formik.getFieldProps('password')}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-4">
                        <button 
                            onClick={() => signIn('google', {
                                redirect: true,
                                callbackUrl: path ? path : '/'
                            })}
                            className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 mt-4">
                            Sign in with Google
                        </button>

                        <button 
                            onClick={() => signIn('facebook')} 
                            className="w-full px-4 py-2 bg-blue-700 text-white font-semibold rounded-md shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 mt-4">
                            Sign in with Facebook
                        </button>
                    </div>

                    <p className="mt-4">Not registered? <Link href={'/signup'}>Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
