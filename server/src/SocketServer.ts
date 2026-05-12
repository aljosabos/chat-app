import { Socket } from "socket.io";
import { Conversation } from "./models/conversationModel.js";

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
  socket.on("send message", async (message) => {
    // need reciever id of an active conversation
    let conversation = await Conversation.findOne({
      _id: message.conversation,
    }).populate({ path: "users" });

    console.log("socket server", conversation);
    if (!conversation?.users) return;

    conversation.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      socket.in(user._id.toString()).emit("receive message", message);
      console.log("EMIT to user:", user._id, message);
    });
  });
}
