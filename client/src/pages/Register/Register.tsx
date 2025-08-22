import { RegisterForm } from "@/components/RegisterForm";

export const Register = () => {
  return (
    <div className="h-screen dark:bg-dark-bg-1 text-2xl flex items-center justify-center py-[19px] overflow-hidden">
      <div className="flex w-[1600px] mx-auto h-full">
        <RegisterForm />
      </div>
    </div>
  );
};
