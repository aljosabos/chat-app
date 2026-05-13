import { Server, Socket } from "socket.io";
import { Conversation } from "./models/conversationModel.js";

type OnlineUser = {
  userId: string;
  socketId: string;
};

let onlineUsers: OnlineUser[] = [];

export default function SocketServer(socket: Socket, io: Server) {
  // user joins or opens the application
  socket.on("join", (userId: string) => {
    socket.join(userId);

    // ukloni sve stare instance tog usera
    onlineUsers = onlineUsers.filter((u) => u.userId !== userId);

    onlineUsers.push({ userId, socketId: socket.id });

    io.emit("online-users", onlineUsers);
  });

  // socket disconnect
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("user has just disconnected");
    io.emit("online-users", onlineUsers);
  });

  // join a conversation room
  socket.on("join conversation", (conversationId: string) => {
    socket.join(conversationId);
  });

  // send and receive message
  socket.on("send message", async (message) => {
    // need reciever id of an active conversation
    let conversation = await Conversation.findOne({
      _id: message.conversation,
    }).populate({ path: "users" });

    console.log("socket server", conversation);
    if (!conversation?.users) return;

    conversation.users.forEach((user) => {
      if (String(user._id) === String(message.sender._id)) return;

      socket.in(user._id.toString()).emit("receive message", message);
    });
  });
}
