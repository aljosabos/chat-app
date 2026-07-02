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
import type { ActivePanel, AttachmentType } from "./ChatComposer.types";
import { acceptMap, maxSizeMap } from "./ChatComposer.constants";
import { apiFetch } from "@utils/api";
import { formatMB, getFileType } from "./ChatComposer.helpers";
import { useVideoThumbnail } from "@/hooks/useVideoThumbnail";
import { FilePreview } from "./FIlePreview/FilePreview";

interface ChatComposerProps {
  messageForEdit: Message | null;
  setMessageForEdit: React.Dispatch<React.SetStateAction<Message | null>>;
}

export const ChatComposer = ({
  messageForEdit,
  setMessageForEdit,
}: ChatComposerProps) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeAttachmentType, setActiveAttachmentType] =
    useState<AttachmentType>(null);
  const dispatch = useAppDispatch();

  const thumb = useVideoThumbnail(previewUrl, selectedFile?.type);

  const { activeConversation } = useAppSelector((state) => state.chat);
  const isEditing = !!messageForEdit;

  const msgInputRef = useRef<HTMLInputElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle submit for both sending and editing messages
  const handleSubmit = useCallback(async () => {
    if (!message.trim() && !selectedFile) return;

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
        // url of uploaded file to cloudinary
        let uploadResult: { url: string; publicId: string; resourceType: string } | null = null;

        // 1. upload file to cloudinary and retreive url
        if (selectedFile) {
          setIsUploading(true);
          const formData = new FormData();
          formData.append("file", selectedFile);
          const res = await apiFetch("upload", {
            method: "POST",
            body: formData,
          });
          uploadResult = {
            url: res.url,
            publicId: res.publicId,
            resourceType: res.resourceType,
          };
          setIsUploading(false);
        }

        // sending message with fileUrl if attached
        const newMessage = await dispatch(
          sendMessage({
            conversationId: activeConversation._id,
            message,
            files: uploadResult
              ? [
                  {
                    url: uploadResult.url,
                    publicId: uploadResult.publicId,
                    resourceType: uploadResult.resourceType,
                    name: selectedFile!.name,
                    type: getFileType(selectedFile!.type),
                  },
                ]
              : [],
          }),
        );
        if (selectedFile) {
          setSelectedFile(null);
          setPreviewUrl(null);
          setActiveAttachmentType(null);
        }
        socket.emit("send message", newMessage.payload);
      }

      setMessage("");
      setActivePanel(null);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    activeConversation._id,
    message,
    isEditing,
    messageForEdit,
    selectedFile,
    setMessageForEdit,
    dispatch,
  ]);

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

  const handleSelectAttachment = (type: AttachmentType) => {
    setActiveAttachmentType(type);
  };

  const openFilePicker = (type: AttachmentType) => {
    const input = fileInputRef.current;
    if (!input || !type) return;

    input.accept = acceptMap[type];
    input.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeAttachmentType) return;

    setError(null);
    const maxSize = maxSizeMap[activeAttachmentType];

    if (file.size > maxSize) {
      setError(
        `File too large. Max allowed for ${activeAttachmentType} is ${formatMB(maxSize)}`,
      );
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleFileRemove = () => {
    if (!previewUrl) return;
    URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setSelectedFile(null);
    setActiveAttachmentType(null);
    setError(null);
  };

  useClickOutside(composerRef, closePanel);

  useEffect(() => {
    setMessage(messageForEdit?.message || "");
  }, [messageForEdit]);

  useEffect(() => {
    if (activeAttachmentType) {
      openFilePicker(activeAttachmentType);
      setActivePanel(null);
    }
  }, [activeAttachmentType]);

  return (
    <div>
      {error && <p className="text-red-300 px-24">{error}</p>}
      {previewUrl && (
        <FilePreview
          selectedFile={selectedFile}
          previewUrl={previewUrl}
          thumb={thumb}
          onFileRemove={handleFileRemove}
        />
      )}
      <div
        className={cn(
          "flex items-center shrink-0 dark:bg-dark-2 gap-x-3 p-4 relative transition-all duration-50 ease-in-out",
          {
            "pt-10": isEditing,
          },
        )}
        ref={composerRef}
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
          onSelectAttachment={handleSelectAttachment}
          disabled={isSubmitting || isUploading}
        />
        <ChatComposerInput
          message={message}
          showLoader={isSubmitting || isUploading}
          isEditing={isEditing}
          disabled={!message.trim() && !selectedFile}
          setMessage={setMessage}
          onSubmit={handleSubmit}
          ref={msgInputRef}
        />

        {isEditing && (
          <CloseIcon
            className="dark:fill-dark-svg-2 top-1 right-5 absolute p-1 w-[26px] h-[26px] hover:cursor-pointer"
            onClick={() => setMessageForEdit(null)}
          />
        )}
        <input
          type="file"
          hidden
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};
