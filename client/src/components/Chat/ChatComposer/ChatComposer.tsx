import {
  ChatComposerAttachment,
  ChatComposerEmoji,
  ChatComposerInput,
} from "./";
import { useCallback, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { sendMessage } from "@features/chat/thunks";

export const ChatComposer = () => {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const dispatch = useAppDispatch();

  const { activeConversation, status } = useAppSelector((state) => state.chat);

  const msgInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = useCallback(async () => {
    if (!message.trim()) return;

    await dispatch(
      sendMessage({ conversationId: activeConversation._id, message })
    );
    setMessage("");
    setShowEmoji(false);
  }, [activeConversation._id, message, dispatch]);

  const handleAddEmoji = (emoji: string) => {
    const msgInput = msgInputRef.current;
    if (!msgInput) return;
    
    // postions of caret(text cursor) inside input
    const caretStart = msgInput.selectionStart ?? 0;
    const caretEnd = msgInput.selectionEnd ?? 0;

    const newValue =
      message.substring(0, caretStart) + emoji + message.substring(caretEnd);

    setMessage(newValue);

    requestAnimationFrame(() => {
      msgInput.focus();
      msgInput.setSelectionRange(
        caretStart + emoji.length,
        caretStart + emoji.length
      );
    });
  };

  return (
    <div className="flex items-center h-[65px] shrink-0 dark:bg-dark-2 gap-x-3 px-4 relative">
      <ChatComposerEmoji
        showEmoji={showEmoji}
        setShowEmoji={setShowEmoji}
        onSelectEmoji={handleAddEmoji}
      />
      <ChatComposerAttachment />
      <ChatComposerInput
        ref={msgInputRef}
        message={message}
        showLoader={status === "pending"}
        setMessage={setMessage}
        onSend={handleSendMessage}
      />
    </div>
  );
};
