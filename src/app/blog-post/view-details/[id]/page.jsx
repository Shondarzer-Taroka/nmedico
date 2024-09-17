

'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import React from 'react';
import Link from 'next/link'; // for breadcrumb navigation

const Page = ({ params }) => {
    let pathName = usePathname();
    console.log(pathName);

    let { data, isError, isLoading } = useQuery({
        queryKey: ['viewDetailsPost', params.id],
        queryFn: async () => {
            let result = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/blog-post/view-details/api/${params.id}`);
            return result.data.result;
        }
    });

    console.log(data);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong</div>;
    }

    return (
        <div>
            {/* Background section with breadcrumbs */}
            <div
                className="relative min-h-screen bg-cover bg-center flex flex-col justify-center items-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${data.image}')`, // Dark overlay with linear-gradient
                    backgroundSize: 'cover', // Ensures the background image covers the entire section
                    backgroundPosition: 'center', // Centers the background image
                }}
            >
                {/* Breadcrumbs */}
                <nav className="absolute top-10 left-10 text-white" aria-label="breadcrumb">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center">
                            <Link href="/" className="text-white hover:underline">Home</Link>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="flex items-center">
                            <Link href="/blog-post/view-all-blogs" className="text-white hover:underline">Blog</Link>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="text-gray-400">{data.title}</li> {/* Current page breadcrumb */}
                    </ol>
                </nav>

                {/* Title displayed over the image */}
                {/* <h1 className="text-white text-4xl font-bold mt-6">{data.title}</h1> */}
            </div>

            {/* Blog content */}
            <div className="mt-4 px-4 lg:px-10">
                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
            </div>
        </div>
    );
};

export default Page;
