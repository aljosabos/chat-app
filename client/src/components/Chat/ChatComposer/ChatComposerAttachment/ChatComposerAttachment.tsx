import AttachmentIcon from "@icons/Attachment";
import CameraIcon from "@icons/Camera";
import {
  ContactIcon,
  DocumentIcon,
  PhotoIcon,
  PollIcon,
  StickerIcon,
} from "@icons/.";

interface IChatComposerAttachmentProps {
  showAttachment: boolean;
  onToggle: () => void;
  ref: React.RefObject<HTMLDivElement | null>;
}

export const ChatComposerAttachment = ({
  showAttachment,
  onToggle,
  ref,
}: IChatComposerAttachmentProps) => {
  return (
    <div ref={ref}>
      <button className="cursor-pointer" onClick={onToggle}>
        <AttachmentIcon className="dark:fill-dark-svg-1" />
      </button>

      {showAttachment && (
        <ul className="flex flex-col gap-y-3 absolute bottom-[60px] left-[40px] list-none">
          <li>
            <PollIcon />
          </li>
          <li className="bg-[#0EABF4] rounded-full">
            <ContactIcon />
          </li>
          <li className="bg-[#5F66CD] rounded-full">
            <DocumentIcon />
          </li>
          <li className="bg-[#D3396D] rounded-full">
            <CameraIcon />
          </li>
          <li>
            <StickerIcon />
          </li>
          <li className="bg-[#BF59CF] rounded-full">
            <PhotoIcon />
          </li>
        </ul>
      )}
    </div>
  );
};
