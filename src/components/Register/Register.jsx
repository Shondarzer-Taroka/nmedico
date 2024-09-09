'use client'
import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import convertToBase64 from '../hepler/convert';
import { useFormik } from 'formik';
import { usernameVerification } from '../hepler/verify';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
const Register = () => {
    let [file,setFile] = useState('')
    const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            values = Object.assign(values, { image: {photo:file} });
            values = Object.assign(values, { role: 'user' });
            
            try {
                let res = await fetch('https://nmedico.vercel.app/signup/api', {
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
                    // resetForm()
                     formik.resetForm()
                    setFile('')
                    console.log('Registration successful:', data);    
                } else {
                    console.error('Registration failed:', res.statusText);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        },
    });

    const upload=async(e)=>{
      let base64=await convertToBase64(e.target.files[0])
      setFile(base64)
    }
    // console.log(file);
    
    return (
        <div>
            <Toaster/>
            <div>
                <div className="relative min-h-screen flex items-center justify-center bg-black">
                    {/* Polygon Animation Background */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="polygon-animation"></div>
                    </div>

                    {/* Glassmorphic Registration Form */}
                    <div className="relative z-10 bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-md w-full border border-white border-opacity-30">
                        <h2 className="text-3xl font-bold text-center text-white mb-6">Register</h2>
                        <div>
                            <h1 className='text-2xl text-center text-white font-semibold'>Profile</h1>
                            <div className="max-w-[70px] mx-auto h-[70px] rounded-full shadow-md flex items-center justify-center">
                                <label className="w-full h-full" htmlFor="profile">
                                    {file ? (
                                        <Image width={70} height={70} src={file} className="w-full h-full rounded-full" alt="Profile" />
                                    ) : (
                                        <Image width={70} height={70} src="/assets/avatar4.jpg" className="w-full h-full rounded-full" alt="Placeholder" />
                                    )}
                                </label>
                                <input onChange={upload} className="hidden" type="file" name="profile" id="profile" />
                            </div>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="mt-1 text-white block w-full px-3 py-2 bg-transparent border border-white rounded-md shadow-sm placeholder-gray-300 focus:bg-white focus:text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter your name"
                                    required
                                    {...formik.getFieldProps('name')}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-sm font-medium text-white">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="mt-1 block w-full text-white px-3 py-2 bg-transparent border border-white rounded-md shadow-sm placeholder-gray-300 focus:bg-white focus:text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter your username"
                                    required
                                    {...formik.getFieldProps('username')}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        usernameVerification(event);
                                      }}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="mt-1 block w-full px-3 py-2 text-white bg-transparent border border-white rounded-md shadow-sm placeholder-gray-300 focus:bg-white focus:text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter your email"
                                    required
                                    {...formik.getFieldProps('email')}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="mt-1 block w-full px-3 text-white py-2 bg-transparent border border-white rounded-md shadow-sm placeholder-gray-300 focus:bg-white focus:text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter your password"
                                    required
                                    {...formik.getFieldProps('password')}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;



