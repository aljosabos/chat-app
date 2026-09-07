import { DialIcon, MuteIcon, SpeakerIcon, VideoDialIcon } from "@icons/index";
import { useState } from "react";

export const CallActions = () => {
  const [shouldShowActions, setShouldShowActions] = useState(false);
  return (
    <div
      className="flex flex-col h-full"
      onMouseOver={() => setShouldShowActions(true)}
      onMouseLeave={() => setShouldShowActions(false)}
    >
      {shouldShowActions && (
        <ul className="flex items-center justify-around h-[80px] w-full dark:bg-[#222] rounded-xl mt-auto py-4">
          <li>
            <button className="cursor-pointer p-2 dark:bg-dark-2 rounded-full">
              <SpeakerIcon className="fill-white h-[25px] w-[25px]" />
            </button>
          </li>
          <li>
            <button className="cursor-pointer p-2 dark:bg-dark-2 rounded-full">
              <VideoDialIcon className="fill-white w-[25px] h-[25px] pt-1 transform scale-200" />
            </button>
          </li>
          <li>
            <button className="cursor-pointer p-2 dark:bg-dark-2 rounded-full">
              <MuteIcon className="fill-white h-[25px] w-[25px]" />
            </button>
          </li>
          <li>
            <button className="cursor-pointer p-2 dark:bg-red-500 rounded-full">
              <DialIcon className="fill-white h-[20px] w-[20px] transform rotate-135" />
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};
