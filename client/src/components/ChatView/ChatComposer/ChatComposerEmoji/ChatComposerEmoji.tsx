import EmojiIcon from "@icons/Emoji";
import EmojiPicker, {
  EmojiStyle,
  Theme,
  type EmojiClickData,
  SkinTonePickerLocation,
} from "emoji-picker-react";

interface IChatComposerEmojiProps {
  showEmoji: boolean;
  onToggle: () => void;
  onSelectEmoji: (emoji: string) => void;
  ref: React.RefObject<HTMLDivElement | null>;
}

export const ChatComposerEmoji = ({
  showEmoji,
  onToggle,
  onSelectEmoji,
  ref,
}: IChatComposerEmojiProps) => {
  const handleEmoji = (emojiData: EmojiClickData) => {
    onSelectEmoji(emojiData.emoji);
  };

  return (
    <div ref={ref}>
      <button onClick={onToggle}>
        <EmojiIcon className="dark:fill-dark-svg-1 cursor-pointer" />
      </button>
      <div className="absolute bottom-[55px] left-[0px] w-full">
        {showEmoji && (
          <EmojiPicker
            theme={Theme.DARK}
            onEmojiClick={handleEmoji}
            lazyLoadEmojis={false}
            autoFocusSearch={false}
            emojiStyle={EmojiStyle.NATIVE}
            skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
            previewConfig={{ showPreview: true }}
          />
        )}
      </div>
    </div>
  );
};
