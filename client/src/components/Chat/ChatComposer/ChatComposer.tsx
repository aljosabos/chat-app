import {
  ChatComposerAttachment,
  ChatComposerEmoji,
  ChatComposerInput,
} from "./";
import { useCallback, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { sendMessage } from "@features/chat/thunks";
import { useClickOutside } from "@/hooks/useOutsideClick";

type ActivePanel = "emoji" | "attachment" | null;

export const ChatComposer = () => {
  const [message, setMessage] = useState("");
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);

  const dispatch = useAppDispatch();

  const { activeConversation, status } = useAppSelector((state) => state.chat);

  const msgInputRef = useRef<HTMLInputElement>(null);
  const attachmentRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = useCallback(async () => {
    if (!message.trim()) return;

    await dispatch(
      sendMessage({ conversationId: activeConversation._id, message })
    );
    setMessage("");
    setActivePanel(null);
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

  const openEmoji = () =>
    setActivePanel((prev) => (prev === "emoji" ? null : "emoji"));

  const openAttachment = () =>
    setActivePanel((prev) => (prev === "attachment" ? null : "attachment"));

  const closePanel = () => setActivePanel(null);

  useClickOutside(attachmentRef, closePanel);
  useClickOutside(emojiRef, closePanel);

  return (
    <div className="flex items-center h-[65px] shrink-0 dark:bg-dark-2 gap-x-3 px-4 relative">
      <ChatComposerEmoji
        showEmoji={activePanel === "emoji"}
        onToggle={openEmoji}
        onSelectEmoji={handleAddEmoji}
        ref={emojiRef}
      />
      <ChatComposerAttachment
        showAttachment={activePanel === "attachment"}
        onToggle={openAttachment}
        ref={attachmentRef}
      />
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
