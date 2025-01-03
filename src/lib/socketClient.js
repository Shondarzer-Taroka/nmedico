import io from 'socket.io-client';
let socket;

const initializeSocket = () => {
    if (!socket) {
        socket = io({ path: '/api/socket' });
    }
    return socket;
};

export default initializeSocket;
