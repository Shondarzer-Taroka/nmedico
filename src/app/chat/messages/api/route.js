// /app/chat/messages/route.js

// /app/chat/messages/route.js

import { connectDB } from '@/lib/connectDB';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const db = await connectDB(); // Await the DB connection
            const messagesCollection = db.collection('messages');
            const messages = await messagesCollection.find({}).toArray();

            res.status(200).json(messages); // Send the fetched messages as a response
        } catch (err) {
            console.error('Error fetching messages:', err);
            res.status(500).json({ error: 'Failed to fetch messages' }); // Handle errors gracefully
        }
    } else {
        // Handle unsupported methods
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
