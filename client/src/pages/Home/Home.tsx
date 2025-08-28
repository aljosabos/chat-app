import { useAppDispatch } from "@/hooks/redux";
import { logout, userSelector } from "@features/user/userSlice";

export const Home = () => {
  const user = userSelector;
  const dispatch = useAppDispatch();
  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={() => dispatch(logout())}>Increment counter</button>
    </div>
  );
};
