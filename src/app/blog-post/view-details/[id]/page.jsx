'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const Page = ({ params }) => {
    let { data, isError, isLoading } = useQuery({
        queryKey: ['viewDetailsPost', params.id],
        queryFn: async () => {
            let result = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/blog-post/view-details/api/${params.id}`)
            return result.data.result
        }
    })

    console.log(data);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Something went to wrong</div>
    }
    return (
        <div>

            <div
                className="mt-4"
                dangerouslySetInnerHTML={{ __html: data.content }}
            />
        </div>
    );
};

export default Page;