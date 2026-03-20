import type { User } from "@features/user/types";

export interface ChatState {
  status: string;
  error: string;
  conversations: Conversation[];
  activeConversation: Conversation;
  notifications: string[];
}

export interface Conversation {
  name: string;
  isGroup: boolean;
  users: User[];
  lastMessage: Message;
  admin: User;
}

export interface Message {
  sender: User;
  message: string;
  conversation: Conversation;
}

export interface ConversationsResponse {
  conversations: Conversation[];
}
