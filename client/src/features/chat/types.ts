import type { User } from "@features/user/types";

export interface ChatState {
  status: "pending" | "error" | "success" | undefined;
  error: string;
  conversations: Conversation[];
  activeConversation: Conversation;
  messages: Message[];
  notifications: string[];
}

export interface Conversation {
  _id: string;
  name: string;
  isGroup: boolean;
  picture: string;
  users: User[];
  lastMessage: Message;
  admin: User;
  createdAt: string;
}

export interface Message {
  sender: User;
  message: string;
  conversation: string;
  files: File[];
  createdAt: string;
}

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
