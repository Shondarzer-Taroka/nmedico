import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import React from 'react';

export let getData=async(email)=>{
    let result=await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/cart/api/${email}`)
    return result.data
}

const Page = async() => {
    let session=await getServerSession(authOptions)
    let email=session?.user?.email
    // let myCart
    return (
        <div>
            
        </div>
    );
};

export default Page;