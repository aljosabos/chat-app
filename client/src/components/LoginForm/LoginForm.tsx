import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormValues } from "./LoginForm.schema";
import { Input } from "../Input/Input";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { PulseLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "@features/user/thunks";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@icons/index";

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const { authStatus, error } = useAppSelector((state) => state.user);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = async (fields: LoginFormValues) => {
    try {
      const res = await dispatch(loginUser(fields)).unwrap();

      if (res.user) navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="max-w-sm w-full p-10 dark:bg-dark-bg-2 rounded-xl">
        <div className="text-center dark:text-dark-text-6">
          <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign in</p>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <Input
            name="email"
            placeholder="Email"
            error={errors.email?.message}
            register={register}
          />

          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              error={errors.password?.message}
              register={register}
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-dark-text-4 hover:text-gray-700 dark:hover:text-dark-text-2 transition-colors focus:outline-none"
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center bg-green-1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green-2 shadow-lg cursor-pointer transition ease-in duration-300"
          >
            {authStatus === "pending" ? (
              <PulseLoader color="#fff" size={16} />
            ) : (
              "Login"
            )}
          </button>
          <div className="text-sm">
            <p className="flex flex-col items-center justify-center  text-center text-md dark:text-dark-text-2">
              <span>Don't have an account?</span>
              <Link
                to="/register"
                className="hover:underline cursor-pointer transition ease-in duration-300"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
