import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormValues } from "./RegisterForm.schema";
import { Input } from "../Input/Input";
import { useAppSelector } from "@/hooks/redux";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";

export const RegisterForm = () => {
  const { status } = useAppSelector((state) => state.user);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      status: "",
      password: "",
    },
  });

  const handleFormSubmit = (data: RegisterFormValues) => {
    console.log(data);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="max-w-md p-10 dark:bg-dark-bg-2 rounded-xl">
        <div className="text-center dark:text-dark-text-1">
          <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign up</p>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <Input
            name="name"
            placeholder="Name"
            error={errors.name?.message}
            register={register}
          />

          <Input
            name="email"
            placeholder="Email"
            error={errors.email?.message}
            register={register}
          />

          <Input
            name="status"
            placeholder="Status"
            error={errors.status?.message}
            register={register}
          />

          <Input
            name="password"
            placeholder="Password"
            error={errors.password?.message}
            register={register}
          />

          <button
            type="submit"
            className="w-full flex justify-center bg-green-1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green-2 shadow-lg cursor-pointer transition ease-in duration-300"
          >
            {status === "loading" ? (
              <PulseLoader color="#fff" size={16} />
            ) : (
              "Sign up"
            )}
          </button>
          <div className="text-sm">
            <p className="flex flex-col items-center justify-center  text-center text-md dark:text-dark-text-1">
              <span>Have an account?</span>
              <Link
                to="/login"
                className="hover:underline cursor-pointer transition ease-in duration-300"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
