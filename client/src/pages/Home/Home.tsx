import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  ChatSearch,
  MessageInput,
  NotificationsToggle,
} from "@components/index";
import { getConversations } from "@features/chat/chatSlice";
import { userSelector } from "@features/user/userSlice";
import { useEffect } from "react";

export const Home = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(userSelector);

  useEffect(() => {
    dispatch(getConversations());
  }, [user, dispatch]);

  return (
    <div className=" h-screen dark:bg-dark-1">
      <div className="w-[500px]">
        <MessageInput />
        <NotificationsToggle />
        <ChatSearch />
      </div>
    </div>
  );
};
