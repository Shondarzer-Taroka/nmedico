
import React from 'react';
import BannerSlider from '../Banner/Banner';
import CategoryCardSection from '../CategoryCardSection/CategoryCardSection';

import Icons from '../Icons/Icons';
import Review from '../Review/Review';
import Brand from '../Brand/Brand';
import BlogCard from '../Blogs/BlogCard/BlogCard';
import BlogPost from '@/components/BlogDashboard/BlogPost';
import { BlogModal } from '@/components/BlogDashboard/BlogModal';



const Hompage = () => {
    return (
        <div>
           <BannerSlider/>
           <CategoryCardSection/>
           {/* <GetCartData/> */}
           <Review/>
           <Brand/>
           <BlogCard/>
           <Icons/>
   
        </div>
    );
};

export default Hompage;