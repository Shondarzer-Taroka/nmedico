import React from 'react';
import Image from 'next/image';
import { FaCircle } from 'react-icons/fa6';
import Link from 'next/link';
const CombinedBlogs = ({blogs}) => {
    console.log('cm',blogs);
    
    return (
        <div>
              <section className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <Link key={blog._id} href={`/blog-post/view-details/${blog._id}`}>
                            <div className="relative border h-[400px] p-4 rounded mb-4 flex flex-col gap-6 justify-between">
                                {/* Blog Image */}
                                <div className="relative h-[60%] overflow-hidden group rounded-md w-full">
                                    {blog.image && (
                                        <Image
                                            width={200}
                                            height={0}
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform"
                                        />
                                    )}

                                    {/* Grid Overlay (3x3 structure that expands row by row) */}
                                    <div className="absolute w-full inset-0 grid grid-rows-3 grid-cols-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                        {/* First Row */}
                                        <div className="bg-violet-500 w-full opacity-30 transform scale-y-0 group-hover:scale-y-100 transition-all duration-500 ease-out"></div>
                                        {/* Second Row */}
                                        <div className="bg-violet-500 w-full opacity-30 transform scale-y-0 group-hover:scale-y-100 transition-all duration-700 ease-out"></div>
                                        {/* Third Row */}
                                        <div className="bg-violet-500 w-full opacity-30 transform scale-y-0 group-hover:scale-y-100 transition-all duration-900 ease-out"></div>
                                    </div>
                                </div>

                                {/* Blog Content */}
                                <div className="w-full">
                                    <div className="flex justify-between">
                                        <span className="flex gap-2 items-center"> 
                                            <FaCircle /> APRIL 10, 2024
                                        </span>
                                        <span className="flex gap-2 items-center"> 
                                            <FaCircle /> ADMIN
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold">{blog.title}</h2>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No Data Found</p>
                )}
            </section>
        </div>
    );
};

export default CombinedBlogs;