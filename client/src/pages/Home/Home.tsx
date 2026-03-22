import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  ChatSearch,
  Conversations,
  MessageInput,
  NotificationsToggle,
} from "@components/index";
import {
  conversationsSelector,
  getConversations,
} from "@features/chat/chatSlice";
import { userSelector } from "@features/user/userSlice";
import { useEffect } from "react";

export const Home = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(userSelector);

  const conversations = useAppSelector(conversationsSelector);

  useEffect(() => {
    dispatch(getConversations());
  }, [user, dispatch]);

  return (
    <div className="h-screen dark:bg-dark-1 flex">
      <div className="w-[500px] flex flex-col">
        <div className="flex-shrink-0">
          <MessageInput />
          <NotificationsToggle />
          <ChatSearch />
        </div>

        <div className="min-h-0 flex-1">
          <Conversations conversations={conversations} />
        </div>
      </div>
    </div>
  );
};
