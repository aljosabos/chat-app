import type { User } from "@features/user/types";

export interface ChatState {
  status: "pending" | "error" | "success" | undefined;
  error: string;
  conversations: Conversation[];
  activeConversation: Conversation;
  messages: Message[];
  notifications: string[];
  onlineUsers: OnlineUser[];
}

export interface Conversation {
  _id: string;
  isGroup: boolean;
  users: User[];
  lastMessage: Message;
  admin: User;
  createdAt: string;
  unreadCount?: number;
}

export interface Message {
  _id: string;
  sender: User;
  message: string;
  conversation: string;
  files: FileType[];
  createdAt: string;
}

export type FileType = {
  url: string;
  publicId: string;
  resourceType: string;
  name?: string;
  type?: string;
};

export interface ConversationsResponse {
  conversations: Conversation[];
}

export interface MessageResponse {
  sender: User;
  message: Message;
  conversation: string;
  files: File[];
  createdAt: string;
}

export interface OnlineUser {
  userId: string;
  socketId: string;
}
