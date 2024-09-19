import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const BlogTitle = ({length}) => {
    return (
        <div>
             <div className='flex justify-between w-full my-3'>
                    <h3 className="text-xl font-bold mb-2">Blog Posts</h3>
                   
                    {blogs.length>5 &&<Button variant="contained"><Link href={'/blog-post/view-all-blogs'}>View All</Link></Button>}
                </div>
        </div>
    );
};

export default BlogTitle;