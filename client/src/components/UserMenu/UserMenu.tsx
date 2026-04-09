import { useAppDispatch } from "@/hooks/redux";
import { logout } from "@features/user/userSlice";

export const UserMenu = () => {
  const dispatch = useAppDispatch();
  return (
    <ul className="list-none absolute top-7 right-2 dark:bg-dark-4 rounded-md w-max dark:text-dark-text-1 text-sm *:px-6 *:py-3 *:hover:bg-dark-hover-1 *:cursor-pointer overflow-hidden">
      <li>New Group</li>
      <li>New Community</li>
      <li>Starred messages</li>
      <li>Settings</li>
      <li onClick={() => dispatch(logout())}>Logout</li>
    </ul>
  );
};
