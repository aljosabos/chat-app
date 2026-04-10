import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useDebounce } from "@/hooks/useDebounce";
import { searchUser } from "@api/user";
import {
  ChatPlaceholder,
  ChatSearch,
  Contact,
  Conversations,
  Header,
  NotificationsToggle,
} from "@components/index";
import {
  conversationsSelector,
  getConversations,
} from "@features/chat/chatSlice";
import type { User } from "@features/user/types";
import { userSelector } from "@features/user/userSlice";
import { useCallback, useEffect, useState } from "react";

export const Home = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(userSelector);
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState<User[]>([]);

  const debouncedSearch = useDebounce(search);
  const conversations = useAppSelector(conversationsSelector);

  const handleSearchUser = useCallback(async (search: string) => {
    try {
      const data = await searchUser(search);
      return data;
    } catch (err) {
      console.error("Search error:", err);
    }
  }, []);

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
      <div className="w-[500px] flex-col">
        <div className="flex-shrink-0">
          <Header />
          <NotificationsToggle />
          <ChatSearch search={search} setSearchContacts={setSearch} />
        </div>

        <div className="min-h-0 flex-1">
          {contacts.length > 0 ? (
            contacts?.map((contact) => (
              <Contact {...contact} key={contact._id} />
            ))
          ) : (
            <Conversations conversations={conversations} />
          )}
        </div>
      </div>
        <ChatPlaceholder />
    </div>
  );
};
