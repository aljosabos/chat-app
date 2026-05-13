import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useDebounce } from "@/hooks/useDebounce";
import { searchUser } from "@api/user";
import {
  Chat,
  ChatPlaceholder,
  ChatSearch,
  Contact,
  Conversations,
  Header,
  NotificationsToggle,
} from "@components/index";
import {
  setOnlineUsers,
  updateConversationLastMessage,
  updateMessages,
} from "@features/chat/chatSlice";
import { getConversations } from "@features/chat/thunks";
import type { Message, OnlineUser } from "@features/chat/types";
import type { User } from "@features/user/types";
import { userSelector } from "@features/user/userSlice";
import { socket } from "@utils/socket";

import { useCallback, useEffect, useState } from "react";

export const Home = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(userSelector);
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState<User[]>([]);

  const debouncedSearch = useDebounce(search);
  const { conversations, activeConversation } = useAppSelector(
    (state) => state.chat
  );

  const handleSearchUser = useCallback(async (search: string) => {
    try {
      const data = await searchUser(search);
      return data;
    } catch (err) {
      console.error("Search error:", err);
    }
  }, []);

  useEffect(() => {
    socket.on("connect", () =>
      console.log("socket.io connection established from the client")
    );
  }, []);

  useEffect(() => {
    socket.emit("join", user._id);
  }, [user._id]);

  useEffect(() => {
    const handleOnlineUsers = (users: OnlineUser[]) => {
      dispatch(setOnlineUsers(users));
    };

    socket.on("online-users", handleOnlineUsers);

    return () => {
      socket.off("online-users", handleOnlineUsers);
    };
  }, [dispatch]);

  useEffect(() => {
    const handleReceiveMessage = (message: Message) => {
      const isActiveConversation =
        activeConversation._id === message.conversation;

      if (isActiveConversation) {
        // Update messages only for currently open chat window
        dispatch(updateMessages(message));
      } else {
        // Update preview (lastMessage) for background conversations
        dispatch(updateConversationLastMessage(message));
      }
    };

    socket.on("receive message", handleReceiveMessage);

    return () => {
      socket.off("receive message", handleReceiveMessage);
    };
  }, [dispatch, activeConversation._id]);

  useEffect(() => {
    dispatch(getConversations());
  }, [user, dispatch]);

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setContacts([]);
      return;
    }

    const fetchUsers = async () => {
      const users = await handleSearchUser(debouncedSearch.trim());
      if (users) setContacts(users);
    };

    fetchUsers();
  }, [debouncedSearch, handleSearchUser]);

  return (
    <div className="h-screen dark:bg-dark-1 flex">
      <div className="w-[500px] flex flex-col">
        <div className="flex-shrink-0">
          <Header />
          <NotificationsToggle />
          <ChatSearch search={search} setSearchContacts={setSearch} />
        </div>

        <div className="min-h-0 flex-1">
          {contacts.length > 0 ? (
            contacts?.map((contact) => (
              <div key={contact._id}>
                <span className="m-4 text-green-3 text-sm">Contacts</span>
                <Contact {...contact} />
              </div>
            ))
          ) : (
            <Conversations
              conversations={conversations}
              activeConversationId={activeConversation._id}
            />
          )}
        </div>
      </div>
      {activeConversation._id ? <Chat /> : <ChatPlaceholder />}
    </div>
  );
};
