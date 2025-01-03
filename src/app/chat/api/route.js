// // /app/api/socket/route.js
// import { Server } from "socket.io";

// export const config = {
//     api: {
//         bodyParser: false, // Disable the default body parser for this API route
//     },
// };

// let io;

// export default function handler(req, res) {
//     if (res.socket.server.io) {
//         console.log("Socket.IO is already running");
//         res.end();
//         return;
//     }

//     // Initialize the Socket.IO server
//     io = new Server(res.socket.server, {
//         path: "/api/socket", // Ensure the correct path is used
//     });
//     res.socket.server.io = io;

//     io.on("connection", (socket) => {
//         console.log("User connected:", socket.id);

//         // Listen for new messages from the client
//         socket.on("sendMessage", (message) => {
//             console.log("Message received:", message);
//             io.emit("receiveMessage", message); // Broadcast the message to all connected clients
//         });

//         socket.on("disconnect", () => {
//             console.log("User disconnected:", socket.id);
//         });
//     });

//     console.log("Socket.IO server initialized");
//     res.end();
// }

// // /app/api/socket/route.js
import { Server } from 'socket.io';

import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { connectDB } from '@/lib/connectDB';

export const config = {
    api: {
        bodyParser: false,
    },
};

let io;

export default async function handler(req, res) {
    if (res.socket.server.io) {
        res.end();
        return;
    }

    io = new Server(res.socket.server, {
        path: "/api/socket",
    });
    res.socket.server.io = io;

    const db = connectDB();
    const messagesCollection = db.collection('messages');

    io.on('connection', (socket) => {
        socket.on('sendMessage', async (message) => {
            await messagesCollection.insertOne(message);
            io.emit('receiveMessage', message);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    res.end();
}
