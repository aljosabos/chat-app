import { useAppSelector } from "@/hooks/redux";
import { userSelector } from "@features/user/userSlice";
import { ChatIcon, CommunityIcon, DotsIcon, StoryIcon } from "@icons/index";

export const MessageBox = () => {
  const { user } = useAppSelector(userSelector);

  return (
    <div className="dark:bg-dark-2 h-[50px] w-[40%] p-1 flex justify-between items-center px-3">
      <img
        src={user.picture}
        alt={user.name}
        className="h-full object-contain p-1"
      />
      <div className="flex gap-3 items-center">
        <CommunityIcon className="dark:fill-dark-svg-1" />
        <StoryIcon className="dark:fill-dark-svg-1" />
        <ChatIcon className="dark:fill-dark-svg-1" />
        <DotsIcon className="dark:fill-dark-svg-1" />
      </div>
    </div>
  );
};
