


// 'use client'
// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './BlogCard.css'; // Import external CSS if needed

// const BlogCard = () => {
//     const [blogs, setBlogs] = useState([]);

//     // Function to fetch blog data
//     const getData = async () => {
//         try {
//             const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/blog-post/api`);
//             setBlogs(res.data.result);
//         } catch (error) {
//             console.error('Error fetching blog data:', error);
//         }
//     };

//     useEffect(() => {
//         getData(); // Fetch data on component mount
//     }, []);

//     return (
//         <article>
//             <div className="mt-6">
//                 <h3 className="text-xl font-bold mb-2">Blog Posts</h3>

//                 <section className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//                     {/* Blog Cards */}
//                     {blogs.length > 0 ? (
//                         blogs.map((blog) => (
//                             <div key={blog._id} className="relative border h-[500px] p-4 rounded mb-4 flex flex-col gap-6 justify-between">
//                                 {/* Blog Image */}
//                                 <div className="relative h-[50%] overflow-hidden group rounded-md">
//                                     {blog.image && (
//                                         <Image
//                                             width={200}
//                                             height={0}
//                                             src={blog.image}
//                                             alt={blog.title}
//                                             className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110" 
//                                         />
//                                     )}

//                                     {/* Grid Overlay */}
//                                     <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
//                                         <div className="bg-cyan-500 opacity-80 transform scale-0 group-hover:scale-100 transition-all duration-500"></div>
//                                         <div className="bg-cyan-500 opacity-80 transform scale-0 group-hover:scale-100 transition-all duration-700"></div>
//                                         <div className="bg-cyan-500 opacity-80 transform scale-0 group-hover:scale-100 transition-all duration-900"></div>
//                                         <div className="bg-cyan-500 opacity-80 transform scale-0 group-hover:scale-100 transition-all duration-1100"></div>
//                                         <div className="bg-cyan-500 opacity-80 transform scale-0 group-hover:scale-100 transition-all duration-1300"></div>
//                                         <div className="bg-cyan-500 opacity-80 transform scale-0 group-hover:scale-100 transition-all duration-1500"></div>
//                                         <div className="bg-cyan-500 opacity-80 transform scale-0 group-hover:scale-100 transition-all duration-1700"></div>
//                                         <div className="bg-cyan-500 opacity-80 transform scale-0 group-hover:scale-100 transition-all duration-1900"></div>
//                                         <div className="bg-cyan-500 opacity-80 transform scale-0 group-hover:scale-100 transition-all duration-2100"></div>
//                                     </div>
//                                 </div>

//                                 {/* Blog Content */}
//                                 <div className="w-full h-[50%]">
//                                     <h2 className="text-2xl font-bold">{blog.title}</h2>
//                                     <p className="text-gray-700 mt-2">{blog.description}</p>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p>Loading blogs...</p>
//                     )}
//                 </section>
//             </div>
//         </article>
//     );
// };

// export default BlogCard;




















// 'use client'
// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './BlogCard.css'; // Import external CSS if needed

// const BlogCard = () => {
//     const [blogs, setBlogs] = useState([]);

//     // Function to fetch blog data
//     const getData = async () => {
//         try {
//             const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/blog-post/api`);
//             setBlogs(res.data.result);
//         } catch (error) {
//             console.error('Error fetching blog data:', error);
//         }
//     };

//     useEffect(() => {
//         getData(); // Fetch data on component mount
//     }, []);

//     return (
//         <article>
//             <div className="mt-6">
//                 <h3 className="text-xl font-bold mb-2">Blog Posts</h3>

//                 <section className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//                     {/* Blog Cards */}
//                     {blogs.length > 0 ? (
//                         blogs.map((blog) => (
//                             <div key={blog._id} className="relative border h-[500px] p-4 rounded mb-4 flex flex-col gap-6 justify-between">
//                                 {/* Blog Image */}
//                                 <div className="relative h-[50%] overflow-hidden group rounded-md">
//                                     {blog.image && (
//                                         <Image
//                                             width={200}
//                                             height={0}
//                                             src={blog.image}
//                                             alt={blog.title}
//                                             className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110" 
//                                         />
//                                     )}

//                                     {/* Grid Overlay */}
//                                     <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-0  group-hover:opacity-100 transition-opacity duration-1500 ease-in-out">
//                                         {/* Each cell of the grid */}
//                                         <div className="bg-cyan-500 opacity-80 transform scale-0 group-hover:scale-100 transition-all duration-500 ease-out"></div>
//                                         <div className="bg-cyan-500 opacity-80 transform scale-0 group-hover:scale-100 transition-all duration-700 ease-out"></div>
//                                         <div className="bg-cyan-500 opacity-80 transform scale-0 group-hover:scale-100 transition-all duration-900 ease-out"></div>
//                                         <div className="bg-cyan-500 opacity-80 transform scale-0 group-hover:scale-100 transition-all duration-1100 ease-out"></div>
//                                         <div className="bg-cyan-500 opacity-80 transform scale-0 group-hover:scale-100 transition-all duration-1300 ease-out"></div>
//                                         <div className="bg-cyan-500 opacity-80 transform scale-0 group-hover:scale-100 transition-all duration-1500 ease-out"></div>
//                                         <div className="bg-cyan-500 opacity-80 transform scale-0 group-hover:scale-100 transition-all duration-1700 ease-out"></div>
//                                         <div className="bg-cyan-500 opacity-80 transform scale-0 group-hover:scale-100 transition-all duration-1900 ease-out"></div>
//                                         <div className="bg-cyan-500 opacity-80 transform scale-0 group-hover:scale-100 transition-all duration-2100 ease-out"></div>
//                                     </div>
//                                 </div>

//                                 {/* Blog Content */}
//                                 <div className="w-full h-[50%]">
//                                     <h2 className="text-2xl font-bold">{blog.title}</h2>
//                                     <p className="text-gray-700 mt-2">{blog.description}</p>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p>Loading blogs...</p>
//                     )}
//                 </section>
//             </div>
//         </article>
//     );
// };

// export default BlogCard;


import axios from 'axios';
import BlogTitle from '../../BlogTitle/BlogTitle';
import CombinedBlogs from '../CombinedBlogs/CombinedBlogs';

export const revalidate = 0; // Disable revalidation for fresh data on every request

// Data fetching function
const getData = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/blog-post/api`);
    return res.data.result;
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return null; // Return null if there's an error
  }
};

const BlogCard = async () => {
  const blogs = await getData();

  // Show loading state or error if blogs are not available
  if (!blogs) {
    return <h1>Failed to load blogs.</h1>;
  }

  return (
    <article>
      <div className="mt-6">
        {/* Display blog title with the count of blogs */}
      { blogs && <BlogTitle length={blogs.length} />}
        {/* Display combined blogs */}
        <CombinedBlogs blogs={blogs} />
      </div>
    </article>
  );
};

export default BlogCard;
