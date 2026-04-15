import {
  ChatComposerAttachment,
  ChatComposerEmoji,
  ChatComposerInput,
} from "./";
import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { sendMessage } from "@features/chat/thunks";

export const ChatComposer = () => {
  const dispatch = useAppDispatch();
  const { activeConversation, status } = useAppSelector((state) => state.chat);
  const [message, setMessage] = useState("");

  const handleSendMessage = useCallback(async () => {
    if (!message.trim()) return;

    await dispatch(
      sendMessage({ conversationId: activeConversation._id, message })
    );
    setMessage("");
  }, [activeConversation._id, message, dispatch]);

  return (
    <div className="flex items-center h-[65px] bg-amber-100 shrink-0 dark:bg-dark-2 gap-x-3 px-4">
      <ChatComposerEmoji />
      <ChatComposerAttachment />
      <ChatComposerInput
        message={message}
        showLoader={status === "pending"}
        setMessage={setMessage}
        onSend={handleSendMessage}
      />
    </div>
  );
};
