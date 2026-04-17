import EmojiIcon from "@icons/Emoji";
import EmojiPicker, { Theme, type EmojiClickData } from "emoji-picker-react";

interface IChatComposerEmojiProps {
  showEmoji: boolean;
  setShowEmoji: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectEmoji: (emoji: string) => void;
}

export const ChatComposerEmoji = ({
  showEmoji,
  setShowEmoji,
  onSelectEmoji,
}: IChatComposerEmojiProps) => {
  const handleEmoji = (emojiData: EmojiClickData) => {
    onSelectEmoji(emojiData.emoji);
  };

  return (
    <>
      <button onClick={() => setShowEmoji((prevState) => !prevState)}>
        <EmojiIcon className="dark:fill-dark-svg-1 cursor-pointer" />
      </button>
      <div className="openEmojiAnimation absolute bottom-[55px] left-[0px] w-full">
        {showEmoji && (
          <EmojiPicker
            theme={Theme.DARK}
            onEmojiClick={handleEmoji}
            lazyLoadEmojis
          />
        )}
      </div>
    </>
  );
};
