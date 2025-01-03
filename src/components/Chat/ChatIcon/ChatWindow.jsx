'use client'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { IoClose, IoSend, IoAttach, IoHappyOutline } from 'react-icons/io5';

const ChatWindow = ({ onClose }) => {
    const session=useSession()
    const [messages, setMessages] = useState([
        { text: 'Hi David, have you got the project report pdf?', sender: 'other' },
        { text: 'NO. I did not get it', sender: 'self' },
        { text: 'Ok, I will just send it here. Plz be sure to fill the details by today end of the day.', sender: 'other' },
        { text: 'project_report.pdf', sender: 'other', type: 'file' },
        { text: 'Ok. Should I send it over email as well after filling the details.', sender: 'self' },
        { text: "Ya. I'll be adding more team members to it.", sender: 'other' },
        { text: 'OK', sender: 'self' },
    ]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            setMessages([...messages, { text: inputMessage, sender: 'self' }]);
            setInputMessage('');
        }
    };

    return (
        <div className="fixed bottom-20 right-2 w-96 bg-white border rounded-lg shadow-lg p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <Image width={69} height={69} src="/assets/avatar4.jpg" alt="User" className="rounded-full w-8 h-8" />
                    <h3 className="ml-2 text-lg font-semibold">{session?.data?.user?.name}<span className="text-green-500">●</span></h3>
                </div>
                <button onClick={onClose} aria-label="Close">
                    <IoClose size={20} className="text-gray-500 hover:text-gray-700" />
                </button>
            </div>

            {/* Chat Messages */}
            <div className="flex flex-col space-y-4 max-h-80 overflow-y-auto">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.sender === 'self' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`px-4 py-2 rounded-lg ${
                                message.sender === 'self' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                            }`}
                        >
                            {message.type === 'file' ? (
                                <div className="flex items-center space-x-2">
                                    <img src="https://via.placeholder.com/40" alt="File" className="w-10 h-10 rounded-lg" />
                                    <span>{message.text}</span>
                                </div>
                            ) : (
                                <span>{message.text}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Box */}
            <div className="flex items-center mt-4">
                <IoAttach size={24} className="text-gray-600 cursor-pointer mx-2" />
                <IoHappyOutline size={24} className="text-gray-600 cursor-pointer mx-2" />
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Write Something..."
                    className="flex-grow p-2 border rounded-lg outline-none"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white rounded-full p-2 ml-2"
                >
                    <IoSend size={20} />
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;












// 'use client';
// import initializeSocket from '@/lib/socketClient';
// import React, { useState, useEffect, useRef } from 'react';
// import { IoClose, IoSend, IoAttach, IoHappyOutline } from 'react-icons/io5';

// const ChatWindow = ({ onClose }) => {
//     const socket = useRef(null);
//     const [messages, setMessages] = useState([]);
//     const [inputMessage, setInputMessage] = useState('');
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [isUploading, setIsUploading] = useState(false);
//     const fileInputRef = useRef(null);

//     // Initialize socket connection only once
//     useEffect(() => {
//         socket.current = initializeSocket();

//         socket.current.on('receiveMessage', (message) => {
//             setMessages((prevMessages) => [...prevMessages, message]);
//         });

//         // Clean up socket connection on component unmount
//         return () => {
//             socket.current.off('receiveMessage');
//         };
//     }, []);

//     // Fetch previous messages
//     useEffect(() => {
//         fetch(`http://localhost:3000/chat/messages/api`)
//             .then((res) => res.json())
//             .then(setMessages)
//             .catch((err) => console.error('Error fetching messages:', err));
//     }, []);

//     const handleSendMessage = async () => {
//         if (inputMessage.trim()) {
//             const newMessage = { text: inputMessage, sender: 'self', type: 'text' };
//             socket.current.emit('sendMessage', newMessage);
//             setInputMessage('');
//         }

//         if (selectedFile) {
//             const formData = new FormData();
//             formData.append('file', selectedFile);
//             setIsUploading(true);

//             try {
//                 const response = await fetch(`http://localhost:3000/upload/api`, {
//                     method: 'POST',
//                     body: formData,
//                 });

//                 const data = await response.json();
//                 const fileMessage = { text: data.url, sender: 'self', type: 'file' };
//                 socket.current.emit('sendMessage', fileMessage);
//             } catch (err) {
//                 console.error('Error uploading file:', err);
//             } finally {
//                 setIsUploading(false);
//                 setSelectedFile(null);
//                 fileInputRef.current.value = '';
//             }
//         }
//     };

//     const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//     };

//     return (
//         <div className="fixed bottom-20 right-2 w-96 bg-white border rounded-lg shadow-lg p-4 max-w-full sm:max-w-xs md:max-w-sm">
//             <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold">Chat</h3>
//                 <button onClick={onClose}>
//                     <IoClose className="text-xl" />
//                 </button>
//             </div>
//             <div className="overflow-y-auto max-h-80">
//                 {messages.map((msg, index) => (
//                     <div key={index} className="mb-2">
//                         {msg.type === 'text' && <p>{msg.text}</p>}
//                         {msg.type === 'file' && (
//                             <a href={msg.text} target="_blank" rel="noopener noreferrer" className="text-blue-500">
//                                 View File
//                             </a>
//                         )}
//                     </div>
//                 ))}
//             </div>
//             <div className="flex mt-2 items-center">
//                 <input
//                     type="text"
//                     value={inputMessage}
//                     onChange={(e) => setInputMessage(e.target.value)}
//                     placeholder="Write a message"
//                     className="flex-grow p-2 border rounded-l-md"
//                 />
//                 <input
//                     type="file"
//                     onChange={handleFileChange}
//                     ref={fileInputRef}
//                     className="hidden"
//                 />
//                 <button onClick={() => fileInputRef.current.click()} className="p-2">
//                     <IoAttach />
//                 </button>
//                 <button onClick={handleSendMessage} className="p-2 bg-blue-500 text-white rounded-r-md">
//                     {isUploading ? (
//                         <span>Uploading...</span>
//                     ) : (
//                         <IoSend />
//                     )}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ChatWindow;
