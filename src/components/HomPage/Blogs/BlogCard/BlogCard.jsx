

'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { WiMoonFull } from 'react-icons/wi';
import axios from 'axios';
import './BlogCard.css'; // Import external CSS

const BlogCard = () => {
    const [blogs, setBlogs] = useState([]);

    // Function to fetch blog data
    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/blog-post/api`);
            setBlogs(res.data.result);
        } catch (error) {
            console.error('Error fetching blog data:', error);
        }
    };

    useEffect(() => {
        getData(); // Fetch data on component mount
    }, []);

    return (
        <article>
            <div className="mt-6">
                <h3 className="text-xl font-bold mb-2">Blog Posts</h3>

                <section className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {/* Blog Cards */}
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <div key={blog._id} className="border h-[500px] p-4 rounded mb-4 flex flex-col gap-6 justify-between">


                                {/* Blog Image */}
                                <div className='h-[50%]'>
                                     {blog.image && (
                                    <Image
                                        width={200}
                                        height={0}
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full mt-4 object-cover"
                                    />
                                )} 
                                </div>
                              
                               <div className='w-full h-[50%]'>
                               <h2 className="text-2xl font-bold">{blog.title}</h2>
                               <p className="text-gray-700 mt-2">{blog.description}</p>
                               </div>
                                {/* Blog Content */}
                                {/* {blog.content && (
                                    <div
                                        className="mt-4"
                                        dangerouslySetInnerHTML={{ __html: blog.content }}
                                    />
                                )} */}
                            </div>
                        ))
                    ) : (
                        <p>Loading blogs...</p>
                    )}
                </section>


            </div>
        </article>
    );
};

export default BlogCard;
