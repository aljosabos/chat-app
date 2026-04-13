import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getConversationMessages } from "@features/chat/thunks";
import { useEffect } from "react";

export const ChatMessages = () => {
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector((state) => state.chat);

  useEffect(() => {
    const getMessages = async () => {
      await dispatch(getConversationMessages()).unwrap();
    };
    getMessages();
  }, [dispatch]);

  console.log(messages);

  return (
    <div className=" w-full h-full mb-[60px] dark:bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')] bg-cover bg-no-repeat bg-center"></div>
  );
};
