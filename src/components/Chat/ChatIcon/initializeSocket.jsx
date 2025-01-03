import io from "socket.io-client";

let socket;

const initializeSocket = () => {
    if (!socket) {
        socket = io({
            path: "http://localhost:3000/api/socket",
        });
    }
    return socket;
};

export default initializeSocket;
