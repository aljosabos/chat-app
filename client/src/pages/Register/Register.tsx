import { RegisterForm } from "@/components/RegisterForm/RegisterForm";
import { useAppDispatch } from "@/hooks/redux";
import { resetUserError } from "@features/user/userSlice";
import { useEffect } from "react";

export const Register = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetUserError());
  }, [dispatch]);

  return (
    <div className="h-screen dark:bg-dark-bg-1 text-2xl flex items-center justify-center py-[19px] overflow-hidden">
      <div className="flex w-[1600px] mx-auto h-full">
        <RegisterForm />
      </div>
    </div>
  );
};
