


// /app/invoice/page.js (or wherever the Invoice component is located)
"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Invoice = () => {
    const [session, setSession] = useState(null);
    const [sessionId, setSessionId] = useState(null);

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
            <h3 className="text-xl font-semibold mt-4">Purchased Items</h3>
            <ul>
                {session.line_items.data.map((item) => (
                    <li key={item.id}>
                        {item.description} - Quantity: {item.quantity}
                    </li>
                ))}
            </ul>
            {/* Add more invoice details as needed */}
        </div>
    );
};

export default Invoice;
