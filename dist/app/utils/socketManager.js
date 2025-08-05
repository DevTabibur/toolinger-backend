"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Keep track of customer socket IDs in each room
const customersInRooms = {};
// Keep track of active users
const activeUsers = new Map();
function setupSocketManager(io) {
    // console.log('line 1');
    io.on('connection', (socket) => {
        // console.log('line 2');
        // console.log('connection established');
        socket.on('join', (userId) => {
            // console.log('userID from socket', userId);
            if (userId && !activeUsers.has(userId)) {
                activeUsers.set(userId, socket.id);
            }
            io.emit('activeUsers', Array.from(activeUsers.keys()));
        });
        // Customers join a room
        socket.on('joinRoom', (roomId) => {
            socket.join(roomId);
            // Store the customer socket ID in the associated room
            if (!customersInRooms[roomId]) {
                customersInRooms[roomId] = [];
            }
            customersInRooms[roomId].push(socket.id);
            // Check if there is an agent available in the room
            const roomAgents = Array.from(activeUsers.keys()).filter(userId => {
                var _a;
                const agentSocketId = activeUsers.get(userId);
                return (agentSocketId && !((_a = customersInRooms[roomId]) === null || _a === void 0 ? void 0 : _a.includes(agentSocketId)));
            });
            if (roomAgents.length > 0) {
                // Notify the customer that an agent is available in the room
                socket.emit('agentAvailable');
            }
        });
        // Customers send message to the room and all the agents in the room will receive the message
        socket.on('customerMessage', (message, roomId) => {
            // Broadcast the message to all agents in the room
            socket.to(roomId).emit('agentReceivedMessage', message);
        });
        // Agents send message to the room and only the selected customer in the room will receive the message
        socket.on('agentMessage', (message, roomId, customerId) => {
            var _a;
            // Find the socket ID of the selected customer in the room
            const customerSocketId = (_a = customersInRooms[roomId]) === null || _a === void 0 ? void 0 : _a.find(id => id === customerId);
            if (customerSocketId) {
                // Broadcast the message to all agents and the selected customer in the room
                socket.to(roomId).emit('agentReceivedMessage', message);
                socket.to(customerSocketId).emit('customerReceivedMessage', message);
            }
            else {
                socket.emit('errorMessage', 'Customer not found in the room');
            }
        });
        // console.log('socket.handshake.query.', socket.handshake.query);
        // const userId = socket.handshake.query.userId as string; // Mechanic's user ID
        // if (userId) {
        //   console.log(`User connected: ${userId}`);
        //   socket.join(userId); // Mechanic joins a room with their `_id`
        // }
        // Handle 'join' event
        socket.on("join", (userId) => {
            // console.log(`User with ID ${userId} joined`);
            socket.join(userId); // Add the user to a room named after their ID
        });
        // Real-time chat
        socket.on("sendMessage", (data) => {
            const { senderId, receiverId, message, timestamp } = data;
            // Emit the message to the receiver in their room
            io.to(receiverId).emit("receiveMessage", {
                senderId,
                receiverId,
                message,
            });
            // Log the message for debugging purposes
            console.log("Chat Message Sent:", data);
        });
        socket.on('disconnect', () => {
            for (const [userId, socketId] of activeUsers.entries()) {
                if (socketId === socket.id) {
                    activeUsers.delete(userId);
                    break;
                }
            }
            io.emit('activeUsers', Array.from(activeUsers.keys()));
        });
    });
}
exports.default = setupSocketManager;
