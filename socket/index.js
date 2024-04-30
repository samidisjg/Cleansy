const socketIo = require('socket.io');
const http = require('http');
const express = require('express');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

let users = [];

const addUser = (userId, socketId) => {
   !users.some((user) => user.userId === userId) &&
   users.push({ userId, socketId });
};

const removeUser = (socketId) => {
   users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (receiverId) => {
   return users.find((user) => user.userId === receiverId);
};

// Define a message object with a seen property
const createMessage = ({ senderId, receiverId, text }) => ({
   senderId,
   receiverId,
   text,
   seen: false,
});

io.on("connection", (socket) => {
   // when connect
   console.log(`a user is connected`);

   // take userId and socketId from user
   socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
   });

   // send and get message
   const messages = {}; // Object to track messages sent to each user

   socket.on("sendMessage", ({ senderId, receiverId, text}) => {
      const message = createMessage({ senderId, receiverId, text });

      const user = getUser(receiverId);

      // Store the messages in the `messages` object
      if (!messages[receiverId]) {
         messages[receiverId] = [message];
      } else {
         messages[receiverId].push(message);
      }

      // Send the message to the receiver
      io.to(user?.socketId).emit("getMessage", message);
   })

   socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
      const user = getUser(senderId);

      // update the seen flag for the message
      if (messages[senderId]) {
         const message = messages[senderId].find(
            (message) =>
              message.receiverId === receiverId && message.id === messageId
         );

         if (message) {
            message.seen = true;

            // send a message seen event to the sender
            io.to(user?.socketId).emit("messageSeen", {
               senderId,
               receiverId,
               messageId,
            })
         }
      }
   })

   // update and get last message
   socket.on("updateLastMessage", ({ lastMessage, lastMessageId }) => {
      io.emit("getLastMessage", {
         lastMessage,
         lastMessageId,
      });
   })

   // when disconnect
   socket.on("disconnect", () => {
      console.log(`a user disconnected!`);
      removeUser(socket.id);
      io.emit("getUsers", users);
   })
})

server.listen(4000, () => {
   console.log("Server is running on http://localhost:4000");
});