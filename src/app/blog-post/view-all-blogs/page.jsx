
'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './BlogCard.css'; // Import external CSS if needed
import { FaCircle } from "react-icons/fa6";
import Link from 'next/link';
const Page = () => {
    const [blogs, setBlogs] = useState([]);

    // Function to fetch blog data
    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/blog-post/view-all-blogs/api`);
            setBlogs(res.data.result);
        } catch (error) {
            console.error('Error fetching blog data:', error);
        }
    };

    useEffect(() => {
        getData(); // Fetch data on component mount
    }, []);

    return (
        <div>

            <section className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {/* Blog Cards */}
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <Link key={blog._id} href={`/blog-post/view-details/${blog._id}`}>
                            <div  className="relative border h-[400px] p-4 rounded mb-4 flex flex-col gap-6 justify-between">
                                {/* Blog Image */}
                                <div className="relative h-[60%] overflow-hidden group rounded-md w-full">
                                    {blog.image && (
                                        <Image
                                            width={200}
                                            height={0}
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform "
                                        />
                                    )}

                                    {/* Grid Overlay (3x3 structure that expands column by column) */}
                                    <div className="absolute w-full inset-0 grid grid-cols-3 grid-rows-3  opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                        {/* First Column */}
                                        <div className="bg-cyan-100 w-full opacity-80 transform scale-y-0 group-hover:scale-y-100 transition-all duration-500 ease-out"></div>
                                        <div className="bg-cyan-100 w-full opacity-80 transform scale-y-0 group-hover:scale-y-100 transition-all duration-500 ease-out"></div>
                                        <div className="bg-cyan-100 w-full opacity-80 transform scale-y-0 group-hover:scale-y-100 transition-all duration-500 ease-out"></div>

                                        {/* Second Column */}
                                        <div className="bg-cyan-100 w-full opacity-80 transform scale-y-0 group-hover:scale-y-100 transition-all duration-700 ease-out"></div>
                                        <div className="bg-cyan-100 w-full opacity-80 transform scale-y-0 group-hover:scale-y-100 transition-all duration-700 ease-out"></div>
                                        <div className="bg-cyan-100 w-full opacity-80 transform scale-y-0 group-hover:scale-y-100 transition-all duration-700 ease-out"></div>

                                        {/* Third Column */}
                                        <div className="bg-cyan-100 w-full opacity-80 transform scale-y-0 group-hover:scale-y-100 transition-all duration-900 ease-out"></div>
                                        <div className="bg-cyan-100 w-full opacity-80 transform scale-y-0 group-hover:scale-y-100 transition-all duration-900 ease-out"></div>
                                        <div className="bg-cyan-100 w-full opacity-80 transform scale-y-0 group-hover:scale-y-100 transition-all duration-900 ease-out"></div>
                                    </div>
                                </div>

                                {/* Blog Content */}
                                <div className="w-full">
                                    <div className='flex justify-between'>
                                        <span className='flex gap-2 items-center'> <FaCircle /> APRIL 10, 2024</span>
                                        <span className='flex gap-2 items-center'> <FaCircle /> ADMIN</span>
                                    </div>
                                    <h2 className="text-2xl font-bold">{blog.title}</h2>

                                </div>
                            </div>
                        </Link>

                    ))
                ) : (
                    <p>Loading blogs...</p>
                )}
            </section>

        </div>
    );
};

export default Page;