import { Socket } from "socket.io";

type ConversationUser = {
  _id: string;
};

export default function SocketServer(socket: Socket) {
  // user joins or opens the application
  socket.on("join", (userId: string) => {
    console.log("User has joined: ", userId);
    socket.join(userId);
  });

  // join a conversation room
  socket.on("join conversation", (conversationId: string) => {
    socket.join(conversationId);
    console.log("USER HAS JOINED CONVERSATION: ", conversationId);
  });

  // send and receive message
  socket.on("send message", (message) => {
    console.log("new message received ---->", message);
    // need reciever id of an active conversation
    let conversation = message.conversation;
    if (!conversation.users) return;
    conversation.users.forEach((user: ConversationUser) => {
      if (user._id === message.sender._id) return;
      socket.in(user._id).emit("message received", message);
    });
  });
}
