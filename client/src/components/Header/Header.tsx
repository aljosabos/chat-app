import { useAppSelector } from "@/hooks/redux";
import { useClickOutside } from "@/hooks/useOutsideClick";
import { UserMenu } from "@components/UserMenu/UserMenu";
import { userSelector } from "@features/user/userSlice";
import { ChatIcon, CommunityIcon, DotsIcon, StoryIcon } from "@icons/index";
import { useRef, useState } from "react";

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useAppSelector(userSelector);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const closeMenu = () => {
    setShowMenu(false);
  };

  useClickOutside(menuRef, closeMenu);

  return (
    <div className="dark:bg-dark-4 h-[50px] flex justify-between items-center px-3">
      <img
        src={user.picture}
        alt={user.name}
        className="w-11 h-11 rounded-full"
      />
      <div className="flex gap-3 items-center">
        <CommunityIcon className="dark:fill-dark-svg-1" />
        <StoryIcon className="dark:fill-dark-svg-1" />
        <ChatIcon className="dark:fill-dark-svg-1" />
        <div className="relative" ref={menuRef}>
          <DotsIcon
            onClick={() => setShowMenu((prev) => !prev)}
            className="dark:fill-dark-svg-1 cursor-pointer hover:bg-dark-hover-1 rounded-3xl py-0.5"
          />
          {showMenu && <UserMenu />}
        </div>
      </div>
    </div>
  );
};
