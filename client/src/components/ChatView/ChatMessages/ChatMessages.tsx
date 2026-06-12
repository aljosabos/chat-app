import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getConversationMessages,
  markConversationAsRead,
  deleteMessage,
} from "@features/chat/thunks";
import { useEffect, useRef, useState } from "react";
import { ConfirmationModal } from "@/components/";
import { Message } from "./Message";
import { socket } from "@utils/socket";

export const ChatMessages = () => {
  const dispatch = useAppDispatch();
  const { messages, activeConversation, conversations } = useAppSelector(
    (state) => state.chat,
  );
  const { user } = useAppSelector((state) => state.user);
  const currentUserId = user._id;

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);

  useEffect(() => {
    const getMessages = async () => {
      await dispatch(getConversationMessages(activeConversation._id)).unwrap();
    };
    getMessages();
  }, [dispatch, activeConversation._id]);

  // Mark conversation as read when viewing messages
  useEffect(() => {
    if (!activeConversation._id) return;

    const conversation = conversations.find(
      (c) => c._id === activeConversation._id,
    );
    if (
      conversation &&
      conversation.unreadCount &&
      conversation.unreadCount > 0
    ) {
      dispatch(markConversationAsRead(activeConversation._id));
    }
  }, [dispatch, activeConversation._id, conversations]);

  // scroll to the bottom when the page loads
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleDeleteMessage = (messageId: string) => {
    setMessageToDelete(messageId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (messageToDelete) {
      await dispatch(deleteMessage(messageToDelete)).unwrap();
      // Emit socket event to notify other users in the conversation
      socket.emit("delete message", {
        messageId: messageToDelete,
        conversationId: activeConversation._id,
      });
    }
    setShowDeleteModal(false);
    setMessageToDelete(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setMessageToDelete(null);
  };

  return (
    <>
      <div className="w-full h-full mb-[60px] px-6 dark:bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')] bg-cover bg-no-repeat bg-center overflow-y-auto scrollbar">
        {messages?.map((msg) => (
          <Message
            key={msg._id}
            message={msg.message}
            createdAt={msg.createdAt}
            orientation={msg.sender._id === currentUserId ? "right" : "left"}
            messageId={msg._id}
            isOwnMessage={msg.sender._id === currentUserId}
            onDeleteMessage={handleDeleteMessage}
          />
        ))}

        <div ref={bottomRef} />
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete message?"
        message="This action cannot be undone."
      />
    </>
  );
};
