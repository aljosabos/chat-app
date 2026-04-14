import SendIcon from "@icons/Send";
import {
  ChatComposerAttachment,
  ChatComposerEmoji,
  ChatComposerInput,
} from "./";

export const ChatComposer = () => {
  return (
    <div className="flex items-center h-[65px] bg-amber-100 shrink-0 dark:bg-dark-2 gap-x-3 px-4">
      <ChatComposerEmoji />
      <ChatComposerAttachment />
      <ChatComposerInput />
      <SendIcon className="dark:fill-dark-svg-1" />
    </div>
  );
};
