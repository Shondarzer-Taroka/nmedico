


// /app/invoice/page.js (or wherever the Invoice component is located)
// "use client";
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const Invoice = () => {
//     const [session, setSession] = useState(null);
//     const [sessionId, setSessionId] = useState(null);

//     useEffect(() => {
//         // Parse the session_id from the URL
//         if (typeof window !== 'undefined') {
//             const params = new URLSearchParams(window.location.search);
//             const sessionIdFromURL = params.get('session_id');
//             setSessionId(sessionIdFromURL);
//         }
//     }, []);

//     useEffect(() => {
//         const fetchSession = async () => {
//             if (sessionId) {
//                 try {
//                     const { data } = await axios.get(
//                         `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/session?session_id=${sessionId}`
//                     );
//                     setSession(data);
//                 } catch (error) {
//                     console.error('Error fetching session:', error);
//                 }
//             }
//         };
//         fetchSession();
//     }, [sessionId]);

//     if (!session) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="w-full mx-auto p-4 bg-white shadow-md rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">Invoice</h2>
//             <p>Thank you for your purchase!</p>
//             <p>Session ID: {session.id}</p>
//             <p>Total Amount: ${session.amount_total / 100}</p>
//             <h3 className="text-xl font-semibold mt-4">Purchased Items</h3>
//             <ul>
//                 {session.line_items.data.map((item) => (
//                     <li key={item.id}>
//                         {item.description} - Quantity: {item.quantity}
//                     </li>
//                 ))}
//             </ul>
//             {/* Add more invoice details as needed */}
//         </div>
//     );
// };

// export default Invoice;


//// motamoti

// "use client";
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const Invoice = () => {
//     const [session, setSession] = useState(null);
//     const [sessionId, setSessionId] = useState(null);

//     useEffect(() => {
//         // Parse the session_id from the URL
//         if (typeof window !== 'undefined') {
//             const params = new URLSearchParams(window.location.search);
//             const sessionIdFromURL = params.get('session_id');
//             setSessionId(sessionIdFromURL);
//         }
//     }, []);

//     useEffect(() => {
//         const fetchSession = async () => {
//             if (sessionId) {
//                 try {
//                     const { data } = await axios.get(
//                         `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/session?session_id=${sessionId}`
//                     );
//                     setSession(data);
//                 } catch (error) {
//                     console.error('Error fetching session:', error);
//                 }
//             }
//         };
//         fetchSession();
//     }, [sessionId]);

//     if (!session) {
//         return <div>Loading...</div>;
//     }

//     const handlePrint = () => {
//         window.print();
//     };

//     return (
//         <div className="w-full mx-auto p-4 bg-white shadow-md rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">Invoice</h2>
//             <p>Thank you for your purchase!</p>
//             <div className="my-4">
//                 <h3 className="text-xl font-semibold">Invoice Details</h3>
//                 <table className="min-w-full bg-white border border-gray-200 rounded-lg mt-2">
//                     <thead className="bg-gray-100">
//                         <tr>
//                             <th className="py-2 px-4 border-b border-gray-200">Item</th>
//                             <th className="py-2 px-4 border-b border-gray-200">Quantity</th>
//                             <th className="py-2 px-4 border-b border-gray-200">Price</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {session.line_items.data.map((item) => (
//                             <tr key={item.id}>
//                                 <td className="py-2 px-4 border-b border-gray-200">{item.description}</td>
//                                 <td className="py-2 px-4 border-b border-gray-200 text-center">{item.quantity}</td>
//                                 <td className="py-2 px-4 border-b border-gray-200 text-right">${(item.price.unit_amount / 100).toFixed(2)}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <div className="text-right mt-4">
//                     <strong>Total Amount: ${session.amount_total / 100}</strong>
//                 </div>
//             </div>
//             <button
//                 onClick={handlePrint}
//                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//                 Print Invoice
//             </button>
//         </div>
//     );
// };

// export default Invoice;

// // all correct

// "use client";
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../../components/style/style.css'
// // import { sendInvoiceEmail } from '@/lib/sendEmail';
// const Invoice = () => {
//     const [session, setSession] = useState(null);
//     const [sessionId, setSessionId] = useState(null);
    
//     useEffect(() => {
//         // Parse the session_id from the URL
//         if (typeof window !== 'undefined') {
//             const params = new URLSearchParams(window.location.search);
//             const sessionIdFromURL = params.get('session_id');
//             setSessionId(sessionIdFromURL);
//         }
//     }, []);

//     useEffect(() => {
//         const fetchSession = async () => {
//             if (sessionId) {
//                 try {
//                     const { data } = await axios.get(
//                         `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/session?session_id=${sessionId}`
//                     );
//                     setSession(data);
//                 } catch (error) {
//                     console.error('Error fetching session:', error);
//                 }
//             }
//         };
//         fetchSession();
//     }, [sessionId]);

//     const handlePrint = () => {
//         window.print();
//     };

//     function emailsending(session) {
//         console.log(session);
//         // sendInvoiceEmail(session)
//     }

//     if (!session) {
//         return <div>Loading...</div>;
//     }

//     // console.log(session.customer_details);
    
//     return (
//         <div className="w-full mx-auto p-4 bg-white shadow-md rounded-lg" id="invoice">
//             <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
//                 <div>
//                     <h2 className="text-2xl font-bold">Invoice</h2>
//                     <p>Thank you for your purchase!</p>
//                 </div>
//                 <div>
//                     <img src="/path-to-logo.png" alt="Logo" className="h-16" />
//                 </div>
//             </div>
//             <div className="p-4">
//                 <p className="text-gray-700">Name: {session.customer_details.name}</p>
//                 <p className="text-gray-700">Email: {session.customer_details.email}</p>
//                 <p className="text-gray-700">Session ID: {session.id}</p>
//                 <p className="text-gray-700">Total Amount: ${session.amount_total / 100}</p>
//                 <h3 className="text-xl font-semibold mt-4">Purchased Items</h3>
//                 <table className="w-full mt-2 border border-gray-200">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="py-2 border">Item Name</th>
//                             <th className="py-2 border">Quantity</th>
//                             <th className="py-2 border">Price</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {session.line_items.data.map((item) => (
//                             <tr key={item.id} className="text-center">
//                                 <td className="py-2 border">{item.description}</td>
//                                 <td className="py-2 border">{item.quantity}</td>
//                                 <td className="py-2 border">${(item.amount_total / 100).toFixed(2)}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <div className="mt-4 text-center">
//                     <button
//                         onClick={handlePrint}
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                     >
//                         Print Invoice
//                     </button>
                    
//                 </div>
//             </div>
//           { session && <button onClick={()=> emailsending(session) }>send</button>}
//         </div>
//     );
// };

// export default Invoice;


"use client";
import { useEffect, useState } from 'react';
import axios, { Axios } from 'axios';
import '../../components/style/style.css';
import toast, { Toaster } from 'react-hot-toast';

const Invoice = () => {
    const [session, setSession] = useState(null);
    const [sessionId, setSessionId] = useState(null);
    console.log(session);
    
    useEffect(() => {
        // Parse the session_id from the URL
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const sessionIdFromURL = params.get('session_id');
            setSessionId(sessionIdFromURL);
        }
    }, []);

    useEffect(() => {
        const fetchSession = async () => {
            if (sessionId) {
                try {
                    const { data } = await axios.get(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/session?session_id=${sessionId}`
                    );
                    setSession(data);
                    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/payment/api`,{
                        name:data.customer_details.name,
                        email:data.customer_details.email,
                        totalAmount:data.amount_total,
                        transactionId:data.payment_intent,
                        PurchasedProducts:data.line_items.data,
                        product_owner:data.metadata.product_owner
                    })
                    .then(res=>{
                        console.log(res.data);
                        
                        
                    })
                    .catch(err=>{
                        console.log(err);
                        
                    })
                } catch (error) {
                    console.error('Error fetching session:', error);
                }
            }
        };
        fetchSession();
    }, [sessionId]);


    

    const handlePrint = () => {
        window.print();
    };

    const sendInvoiceEmail = async (session) => {
        if (session) {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/mail/api`, { session });
                console.log('Email sent successfully:', response.data);
                toast.success('Invoice email sent successfully!');
            } catch (error) {
                console.error('Error sending invoice email:', error);
                toast.error('Failed to send invoice email.');
            }
        }
    };
    

    if (!session) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full mx-auto p-4 bg-white shadow-md rounded-lg" id="invoice">
            <Toaster/>
            <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Invoice</h2>
                    <p>Thank you for your purchase!</p>
                </div>
                <div>
                    <img src="/path-to-logo.png" alt="Logo" className="h-16" />
                </div>
            </div>
            <div className="p-4">
                <p className="text-gray-700">Name: {session.customer_details.name}</p>
                <p className="text-gray-700">Email: {session.customer_details.email}</p>
                <p className="text-gray-700">Session ID: {session.id}</p>
                <p className="text-gray-700">Total Amount: ${session.amount_total / 100}</p>
                <h3 className="text-xl font-semibold mt-4">Purchased Items</h3>
                <table className="w-full mt-2 border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 border">Item Name</th>
                            <th className="py-2 border">Quantity</th>
                            <th className="py-2 border">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {session.line_items.data.map((item) => (
                            <tr key={item.id} className="text-center">
                                <td className="py-2 border">{item.description}</td>
                                <td className="py-2 border">{item.quantity}</td>
                                <td className="py-2 border">${(item.amount_total / 100).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 text-center">
                    <button
                        onClick={handlePrint}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Print Invoice
                    </button>
                    <button
                        onClick={()=>sendInvoiceEmail(session)}
                        className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Send Invoice Email
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
