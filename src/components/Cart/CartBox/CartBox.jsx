



'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import toast, { Toaster } from 'react-hot-toast';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CartBox = ({ cartData, onClose }) => {
    const session = useSession();
    const increase = useRef();

    const { data: carts = [], isError, isLoading } = useQuery({
        queryKey: ['carts', session?.data?.user?.email],
        queryFn: async () => {
            const result = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/cart/api/${session?.data?.user?.email}`);
            return result.data;
        }
    });

    const increaseQuantity =async(e, product) => {
        let id=product._id
        let selectedId={selectedId:id}
        console.log(selectedId);
        console.log(e.target.previousElementSibling.innerText);
        e.target.previousElementSibling.innerText=Number(e.target.previousElementSibling.innerText)+1
        console.log(e.target.parentElement.parentElement.childNodes[2].lastElementChild);
        e.target.parentElement.parentElement.childNodes[2].lastElementChild.innerText=Number(product.perUnitPrice)*Number(e.target.previousElementSibling.innerText)
        
        let result =await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/cart/increase/api`,selectedId)
        console.log(result);
        
    };
    // let a=document.querySelector('.kj').nextElementSibling
    const decreaseQuantity =async (e,product) => {
        let id=product._id
        let selectedId={selectedId:id}
        console.log(selectedId);
        // console.log(e.target.previousElementSibling.innerText);
        e.target.nextElementSibling.innerText=Number(e.target.nextElementSibling.innerText)-1
        // console.log(e.target.parentElement.parentElement.childNodes[2].lastElementChild);
        e.target.parentElement.parentElement.childNodes[2].lastElementChild.innerText=Number(product.perUnitPrice)*Number(e.target.nextElementSibling.innerText)
        // console.log(e.target.nextElementSibling);
        
        let result =await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/cart/delete/api/${product._id}`)
        console.log(result);
    };

    const removeItem = async(product) => {
        let result =await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/cart/remove/api/${product._id}`)
        console.log(result);
    };

    const clearCart =async (product) => {
        // let result =await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/cart/remove/api/${product._id}`)
        // console.log(result);
    };

    // const handleCheckout = async () => {
    //     try {
    //         const stripe = await stripePromise;
    
    //         // Calculate the grand total price
    //         const grandTotal = carts.reduce((total, item) => {
    //             return total + (parseFloat(item.totalUnitPrice) / parseFloat(item.count)) * item.count;
    //         }, 0);
    
    //         // Send a request to your backend to create a Stripe Checkout session
    //         const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/api`, {
    //             items: carts.map(item => ({
    //                 name: item.itemName,
    //                 amount: Math.round(parseFloat(item.totalUnitPrice) / parseFloat(item.count) * 100), // Amount in cents
    //                 quantity: item.count,
    //                 sellerEmail:item.sellerEmail
    //             })),
               
    //             success_url: `${window.location.origin}/invoice?session_id={CHECKOUT_SESSION_ID}`,
    //             cancel_url: `${window.location.origin}/cart`,
    //         });
    
    //         const { id } = data;
    //         const { error } = await stripe.redirectToCheckout({ sessionId: id });
    //         if (error) {
    //             console.error('Stripe error:', error);
    //         }
    //     } catch (error) {
    //         console.error('Checkout error:', error);
    //     }
    // };
    

    const handleCheckout = async () => {
        try {
            const stripe = await stripePromise;
    
            // Ensure all items have valid names
            const items = carts.map(item => ({
                name: item.itemName || 'Unnamed Item', // Fallback name
                amount: Math.round(parseFloat(item.totalUnitPrice) / parseFloat(item.count) * 100),
                quantity: item.count,
                sellerEmail: item.sellerEmail
            })).filter(item => item.name); // Filter out items with empty names
    
            // Ensure at least one valid item
            if (!items.length) {
                return toast.error('Cart items are invalid or empty');
            }
    
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/api`, {
                items,
                success_url: `${window.location.origin}/invoice?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${window.location.origin}/cart`,
            });
    
            const { id } = data;
            const { error } = await stripe.redirectToCheckout({ sessionId: id });
            if (error) {
                console.error('Stripe error:', error);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            toast.error('Checkout failed, please try again.');
        }
    };
    
    console.log(carts);
    

    return (
        <div className="w-full mx-auto p-4 bg-white shadow-md rounded-lg relative">
            <Toaster/>
            <button
                onClick={onClose}
                className="absolute top-0 right-0 mt-4 text-sm text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
            >
                Close
            </button>
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {carts && carts.length > 0 ? (
                <>
                    <ul className="divide-y divide-gray-200 mb-4">
                        {carts.map((item) => (
                            <li key={item._id} className="py-4 flex justify-between items-center">
                                <div className="parent">
                                    <h3 className="text-lg font-semibold">{item.itemName}</h3>
                                    <p className="text-sm text-gray-500">{item.category}</p>
                                    <p className="text-sm">
                                        <span>Price: $ </span>
                                        <span id="totalPrice">{item?.totalUnitPrice}</span>
                                    </p>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <button
                                            className="px-2 py-1 bg-gray-200 rounded"
                                            onClick={() => decreaseQuantity(event,item)}
                                        >
                                            -
                                        </button>
                                        <span id="inc" ref={increase}>{item ?item.count:0}</span>
                                        <button
                                            className="px-2 py-1 bg-gray-200 rounded"
                                            onClick={() => increaseQuantity(event, item)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => removeItem(item)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between items-center">
                        <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={clearCart}
                        >
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={handleCheckout}
                        >
                            Checkout
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-center text-gray-500">Your cart is empty.</p>
            )}
        </div>
    );
};

export default CartBox;











// const handleCheckout = async () => {
//     try {
//         const stripe = await stripePromise;

//         // Calculate the grand total price
//         const grandTotal = carts.reduce((total, item) => {
//             return total + (parseFloat(item.totalUnitPrice) / parseFloat(item.count)) * item.count;
//         }, 0);

//         // Send a request to your backend to create a Stripe Checkout session
//         const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/api`, {
//             items: carts.map(item => ({
//                 name: item.itemName,
//                 amount: Math.round(parseFloat(item.totalUnitPrice) / parseFloat(item.count) * 100), // Amount in cents
//                 quantity: item.count,
//             })),
//             success_url: `${window.location.origin}/invoice?session_id={CHECKOUT_SESSION_ID}`,
//             cancel_url: `${window.location.origin}/cart`,
//         });

//         const { id } = data;

//         // Redirect to Stripe Checkout
//         const { error } = await stripe.redirectToCheckout({ sessionId: id });
//         if (error) {
//             console.error('Stripe error:', error);
//         }

//         // Post payment details to your server after a successful checkout
//         const handlePaymentSuccess = async () => {
//             const paymentSession = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/stripe/session/${id}`);
//             const paymentDetails = paymentSession.data;

//             const userData = {
//                 email: session?.data?.user?.email,
//                 name: session?.data?.user?.name,
//                 items: carts,
//                 totalAmount: grandTotal,
//                 paymentDetails
//             };

//             // Send the user and payment data to your backend
//             await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/payments/save`, userData);
//         };

//         handlePaymentSuccess();
//     } catch (error) {
//         console.error('Checkout error:', error);
//     }
// };



