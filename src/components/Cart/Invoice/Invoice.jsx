// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';

// const Invoice = () => {
//     const router = useRouter();
//     const { session_id } = router.query;
//     const [session, setSession] = useState(null);

//     useEffect(() => {
//         const fetchSession = async () => {
//             if (session_id) {
//                 const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/session?session_id=${session_id}`);
//                 setSession(data);
//             }
//         };
//         fetchSession();
//     }, [session_id]);

//     if (!session) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="w-full mx-auto p-4 bg-white shadow-md rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">Invoice</h2>
//             <p>Thank you for your purchase!</p>
//             <p>Session ID: {session.id}</p>
//             <p>Total Amount: ${session.amount_total / 100}</p>
//             {/* Display more invoice details as needed */}
//         </div>
//     );
// };

// export default Invoice;









import { useEffect, useState } from 'react';
import axios from 'axios';

const Invoice = () => {
    const [session, setSession] = useState(null);
    const [sessionId, setSessionId] = useState(null);

    useEffect(() => {
        // Only run this code on the client side
        if (typeof window !== 'undefined') {
            // Parse the session_id from the URL
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
                } catch (error) {
                    console.error('Error fetching session:', error);
                }
            }
        };
        fetchSession();
    }, [sessionId]);

    if (!session) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Invoice</h2>
            <p>Thank you for your purchase!</p>
            <p>Session ID: {session.id}</p>
            <p>Total Amount: ${session.amount_total / 100}</p>
            {/* Display more invoice details as needed */}
        </div>
    );
};

export default Invoice;

