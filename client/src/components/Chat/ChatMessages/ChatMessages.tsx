import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getConversationMessages } from "@features/chat/thunks";
import { useEffect } from "react";
import { Message } from "./Message";

export const ChatMessages = () => {
  const dispatch = useAppDispatch();
  const { messages, activeConversation } = useAppSelector(
    (state) => state.chat
  );
  const { user } = useAppSelector((state) => state.user);
  const currentUserId = user._id;

  useEffect(() => {
    const getMessages = async () => {
      await dispatch(getConversationMessages(activeConversation._id)).unwrap();
    };
    getMessages();
  }, [dispatch, activeConversation._id]);

  return (
    <div className="w-full h-full mb-[60px] px-6 dark:bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')] bg-cover bg-no-repeat bg-center">
      {messages?.map((msg) => (
        <Message
          key={msg.createdAt}
          message={msg.message}
          createdAt={msg.createdAt}
          orientation={msg.sender._id === currentUserId ? "left" : "right"}
        />
      ))}
    </div>
  );
};
