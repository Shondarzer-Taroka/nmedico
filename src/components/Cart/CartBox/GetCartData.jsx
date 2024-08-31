import React from 'react';
import { authPtions } from '@/app/api/auth/[...nextauth]/route';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import CartBox from './CartBox';

export let getData = async (email) => {
    let result = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/cart/api/${email}`)
    return result.data
}

const GetCartData = async () => {
    let session = await getServerSession(authPtions)
    let email = session?.user?.email
    let myCart = await getData(email)
    console.log('dd', myCart);
    return (
        <div>
          { myCart&& myCart.length>0 && <CartBox cartData={myCart}/>}
        </div>
    );
};

export default GetCartData;