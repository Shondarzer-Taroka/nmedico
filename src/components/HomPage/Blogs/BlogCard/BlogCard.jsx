import Image from 'next/image';
import React from 'react';
import { WiMoonFull } from "react-icons/wi";


const BlogCard = () => {
    return (
        <article>
            <div>
                <div id='image' className='border relative'>
                    <Image width={330} height={400} alt='blog' src={'https://html.tf.dreamitsolution.net/mediic1/assets/images/resource/blog2.jpg'}/>
                
                     <div className='w-full h-full absolute top-0 left-0 bg-[#ffffff6b]'>

                     </div>
                </div>
                <div id='content'>
                   <div className='flex items-center gap-5'>
                    <p className='flex items-center'> <WiMoonFull/> <span>APRIL 10, 2024</span> </p>
                    <p className='flex items-center'> <WiMoonFull/> <span>ADMIN</span></p>
                   </div>
                </div>
            </div>
        </article>
    );
};

export default BlogCard;