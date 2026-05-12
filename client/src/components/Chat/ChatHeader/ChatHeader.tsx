import { useAppSelector } from "@/hooks/redux";
import { DotsIcon } from "@icons/Dots";
import SearchLargeIcon from "@icons/SearchLarge";

export const ChatHeader = () => {
  const { users } = useAppSelector((state) => state.chat.activeConversation);
  const { user: currentUser } = useAppSelector((state) => state.user);

  // users contains both user IDs from the same conversation; receiver is the one that is not the current user
  const receiver = users.find((user) => user._id !== currentUser._id);

  return (
    <div className="h-[50px] dark:bg-dark-2 shrink-0 px-4 py-1 flex justify-between items-center">
      {/* Left */}
      <div className="flex gap-x-2 items-center">
        <img
          src={receiver?.picture}
          alt={receiver?.name}
          className="h-10 w-10 rounded-full"
        />

        <div className="flex flex-col justify-center">
          <p className="text-white">{receiver?.name}</p>
          <span className="dark:text-dark-svg-2 text-xs">Online</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-x-2">
        <SearchLargeIcon className="dark:fill-dark-svg-1" />
        <DotsIcon className="dark:fill-dark-svg-1" />
      </div>
    </div>
  );
};
