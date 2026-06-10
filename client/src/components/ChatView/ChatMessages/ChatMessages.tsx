import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getConversationMessages, markConversationAsRead } from "@features/chat/thunks";
import { useEffect, useRef } from "react";
import { Message } from "./Message";

export const ChatMessages = () => {
  const dispatch = useAppDispatch();
  const { messages, activeConversation, conversations } = useAppSelector(
    (state) => state.chat
  );
  const { user } = useAppSelector((state) => state.user);
  const currentUserId = user._id;

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getMessages = async () => {
      await dispatch(getConversationMessages(activeConversation._id)).unwrap();
    };
    getMessages();
  }, [dispatch, activeConversation._id]);

  // Mark conversation as read when viewing messages
  useEffect(() => {
    if (!activeConversation._id) return;

    const conversation = conversations.find(c => c._id === activeConversation._id);
    if (conversation && conversation.unreadCount && conversation.unreadCount > 0) {
      dispatch(markConversationAsRead(activeConversation._id));
    }
  }, [dispatch, activeConversation._id, conversations]);

  // scroll to the bottom when the page loads
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full h-full mb-[60px] px-6 dark:bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')] bg-cover bg-no-repeat bg-center overflow-y-auto scrollbar">
      {messages?.map((msg) => (
        <Message
          key={msg._id}
          message={msg.message}
          createdAt={msg.createdAt}
          orientation={msg.sender._id === currentUserId ? "right" : "left"}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
};
