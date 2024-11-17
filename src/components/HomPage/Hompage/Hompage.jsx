
import React from 'react';
import BannerSlider from '../Banner/Banner';
import CategoryCardSection from '../CategoryCardSection/CategoryCardSection';

import Icons from '../Icons/Icons';
import Review from '../Review/Review';
import Brand from '../Brand/Brand';
import BlogCard from '../Blogs/BlogCard/BlogCard';
import BlogPost from '@/components/BlogDashboard/BlogPost';
import { BlogModal } from '@/components/BlogDashboard/BlogModal';
import ChatIcon from '@/components/Chat/ChatIcon/ChatIcon';



const Hompage = () => {
    return (
        <div>
            <BannerSlider />
            <CategoryCardSection />
            {/* <GetCartData/> */}
            <Review />
            <Brand />
            <BlogCard />
            <Icons />

            <div className='h-full w-full sticky bottom-9 z-50'>
                <button>
                    <ChatIcon />
                </button>
                
            </div>
        </div>
    );
};

export default Hompage;