import type { User } from "@features/user/types";

export interface ChatState {
  status: string;
  error: string;
  conversations: Conversation[];
  activeConversation: Conversation;
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
  conversation: Conversation;
  createdAt: string;
}

export interface ConversationsResponse {
  conversations: Conversation[];
}
