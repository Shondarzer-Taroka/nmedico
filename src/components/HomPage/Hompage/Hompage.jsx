
import React from 'react';
import BannerSlider from '../Banner/Banner';
import CategoryCardSection from '../CategoryCardSection/CategoryCardSection';
import GetCartData from '@/components/Cart/CartBox/GetCartData';



const Hompage = () => {
    return (
        <div>
           <BannerSlider/>
           <CategoryCardSection/>
           {/* <GetCartData/> */}
        </div>
    );
};

export default Hompage;