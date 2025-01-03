// import React from 'react';
// import { AiOutlineMessage } from 'react-icons/ai'; // Optional: Add a chat icon

// const ChatIcon = () => {
//     return (
//         <section className='fixed bottom-7 right-2 z-50'>
//             <button
//                 className= 'bg-blue-500 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition duration-300 ease-in-out'
//                 aria-label="Chat"
//             >
//                 <AiOutlineMessage size={24} />
//             </button>
//         </section>
//     );
// };

// export default ChatIcon;


'use client'
import React, { useState } from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import ChatWindow from './ChatWindow';

const ChatIcon = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChatDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <section className='fixed bottom-7 right-2 z-50'>
            <button
                onClick={toggleChatDropdown}
                className='bg-blue-500 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center'
                aria-label="Chat"
            >
                <AiOutlineMessage size={24} />
            </button>

            {/* Chat Window */}
            {isOpen && <ChatWindow onClose={toggleChatDropdown} />}
        </section>
    );
};

export default ChatIcon;
