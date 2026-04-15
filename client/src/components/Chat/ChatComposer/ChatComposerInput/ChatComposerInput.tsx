import SendIcon from "@icons/Send";
import { ClipLoader } from "react-spinners";

interface IChatComposerInputProps {
  message: string;
  showLoader: boolean;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  onSend: () => void;
}

export const ChatComposerInput = ({
  message,
  showLoader,
  setMessage,
  onSend,
}: IChatComposerInputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend();
  };
  return (
    <form className="flex flex-1" onSubmit={handleSubmit}>
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        type="text"
        placeholder="Type message..."
        className="w-full dark:text-dark-text-1 outline-none p-2 rounded-md dark:bg-dark-hover-1"
      />
      <button
        type="submit"
        disabled={!message.trim()}
        className="
    p-2 rounded-md transition
    hover:bg-gray-200 dark:hover:bg-dark-hover-2
    disabled:opacity-40
    disabled:cursor-not-allowed
    disabled:hover:bg-transparent
  "
      >
        {showLoader ? (
          <ClipLoader />
        ) : (
          <SendIcon className="dark:fill-dark-svg-1" />
        )}
      </button>
    </form>
  );
};
