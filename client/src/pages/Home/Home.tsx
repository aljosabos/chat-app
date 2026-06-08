import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useDebounce } from "@/hooks/useDebounce";
import { searchUser } from "@api/user";
import {
  ChatView,
  ChatPlaceholder,
  ChatSearch,
  Conversations,
  Header,
  NotificationsToggle,
  Contacts,
  ConfirmationModal,
} from "@components/index";
import {
  addConversation,
  setOnlineUsers,
  updateConversationLastMessage,
  updateMessages,
} from "@features/chat/chatSlice";
import { deleteConversation, getConversations } from "@features/chat/thunks";
import type { Message, OnlineUser, Conversation as ConversationType } from "@features/chat/types";
import type { User } from "@features/user/types";
import { userSelector } from "@features/user/userSlice";
import { socket } from "@utils/socket";
import { useCallback, useEffect, useState } from "react";

export const Home = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(userSelector);
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState<User[]>([]);
  const [conversationToDeleteId, setConversationToDeleteId] = useState<
    string | null
  >(null);
  const [shouldShowConfirmationModal, setShouldShowConfirmationModal] =
    useState(false);

  console.log(conversationToDeleteId);

  /* For mobile view: whether the chat window is open or we are still on the conversations list */
  const [isChatOpen, setIsChatOpen] = useState(false);

  const debouncedSearch = useDebounce(search);
  const { conversations, activeConversation } = useAppSelector(
    (state) => state.chat,
  );

  const handleSearchUser = useCallback(async (search: string) => {
    try {
      const data = await searchUser(search);
      return data;
    } catch (err) {
      console.error("Search error:", err);
    }
  }, []);

  const handleDeleteConversation = useCallback(async () => {
    if (!conversationToDeleteId) return;
    try {
      await dispatch(deleteConversation(conversationToDeleteId)).unwrap();
      setShouldShowConfirmationModal(false);
      setConversationToDeleteId(null);
    } catch (err) {
      console.error("Delete conversation error:", err);
    } finally {
      setShouldShowConfirmationModal(false);
      setConversationToDeleteId(null);
    }
  }, [dispatch, conversationToDeleteId]);

  useEffect(() => {
    socket.on("connect", () =>
      console.log("socket.io connection established from the client"),
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
    const handleReceiveMessage = ({ message, conversation }: { message: Message; conversation: ConversationType }) => {
      const isActiveConversation =
        activeConversation._id === message.conversation;

      // Check if conversation exists in the list
      const conversationExists = conversations.some(
        (c) => c._id === conversation._id
      );

      if (isActiveConversation) {
        // Update messages only for currently open chat window
        dispatch(updateMessages(message));
      } else {
        // Update preview (lastMessage) for background conversations
        dispatch(updateConversationLastMessage(message));
      }

      // If conversation doesn't exist, add it to the list
      if (!conversationExists) {
        dispatch(addConversation(conversation));
      }
    };

    socket.on("receive message", handleReceiveMessage);

    return () => {
      socket.off("receive message", handleReceiveMessage);
    };
  }, [dispatch, activeConversation._id, conversations]);

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
      <div className="w-full flex flex-col sm:max-w-sm">
        <div className="flex-shrink-0">
          <Header />
          <NotificationsToggle />
          <ChatSearch search={search} setSearchContacts={setSearch} />
        </div>
        <div className="min-h-0 flex-1">
          {contacts.length > 0 ? (
            <Contacts contacts={contacts} />
          ) : (
            <Conversations
              conversations={conversations}
              activeConversationId={activeConversation._id}
              onOpenChat={() => setIsChatOpen(true)}
              onDeleteConversation={(conversationId: string) => {
                setConversationToDeleteId(conversationId);
                setShouldShowConfirmationModal(true);
              }}
            />
          )}
        </div>
        )
      </div>

      {/* DESKTOP CHAT ONLY */}
      <div className="hidden sm:block w-full">
        {activeConversation._id ? <ChatView /> : <ChatPlaceholder />}
      </div>

      {/* MOBILE CHAT */}
      {isChatOpen && (
        <div className="sm:hidden fixed inset-0 w-full z-50 bg-white dark:bg-dark-1">
          {activeConversation._id ? (
            <ChatView onBack={() => setIsChatOpen(false)} />
          ) : (
            <ChatPlaceholder />
          )}
        </div>
      )}

      <ConfirmationModal
        isOpen={shouldShowConfirmationModal}
        onConfirm={handleDeleteConversation}
        onClose={() => {
          setShouldShowConfirmationModal(false);
          setConversationToDeleteId(null);
        }}
      />
    </div>
  );
};
