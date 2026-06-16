import {
  ChatComposerAttachment,
  ChatComposerEmoji,
  ChatComposerInput,
} from ".";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { editMessage, sendMessage } from "@features/chat/thunks";
import { useClickOutside } from "@/hooks/useOutsideClick";
import { socket } from "@utils/socket";
import type { Message } from "@features/chat/types";
import { CloseIcon } from "@icons/index";
import { cn } from "@utils/cn";

type ActivePanel = "emoji" | "attachment" | null;

interface ChatComposerProps {
  messageForEdit: Message | null;
  setMessageForEdit: React.Dispatch<React.SetStateAction<Message | null>>;
}

export const ChatComposer = ({
  messageForEdit,
  setMessageForEdit,
}: ChatComposerProps) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);

  const dispatch = useAppDispatch();

  const { activeConversation } = useAppSelector((state) => state.chat);
  const isEditing = !!messageForEdit;

  const msgInputRef = useRef<HTMLInputElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);

  // Handle submit for both sending and editing messages
  const handleSubmit = useCallback(async () => {
    if (!message.trim()) return;

    try {
      setIsSubmitting(true);

      if (isEditing) {
        const editedMessage = await dispatch(
          editMessage({
            message_id: messageForEdit?._id,
            message,
          }),
        ).unwrap();
        setMessageForEdit(null);

        socket.emit("edit message", editedMessage);
      } else {
        const newMessage = await dispatch(
          sendMessage({ conversationId: activeConversation._id, message }),
        );
        socket.emit("send message", newMessage.payload);
      }

      setMessage("");
      setActivePanel(null);
    } finally {
      setIsSubmitting(false);
    }
  }, [activeConversation._id, message, isEditing, messageForEdit, dispatch]);

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
        caretStart + emoji.length,
      );
    });
  };

  const openEmoji = () =>
    setActivePanel((prev) => (prev === "emoji" ? null : "emoji"));

  const openAttachment = () =>
    setActivePanel((prev) => (prev === "attachment" ? null : "attachment"));

  const closePanel = () => setActivePanel(null);

  useClickOutside(emojiRef, closePanel);

  useEffect(() => {
    setMessage(messageForEdit?.message || "");
  }, [messageForEdit]);

  return (
    <div
      className={cn(
        "flex items-center shrink-0 dark:bg-dark-2 gap-x-3 p-4 relative transition-all duration-50 ease-in-out",
        {
          "pt-10": isEditing,
        },
      )}
    >
      <ChatComposerEmoji
        showEmoji={activePanel === "emoji"}
        onToggle={openEmoji}
        onSelectEmoji={handleAddEmoji}
        ref={emojiRef}
      />
      <ChatComposerAttachment
        showAttachment={activePanel === "attachment"}
        onToggle={openAttachment}
      />
      <ChatComposerInput
        ref={msgInputRef}
        message={message}
        showLoader={isSubmitting}
        isEditing={isEditing}
        setMessage={setMessage}
        onSubmit={handleSubmit}
      />
      {isEditing && (
        <CloseIcon
          className="dark:fill-dark-svg-2 top-1 right-5 absolute p-1 w-[26px] h-[26px] hover:cursor-pointer"
          onClick={() => setMessageForEdit(null)}
        />
      )}
    </div>
  );
};
