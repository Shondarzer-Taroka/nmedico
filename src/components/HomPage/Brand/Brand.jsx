

import Image from 'next/image';
import React from 'react';

const Brand = () => {
    return (
        <section className="">
            <h3 className='font-semibold opacity-70 text-[37px] my-14'>Shop by brands</h3>
            <aside className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center items-center">
                <div className="transition-transform transform hover:filter hover:hue-rotate-90 duration-300">
                    <Image 
                        src={'/assets/brands/brand-logo-9_large.png'} 
                        alt='brand1' 
                        width={100} 
                        height={40} 
                    />
                </div>
                <div className="transition-transform transform hover:filter hover:hue-rotate-90 duration-300">
                    <Image 
                        src={'/assets/brands/brand-logo-3_large.png'} 
                        alt='brand2' 
                        width={100} 
                        height={40} 
                    />
                </div>
                <div className="transition-transform transform hover:filter hover:hue-rotate-90 duration-300">
                    <Image 
                        src={'https://devita-medical.myshopify.com/cdn/shop/files/brand-logo-2_large.png?v=1660471303'} 
                        alt='brand3' 
                        width={100} 
                        height={40} 
                    />
                </div>
                <div className="transition-transform transform hover:filter hover:hue-rotate-90 duration-300">
                    <Image 
                        src={'https://devita-medical.myshopify.com/cdn/shop/files/brand-logo-8_large.png?v=1660471305'} 
                        alt='brand4' 
                        width={100} 
                        height={40} 
                    />
                </div>
                <div className="transition-transform transform hover:filter hover:hue-rotate-90 duration-300">
                    <Image 
                        src={'https://devita-medical.myshopify.com/cdn/shop/files/brand-logo-4_large.png?v=1660471304'} 
                        alt='brand5' 
                        width={100} 
                        height={40} 
                    />
                </div>
                <div className="transition-transform transform hover:filter hover:hue-rotate-90 duration-300">
                    <Image 
                        src={'https://devita-medical.myshopify.com/cdn/shop/files/brand-logo-5_large.png?v=1660471304 '} 
                        alt='brand5' 
                        width={100} 
                        height={40} 
                    />
                </div>
                <div className="transition-transform transform hover:filter hover:hue-rotate-90 duration-300">
                    <Image 
                        src={'https://devita-medical.myshopify.com/cdn/shop/files/brand-logo-7_large.png?v=1660471304'} 
                        alt='brand6' 
                        width={100} 
                        height={40} 
                    />
                </div>
                <div className="transition-transform transform hover:filter hover:hue-rotate-90 duration-300">
                    <Image 
                        src={'https://devita-medical.myshopify.com/cdn/shop/files/brand-logo-6_large.png?v=1660471304'} 
                        alt='brand7' 
                        width={100} 
                        height={40} 
                    />
                </div>
                <div className="transition-transform transform hover:filter hover:hue-rotate-90 duration-300">
                    <Image 
                        src={'https://devita-medical.myshopify.com/cdn/shop/files/brand-logo-10_large.png?v=1660471304'} 
                        alt='brand8' 
                        width={100} 
                        height={40} 
                    />
                </div>
                <div className="transition-transform transform hover:filter hover:hue-rotate-90 duration-300">
                    <Image 
                        src={'https://devita-medical.myshopify.com/cdn/shop/files/brand-logo-1_large.png?v=1660471303'} 
                        alt='brand9' 
                        width={100} 
                        height={40} 
                    />
                </div>
                <div className="transition-transform transform hover:filter hover:hue-rotate-90 duration-300">
                    <Image 
                        src={'https://devita-medical.myshopify.com/cdn/shop/files/brand-logo-12_large.png?v=1660471304'} 
                        alt='brand10' 
                        width={100} 
                        height={40} 
                    />
                </div>
                <div className="transition-transform transform hover:filter hover:hue-rotate-90 duration-300">
                    <Image 
                        src={'https://devita-medical.myshopify.com/cdn/shop/files/brand-logo-11_large.png?v=1660471304'} 
                        alt='brand11' 
                        width={100} 
                        height={40} 
                    />
                </div>
            </aside>
        </section>
    );
};

export default Brand;
