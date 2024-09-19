

// 'use client';
// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaCircle } from 'react-icons/fa6';
// import Link from 'next/link';

// const Page = () => {
//     const [blogs, setBlogs] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const getData = async () => {
//         try {
//             setLoading(true);
//             const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/blog-post/view-all-blogs/api`);
//             setBlogs(res.data.result);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching blog data:', error);
//         }
//     };

//     useEffect(() => {
//         getData();
//     }, []);

//     if (loading) {
//         return <h1>loading...</h1>;
//     }

//     return (
//         <div>
//             <section className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//                 {blogs.length > 0 ? (
//                     blogs.map((blog) => (
//                         <Link key={blog._id} href={`/blog-post/view-details/${blog._id}`}>
//                             <div className="relative border h-[400px] p-4 rounded mb-4 flex flex-col gap-6 justify-between">
//                                 {/* Blog Image */}
//                                 <div className="relative h-[60%] overflow-hidden group rounded-md w-full">
//                                     {blog.image && (
//                                         <Image
//                                             width={200}
//                                             height={0}
//                                             src={blog.image}
//                                             alt={blog.title}
//                                             className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform"
//                                         />
//                                     )}

//                                     {/* Grid Overlay (3x3 structure that expands row by row) */}
//                                     <div className="absolute w-full inset-0 grid grid-rows-3 grid-cols-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
//                                         {/* First Row */}
//                                         <div className="bg-violet-500 w-full opacity-30 transform scale-y-0 group-hover:scale-y-100 transition-all duration-500 ease-out"></div>
//                                         {/* Second Row */}
//                                         <div className="bg-violet-500 w-full opacity-30 transform scale-y-0 group-hover:scale-y-100 transition-all duration-700 ease-out"></div>
//                                         {/* Third Row */}
//                                         <div className="bg-violet-500 w-full opacity-30 transform scale-y-0 group-hover:scale-y-100 transition-all duration-900 ease-out"></div>
//                                     </div>
//                                 </div>

//                                 {/* Blog Content */}
//                                 <div className="w-full">
//                                     <div className="flex justify-between">
//                                         <span className="flex gap-2 items-center"> 
//                                             <FaCircle /> APRIL 10, 2024
//                                         </span>
//                                         <span className="flex gap-2 items-center"> 
//                                             <FaCircle /> ADMIN
//                                         </span>
//                                     </div>
//                                     <h2 className="text-2xl font-bold">{blog.title}</h2>
//                                 </div>
//                             </div>
//                         </Link>
//                     ))
//                 ) : (
//                     <p>No Data Found</p>
//                 )}
//             </section>
//         </div>
//     );
// };

// export default Page;



// // second steps



import Image from 'next/image';
import React from 'react';
import axios from 'axios';
import { FaCircle } from 'react-icons/fa6';
import Link from 'next/link';

const getData = async () => {
    try {
     
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/blog-post/view-all-blogs/api`);
      return res.data.result
    } catch (error) {
        console.error('Error fetching blog data:', error);
    }
};

const Page = async() => {

let blogs=await getData()

// console.log(blogs.length);


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

export default Page;


// import Image from 'next/image';
// import React, { Suspense } from 'react';
// import axios from 'axios';
// import { FaCircle } from 'react-icons/fa6';
// import Link from 'next/link';

// // Fetching data with error handling
// const getData = async () => {
//     try {
//         const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/blog-post/view-all-blogs/api`);
//         return res.data.result;
//     } catch (error) {
//         console.error('Error fetching blog data:', error);
//         throw new Error('Failed to load blog data'); // Throw error to be caught in the component
//     }
// };

// const BlogList = async () => {
//     try {
//         let blogs = await getData(); // Fetch blogs

//         if (!blogs || blogs.length === 0) {
//             return <p>No Data Found</p>;
//         }

//         return (
//             <section className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//                 {blogs.map((blog) => (
//                     <Link key={blog._id} href={`/blog-post/view-details/${blog._id}`}>
//                         <div className="relative border h-[400px] p-4 rounded mb-4 flex flex-col gap-6 justify-between">
//                             {/* Blog Image */}
//                             <div className="relative h-[60%] overflow-hidden group rounded-md w-full">
//                                 {blog.image && (
//                                     <Image
//                                         width={200}
//                                         height={0}
//                                         src={blog.image}
//                                         alt={blog.title}
//                                         className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform"
//                                     />
//                                 )}

//                                 {/* Grid Overlay */}
//                                 <div className="absolute w-full inset-0 grid grid-rows-3 grid-cols-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
//                                     <div className="bg-violet-500 w-full opacity-30 transform scale-y-0 group-hover:scale-y-100 transition-all duration-500 ease-out"></div>
//                                     <div className="bg-violet-500 w-full opacity-30 transform scale-y-0 group-hover:scale-y-100 transition-all duration-700 ease-out"></div>
//                                     <div className="bg-violet-500 w-full opacity-30 transform scale-y-0 group-hover:scale-y-100 transition-all duration-900 ease-out"></div>
//                                 </div>
//                             </div>

//                             {/* Blog Content */}
//                             <div className="w-full">
//                                 <div className="flex justify-between">
//                                     <span className="flex gap-2 items-center"> 
//                                         <FaCircle /> APRIL 10, 2024
//                                     </span>
//                                     <span className="flex gap-2 items-center"> 
//                                         <FaCircle /> ADMIN
//                                     </span>
//                                 </div>
//                                 <h2 className="text-2xl font-bold">{blog.title}</h2>
//                             </div>
//                         </div>
//                     </Link>
//                 ))}
//             </section>
//         );
//     } catch (error) {
//         return <p className="text-red-500">Error loading data: {error.message}</p>; // Handle error state
//     }
// };

// const Page = () => {
//     return (
//         <div>
//             <Suspense fallback={<p>Loading...</p>}> {/* Fallback for loading */}
//                 <BlogList /> {/* Async component */}
//             </Suspense>
//         </div>
//     );
// };

// export default Page;
