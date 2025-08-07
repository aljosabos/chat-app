import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { increment } from "@features/counter/counterSlice";

export const Home = () => {
  const count = useAppSelector((state) => state.counter?.value);
  const dispatch = useAppDispatch();
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Increment counter</button>
    </div>
  );
};
