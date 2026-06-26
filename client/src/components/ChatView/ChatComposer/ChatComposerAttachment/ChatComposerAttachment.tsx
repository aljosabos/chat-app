import AttachmentIcon from "@icons/Attachment";
import CameraIcon from "@icons/Camera";
import {
  ContactIcon,
  DocumentIcon,
  PhotoIcon,
  PollIcon,
  StickerIcon,
} from "@icons/.";
import type { AttachmentType } from "../ChatComposer.types";
import { cn } from "@utils/cn";

interface IChatComposerAttachmentProps {
  showAttachment: boolean;
  disabled?: boolean;
  onToggle: () => void;
  onSelectAttachment: (type: AttachmentType) => void;
}

export const ChatComposerAttachment = ({
  showAttachment,
  disabled,
  onToggle,
  onSelectAttachment,
}: IChatComposerAttachmentProps) => {
  return (
    <div>
      <button className="cursor-pointer" onClick={onToggle}>
        <AttachmentIcon
          className={cn("dark:fill-dark-svg-1", {
            "opacity-30": disabled,
          })}
        />
      </button>

      {showAttachment && (
        <ul className="flex flex-col gap-y-3 absolute bottom-[60px] left-[40px] list-none">
          <li>
            <PollIcon />
          </li>
          <li className="bg-[#0EABF4] rounded-full">
            <ContactIcon />
          </li>
          <li
            className="bg-[#5F66CD] rounded-full cursor-pointer"
            onClick={() => onSelectAttachment("document")}
          >
            <DocumentIcon />
          </li>
          <li
            className="bg-[#D3396D] rounded-full cursor-pointer"
            onClick={() => onSelectAttachment("video")}
          >
            <CameraIcon />
          </li>
          <li>
            <StickerIcon />
          </li>
          <li
            className="bg-[#BF59CF] rounded-full cursor-pointer"
            onClick={() => onSelectAttachment("image")}
          >
            <PhotoIcon />
          </li>
        </ul>
      )}
    </div>
  );
};
