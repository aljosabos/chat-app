import SendIcon from "@icons/Send";
import { ClipLoader } from "react-spinners";
import { cn } from "@/utils/cn";
import { CheckIcon } from "@icons/index";

interface IChatComposerInputProps {
  message: string;
  showLoader: boolean;
  isEditing: boolean;
  disabled: boolean;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  ref: React.RefObject<HTMLInputElement | null>;
}

export const ChatComposerInput = ({
  message,
  showLoader,
  isEditing,
  disabled,
  setMessage,
  onSubmit,
  ref,
}: IChatComposerInputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <form className="flex flex-1 relative" onSubmit={handleSubmit}>
      <input
        ref={ref}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        type="text"
        placeholder="Type message..."
        className={cn(
          "w-full dark:text-dark-text-1 outline-none p-2 rounded-md dark:bg-dark-hover-1",
          {
            "pl-27": isEditing,
          },
        )}
      />
      {isEditing && (
        <span className="absolute left-2 bottom-2 text-dark-svg-2 italic text-sm">
          Edit message:
        </span>
      )}
      <button
        type="submit"
        disabled={disabled}
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
        ) : isEditing ? (
          <CheckIcon className="dark:text-green-2" />
        ) : (
          <SendIcon className="dark:fill-dark-svg-1" />
        )}
      </button>
    </form>
  );
};
