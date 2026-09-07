import { DialIcon, MuteIcon, SpeakerIcon, VideoDialIcon } from "@icons/index";

export const CallActions = () => {
  return (
    <div className="w-full dark:bg-[#222] rounded-xl mt-auto py-6 relative z-50">
      <ul className="flex items-center justify-around">
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
    </div>
  );
};
