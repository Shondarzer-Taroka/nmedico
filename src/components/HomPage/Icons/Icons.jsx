import Image from 'next/image';
import React from 'react';

const Icons = () => {
    return (
        <section className='mt-9'>

            <aside className='flex flex-wrap justify-between'>
                <div>
                    <Image className='text-red-500' width={120} height={80} src={'/assets/return-box.png'} alt='return box' />
                    <h1 className='font-semibold'>Easy Return</h1>
                    <p>Simple returns policy</p>
                </div>
                <div>
                    <Image className='text-red-500' width={120} height={80} src={'/assets/secure-payment.png'} alt='return box' />
                    <h1 className='font-semibold'>Secure Payments</h1>
                    <p>100% payment protection</p>
                </div>
                <div>
                    <Image className='text-red-500' width={120} height={80} src={'/assets/customer-service.png'} alt='return box' />
                    <h1 className='font-semibold'>Support 24/7</h1>
                    <p>Contact us 24 hours a day</p>
                </div>
                <div>
                    <Image className='text-red-500' width={120} height={80} src={'/assets/free-shipping.png'} alt='return box' />
                    <h1 className='font-semibold'>Free Shipping</h1>
                    <p>Free shipping world wide</p>
                </div>
            </aside>
        </section>
    );
};

export default Icons;